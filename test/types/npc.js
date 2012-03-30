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