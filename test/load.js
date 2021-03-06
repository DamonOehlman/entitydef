var path = require('path'),
    loader = require('../lib/loader'),
    expect = require('expect.js'),
    NPC = require('./types/npc');

describe('loader tests', function() {
    it('should be able to load all definitions without a constructor', function(done) {
        var items = [];
        
        loader(path.resolve(__dirname, 'data/npc'))
            .on('item', function(itemPath, Class, initialState) {
                var item = new Class(initialState);
                
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
            .on('item', function(itemPath, Class, initialState) {
                var item = new Class(initialState);
                
                items.push(item);

                expect(itemPath).to.equal('guard');            
                expect(item.phrases).to.be.ok();
                expect(item.say()).to.be.ok();
            })
            .on('end', function() {
                expect(items).to.have.length(1);
                done();
            });
    });
});