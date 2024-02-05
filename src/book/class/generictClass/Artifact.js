class Artifact {
    constructor(def, board) {
        console.log('board', board);
        this.name = def.name
        this.engine = new def.engine(def, board)
        this.board = board
        this.htmlNode = this.engine.templateInsert()
        this.htmlNode.id = def.name
        this.htmlNode.querySelector('#jxgbox').id = def.name + '_board'
        this.htmlNode.classList.add(...def.style?.class ?? '')
    };

    initArtifact = () => {

        this.allbtn = this.htmlNode.querySelector('.all-btn')
        this.allbtn.addEventListener('click', (e) => {

            const button = e.target;
            if (button.classList.contains('check')) {
                console.log('validate');

            } else if (button.classList.contains('reset')) {
                console.log('reset');

            } else if (button.classList.contains('back')) {
                console.log('back');

            };
        })

    };

    initEngine = () => {
        this.engine.initEngine(this.def, this.board);
    };
};