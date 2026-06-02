class MoleculeGenerator {
getInfo() {
    return {
      id: 'MoleculeGenerator',
      name: 'MoleculeGenerator',
      docsURI: "https://kypo.org/turbowarpdocs1",
      blocks: [
        {
          opcode: 'hello',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Hello!'
        }
      ]
    };
  }

    constructor() {

        this.prefixes = [
            "mono","di","tri","tetra","penta","hexa",
            "hydro","amino","nitro","oxo","methyl",
            "ethyl","propyl","butyl","chloro",
            "fluoro","bromo","carboxy",
            "phospho","sulfo","cyano"
        ];

        this.stems = [
            "carbon","oxygen","hydrogen","nitrogen",
            "sulfur","phosph","benz","phen",
            "acet","glyc","lact","quin",
            "indol","pyrid","selen",
            "bor","silic","cycl","napth"
        ];

        this.groups = [
            "amino","hydroxy","carboxy",
            "ester","ether","nitro",
            "aldehyd","keto","amide",
            "phosphate","carbonate",
            "sulfate","cyanide","peroxy"
        ];

        this.suffixes = [
            "ide","ate","ite","oxide",
            "amine","amide","ol",
            "one","al","ene",
            "yne","ane","acid",
            "ester","ether",
            "phosphate","carbonate"
        ];

        this.classes = [
            "Peptide",
            "Aromatic",
            "Catalyst",
            "Oxidizer",
            "Polymer",
            "Bioactive",
            "Alkaloid",
            "Carbohydrate Derivative",
            "Research Compound",
            "Synthetic Intermediate"
        ];

        this.toxicities = [
            "Non-Toxic",
            "Low",
            "Moderate",
            "Elevated",
            "High",
            "Extreme"
        ];

        this.rarities = [
            "Common",
            "Uncommon",
            "Rare",
            "Very Rare",
            "Exotic",
            "Legendary"
        ];

        this.states = [
            "Solid",
            "Liquid",
            "Gas",
            "Crystalline",
            "Gel",
            "Powder"
        ];

        this.colors = [
            "Clear",
            "White",
            "Amber",
            "Green",
            "Blue",
            "Red",
            "Purple",
            "Black"
        ];

        this.seedCounter = 1;
    }

    getInfo() {

        return {
            id: "moleculegenerator",
            name: "Molecule Generator",
            color1: "#4a90e2",

            blocks: [

                {
                    opcode: "generateMolecule",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "generate molecule"
                },

                {
                    opcode: "completeMolecule",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "complete molecule prefix [P] stem [S] group [G] suffix [X]",
                    arguments: {
                        P:{type:Scratch.ArgumentType.STRING},
                        S:{type:Scratch.ArgumentType.STRING},
                        G:{type:Scratch.ArgumentType.STRING},
                        X:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "describeMolecule",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "describe molecule [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "generateClass",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "class of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "generateFormula",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "formula for [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "density",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "density of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "meltingPoint",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "melting point of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "boilingPoint",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "boiling point of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "toxicity",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "toxicity of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "rarity",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "rarity of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "stability",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "stability of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "state",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "state of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "color",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "color of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "variant",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "variant of [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                },

                {
                    opcode: "parseMolecule",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "parse molecule [NAME]",
                    arguments:{
                        NAME:{type:Scratch.ArgumentType.STRING}
                    }
                }
            ]
        };
    }

    hash(str) {

        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }

        return Math.abs(hash);
    }

    pick(seedName, list) {
        return list[
            this.hash(seedName) % list.length
        ];
    }

    number(seedName, min, max) {

        const h = this.hash(seedName);

        return min + (h % (max - min + 1));
    }

    generateMolecule() {

        const seed = "gen" + this.seedCounter++;

        return (
            this.pick(seed+"p",this.prefixes) +
            this.pick(seed+"s",this.stems) +
            this.pick(seed+"g",this.groups) +
            this.pick(seed+"x",this.suffixes)
        );
    }

    completeMolecule(args) {

        const partial =
            args.P +
            args.S +
            args.G +
            args.X;

        return (
            (args.P || this.pick(partial+"p",this.prefixes)) +
            (args.S || this.pick(partial+"s",this.stems)) +
            (args.G || this.pick(partial+"g",this.groups)) +
            (args.X || this.pick(partial+"x",this.suffixes))
        );
    }

    generateClass(args) {
        return this.pick(
            args.NAME + "class",
            this.classes
        );
    }

    generateFormula(args) {

        const n = args.NAME;

        const c = this.number(n+"C",1,90);
        const h = this.number(n+"H",1,180);
        const o = this.number(n+"O",0,25);
        const nn = this.number(n+"N",0,15);
        const s = this.number(n+"S",0,8);

        return `C${c}H${h}O${o}N${nn}S${s}`;
    }

    density(args) {
        return (
            this.number(args.NAME+"density",50,400)/100
        ).toFixed(2) + " g/cm³";
    }

    meltingPoint(args) {
        return this.number(
            args.NAME+"mp",
            -50,
            450
        ) + " °C";
    }

    boilingPoint(args) {
        return this.number(
            args.NAME+"bp",
            50,
            1500
        ) + " °C";
    }

    toxicity(args) {
        return this.pick(
            args.NAME+"tox",
            this.toxicities
        );
    }

    rarity(args) {
        return this.pick(
            args.NAME+"rarity",
            this.rarities
        );
    }

    stability(args) {

        const levels = [
            "Very Low",
            "Low",
            "Moderate",
            "High",
            "Very High"
        ];

        return this.pick(
            args.NAME+"stability",
            levels
        );
    }

    state(args) {
        return this.pick(
            args.NAME+"state",
            this.states
        );
    }

    color(args) {
        return this.pick(
            args.NAME+"color",
            this.colors
        );
    }

    variant(args) {

        const suffixes = [
            "Alpha",
            "Beta",
            "Gamma",
            "Delta",
            "Prime",
            "MK-I",
            "MK-II",
            "PX",
            "RX",
            "Sigma"
        ];

        return (
            args.NAME +
            " " +
            this.pick(
                args.NAME+"variant",
                suffixes
            )
        );
    }

    describeMolecule(args) {

        const name = args.NAME;

        return (
            `${name} is a ${this.generateClass(args)} compound. ` +
            `It appears ${this.color(args).toLowerCase()} and typically exists as a ${this.state(args).toLowerCase()}. ` +
            `Its toxicity is rated ${this.toxicity(args).toLowerCase()}, ` +
            `with ${this.stability(args).toLowerCase()} stability. ` +
            `Researchers classify it as ${this.rarity(args).toLowerCase()} within current synthetic databases.`
        );
    }

    parseMolecule(args) {

        const name = args.NAME.toLowerCase();

        const parts = [];

        for(const p of this.prefixes)
            if(name.includes(p))
                parts.push("prefix:"+p);

        for(const s of this.stems)
            if(name.includes(s))
                parts.push("stem:"+s);

        for(const g of this.groups)
            if(name.includes(g))
                parts.push("group:"+g);

        for(const x of this.suffixes)
            if(name.includes(x))
                parts.push("suffix:"+x);

        return parts.join(", ");
    }
}

Scratch.extensions.register(
    new MoleculeGenerator()
);
