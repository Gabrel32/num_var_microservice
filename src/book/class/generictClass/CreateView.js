class CreateView {
  constructor(allDef, defBoard) {
    this.defBoard = defBoard;
    this.allArtifacts = [];

    this.setParent(allDef?.parent ?? {});
    this.initVIew(allDef);
  }

  initVIew = (allDef) => {
    const { artifacts, parent, style } = allDef ?? {};
    const fragment = new DocumentFragment();
    if (!allDef || Object?.keys(artifacts).length <= 0) {
      return;
    }

    Object.keys(artifacts).forEach(def => {
      const artifact = artifacts[def];
      return this.addArtefact({ name: def, ...artifact, parent, style }, fragment);

    });

    let container = document.querySelector(`#${parent},.${parent}`);
    container = container ?? document.querySelector(`.main`);

    if (container) {
      container.appendChild(fragment);
    } else {
      document.body.appendChild(fragment);
    }

    this.initArtifats();
    this.contentMain.style.display = '';

  };

  addArtefact = (artifact, fragment) => {

    const { parent = this.parent } = artifact;
    const defBoard = this?.defBoard?.[artifact?.board];
    const artClass = new Artifact(artifact, defBoard);

    if (fragment) {
      fragment.appendChild(artClass.htmlNode);
    } else {
      let container = document.querySelector(`#${parent},.${parent}`);
      container = container ?? document.querySelector(`.main`);
      if (container) {
        container.appendChild(artClass.htmlNode);
      } else {
        document.body.appendChild(artClass.htmlNode);
      }
    }
    this.allArtifacts.push(artClass);
    return artClass;

  };

  setParent = (parent) => {

    console.log(parent);
    if (parent?.clas && clas != '' || parent?.id && id != '') {
      console.log(parent?.clas && clas != 'defaultContent' || parent?.id && id != 'defaultContent');
      this.contentMain = document.querySelector(`.${parent?.id ?? 'default'} #${parent?.class ?? 'default'}`) ?? document.body;
    } else {
      console.log('else');
      this.contentMain = document.querySelector(`.${parent}`) ?? document.body;
    };
    this.contentMain.style.display = 'none';
  };

  initArtifats = () => {
    this.allArtifacts.forEach((artifact) => {
      artifact.initArtifact();
      artifact.initEngine();
    });
  };
}