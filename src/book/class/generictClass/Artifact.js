class Artifact {

  constructor(def, custom) {
    this.name = def.name;
    this.engine = new def.engine(def, custom);
    this.htmlNode = this.engine.templateInsert();
    this.customHtmlNode();
  };

  customHtmlNode() {
    this.htmlNode.id = def.name;
    this.htmlNode.classList.add(...def.style?.class ?? '');
  }

  initArtifact = () => {
    console.log('initArtifact');
    this.allbtn = this.htmlNode.querySelector('.all-btn');
    this.allbtn.addEventListener('click', (e) => {

      const button = e.target;
      if (button.classList.contains('check')) {

        console.log('validate');
        this.engine.validate();

      } else if (button.classList.contains('reset')) {

        console.log('reset');
        this.engine.reset();
      } else if (button.classList.contains('back')) {

        console.log('back');
        this.engine.back();

      };
    });

  };

  initEngine = () => {
    this.engine.initEngine(this.def, this.board);
  };
};