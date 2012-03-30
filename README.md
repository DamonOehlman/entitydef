# defloader

This is a small node utility built using [findit](https://github.com/substack/node-findit) to recursively walk a directory and find any `JSON` files in any of the child directories and pass the parsed JSON into the constructor for the item.

## Example Usage (from the tests)

```js
function NPC(opts) {
    opts = opts || {};
    
    this.phrases = opts.phrases;
    this.phraseIndex = 0;
}

NPC.prototype = {
    say: function() {
        if (this.phraseIndex >= this.phrases.length) {
            this.phraseIndex = 0;
        }
        
        return this.phrases[this.phraseIndex++];
    }
};

loader('data/npc', NPC)
    .on('item', function(npc) {
        // this a new NPC and will have the say method
        npc.say();
    })
    .on('end', function() {
        expect(items).to.have.length(1);
        done();
    });
```