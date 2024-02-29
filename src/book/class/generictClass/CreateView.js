class CreateView {
    constructor(allDef, defBoard) {

        this.defBoard = defBoard
        this.allArtifacts = [];
        if (allDef) {
            this.initVIew(allDef)
            this.setParent(allDef?.parent ?? '')
        }

    }

    initVIew = (allDef) => {
        const { artifacts, parent, style } = allDef ?? {}
        const fragment = new DocumentFragment()
        if (!allDef || Object?.keys(artifacts).length <= 0) {
            return
        }

        Object.keys(artifacts).forEach(def => {
            const artifact = artifacts[def]
            return this.addArtefact({ name: def, ...artifact, parent, style, board: this?.defBoard?.[artifact?.board] }, fragment)

        });

        let container = document.querySelector(`#${parent},.${parent}`)
        container = container ?? document.querySelector(`.main`)

        if (container) {
            container.appendChild(fragment)
        } else {
            document.body.appendChild(fragment)
        }
        this.initArtifats()
    }

    addArtefact = (artifact, fragment) => {
        const { parent } = artifact
        // const defBoard = this?.defBoard?.[artifact?.board]
        const artClass = new Artifact(artifact, artifact.board)

        if (fragment) {
            fragment.appendChild(artClass.htmlNode)
        } else {
            let container = document.querySelector(`#${parent},.${parent}`)
            container = container ?? document.querySelector(`.main`)
            if (container) {
                container.appendChild(artClass.htmlNode);
            } else {
                document.body.appendChild(artClass.htmlNode);
            }
        }
        this.allArtifacts.push(artClass)
        return artClass

    }

    initArtifats = () => {
        this.allArtifacts.forEach((artifact) => {
            if (!artifact.status) {
                artifact.initArtifact()
                artifact.initEngine();
            };
        });

        if (this.contentMain) {
            this.contentMain.style.display = 'flex';
        }
    }

    setParent = (parent) => {

        if (typeof parent === 'object') {
            this.contentMain = document.querySelector(`.${parent?.id ?? 'default'},#${parent?.class ?? 'default'}`) ?? document.body;
        } else {
            if (parent != "") {
                this.contentMain = document.querySelector(`.${parent}`) ?? document.body;
            }
        };
        if (this.contentMain) {
            this.contentMain.style.display = 'none';
        }
    };


}