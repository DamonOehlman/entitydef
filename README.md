
# entitydef


[![NPM](https://nodei.co/npm/entitydef.png)](https://nodei.co/npm/entitydef/)

[![Build Status](https://api.travis-ci.org/DamonOehlman/entitydef.svg?branch=master)](https://travis-ci.org/DamonOehlman/entitydef) [![bitHound Score](https://www.bithound.io/github/DamonOehlman/entitydef/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/entitydef) 

## What is this?

This is a small node utility built using [findit](https://github.com/substack/node-findit) to recursively walk a
directory and find any `JSON` files in any of the child directories and pass the parsed JSON into the constructor
for the item.

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

Any items in the core definition will be mapped to the prototype definition which will reduce the memory footprint
of your application when you have thousands of entities running around.  Any data that is considered instance specific
should be included in the state member.

## Example Usage (from the tests)

### Type Definition

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

module.exports = NPC;
```

### Using the Loader

```js
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

## License(s)

### ISC

Copyright (c) 2016, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
