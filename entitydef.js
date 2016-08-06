/* ~entitydef~
 * 
 * Simple JSON Definition Loader using findit
 * 
 * -meta---
 * version:    0.0.2
 * builddate:  2016-08-06T05:21:00.874Z
 * generator:  interleave@0.6.1
 * 
 * 
 * 
 */ 

// umdjs returnExports pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['underscore'], factory);
    } else {
        root['entitydef'] = factory(root['underscore']);
    }
}(this, function (underscore) {
    
    function entitydef(data, templateClass) {
        // initialise the temp constructor
        var tmpConstructor = function(opts) {
            opts = opts || {};
            
            for (var key in opts) {
                if (typeof this[key] == 'undefined') {
                    this[key] = opts[key];
                }
            }
            
            if (templateClass) {
                templateClass.call(this, opts);
            }
        };
        
        // initialise the prototype of the constructor
        tmpConstructor.prototype = underscore.extend({}, (templateClass || {}).prototype, data);
        
        // remove the state from the prototype
        delete tmpConstructor.prototype.state;
        
        // return the new constructor
        return tmpConstructor;
    }
    
    return typeof entitydef != 'undefined' ? entitydef : undefined;
}));