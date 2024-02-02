class Artifact {
    constructor(def, board, engine) {
        this.engine = new engine(def, board)
        this.board = board
        this.template = this.engine.templateInsert()
        console.log(this.template);
    };

    initArtifact = () => {
        console.log('asdasda');
        this.allbtn = this.htmlNode.querySelector('.all-btn')
        this.allbtn.addEventListener('click', (e) => {
            console.log(e.target);
        })
    };

    initEngine = () => {
        this.engine.initEngine(this.def, this.board);
    };
};