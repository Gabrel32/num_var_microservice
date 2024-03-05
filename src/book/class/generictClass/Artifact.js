class Artifact {
    constructor(def, board) {
        this.name = def.name
        this.status = false
        this.engine = new def.engine(def, board)
        this.board = board
        this.htmlNode = this.engine.templateInsert()
        this.htmlNode.id = def.name
        if (this.htmlNode.querySelector('#jxgbox')) {
            this.htmlNode.querySelector('#jxgbox').id = def.name + '_board' 
        }
        this.htmlNode.classList.add(...def.style?.class ?? '')
    };
   
    initArtifact = () => {
        if (this.status) {
            return;
        }
        this.status = true
        this.allbtn = this.htmlNode.querySelector('.all-btn')
        if (this.allbtn) {   
            this.allbtn.addEventListener('click', (e) => {
    
                const button = e.target;
                if (button.classList.contains('check')) {
                    console.log('validate',this.engine.validation);
    
                } else if (button.classList.contains('reset')) {
                    console.log('reset');
    
                } else if (button.classList.contains('back')) {
                    console.log('back');
    
                };
            })
        }
    };

    initEngine = () => {
        if (this.allbtn) {
            this.engine.initEngine(this.def, this.board);
        }
    };
  };