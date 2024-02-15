function extendPrototype(classToExtend) {
    classToExtend.species = 'Human';

    classToExtend.prototype.toSpeciesString = () => `I am a ${this.species}. ${this.toString()}`;
}

extendPrototype({});