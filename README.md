# defloader

This is a small node utility built using [findit](https://github.com/substack/node-findit) to recursively walk a directory and find any `JSON` files in any of the child directories and pass the parsed JSON into the constructor for the item.

Data should be specified in the following format:

```json
{
    "phrases": [
        "Hello there",
        "We don't need to see your identification",
        "You are not the player we're looking for",
        "Move along, move along..."
    ],
    
    "state": {
        "health": 50
    }
}
```

Any items in the core definition will be mapped to the prototype definition which will reduce the memory footprint of your application when you have thousands of entities running around.  Any data that is considered instance specific should be included in the state member.

## Example Usage (from the tests)

```js
function NPC(opts) {
    opts = opts || {};
    
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
    .on('item', function(itemPath, Class, initialState) {
        // create the new npc
        var npc = new Class(initialState);
        
        // this a new NPC and will have the say method
        npc.say();
    })
    .on('end', function() {
        expect(items).to.have.length(1);
        done();
    });
```