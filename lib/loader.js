var async = require('async'),
    debug = require('debug')('defloader'),
    entitydef = require('../entitydef'),
    findit = require('findit'),
    events = require('events'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');

function DefinitionLoader(targetPath, constructor) {
    this.classConstructor = constructor;
    this.targetPath = targetPath;
}

util.inherits(DefinitionLoader, events.EventEmitter);

DefinitionLoader.prototype._loadFile = function(file, callback) {
    var loader = this,
        tmpConstructor;

    fs.readFile(file, 'utf8', function(err, data) {
        if (! err) {
            try {
                // parse the data
                data = JSON.parse(data);
                
                // create the constructor
                tmpConstructor = entitydef(data, loader.classConstructor);
                
                // create the item
                loader.emit('item', path.basename(file.slice(loader.targetPath.length + 1), '.json'), tmpConstructor, data.state);
            }
            catch (e) {
                err = e;
            }
        }
        
        callback(err);
    });
};

DefinitionLoader.prototype.loadItems = function() {
    var loader = this,
        validFiles = [];
        
    debug('looking for files in: ' + this.targetPath);
    
    // iterate through the target path
    findit(this.targetPath)
        .on('file', function(file, stat) {
            // if the file is a json file
            if (path.extname(file).toLowerCase() === '.json') {
                validFiles[validFiles.length] = file;
            }
        })
        .on('end', function() {
            async.forEach(
                validFiles,
                loader._loadFile.bind(loader),
                function(err) {
                    if (err) {
                        loader.emit('error', err);
                    }
                    else {
                        loader.emit('end');
                    }
                }
            );
            
        });

    return this;
};

module.exports = function(targetPath, constructor) {
    return new DefinitionLoader(targetPath, constructor).loadItems();
};