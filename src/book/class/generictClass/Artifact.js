class Artifact {
    constructor(def, board) {
      this.name = def.name;
      this.status = false;
      this.engine = new def.engine(def, board);
      this.board = board;
      this.htmlNode = this.engine.templateInsert();
      this.htmlNode.id = def.name;
      this.htmlNode.querySelector('#jxgbox')?this.htmlNode.querySelector('#jxgbox').id = def.name + '_board':null
      this.htmlNode.classList.add(...def.style?.class ?? '');
    };
   
    initArtifact = () => {
  
      if (this.status) { return; }
      this.status = true;
      this.addEvents();
  
    };
  
    addEvents() { 
  
      this.allbtn = this.htmlNode.querySelector('.all-btn');
      this.allbtn.addEventListener('click', (e) => {
  
        const button = e.target;
        if (button.classList.contains('check')) {
  
          console.log('validate', this.engine.validate());
  
        } else if (button.classList.contains('reset')) {
  
          console.log('reset');
          this.engine.reset()
  
        } else if (button.classList.contains('return')) {
  
          console.log('return');
          this.engine.return()
  
        };
      });
  
    }
  
    initEngine = () => {
      this.engine.initEngine(this.def, this.board);
    };
  };