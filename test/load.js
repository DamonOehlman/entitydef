var path = require('path'),
    loader = require('../lib/defloader'),
    expect = require('expect.js'),
    NPC = require('./types/npc');

describe('loader tests', function() {
    it('should be able to load all definitions without a constructor', function(done) {
        var items = [];
        
        loader(path.resolve(__dirname, 'data/npc'))
            .on('item', function(item) {
                items.push(item);
                
                expect(item.phrases).to.be.ok();
            })
            .on('end', function() {
                expect(items).to.have.length(1);
                done();
            });
    });
    
    it('should be able to load all definitions into a target class', function(done) {
        var items = [];
        
        loader(path.resolve(__dirname, 'data/npc'), NPC)
            .on('item', function(item) {
                console.log(item);
                items.push(item);
                
                expect(item.phrases).to.be.ok();
                expect(item.say()).to.be.ok();
            })
            .on('end', function() {
                expect(items).to.have.length(1);
                done();
            });
    });
});