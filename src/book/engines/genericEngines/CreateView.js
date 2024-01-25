

class CreateView {
    constructor(allDef, defBoard) {
        this.initVIew(allDef)
    }

    initVIew = (allDef) => {
        const { artifacts, parent, style } = allDef
        const fragment = new DocumentFragment()
        if (!allDef || Object?.keys(artifacts).length <= 0) {
            return
        }
        Object.keys(artifacts).forEach(def => {

            const artifact = artifacts[def]
            this.addArtefact({ id: def, ...artifact, parent, style }, fragment)

        });

        let container = document.querySelector(`#${parent},.${parent}`)
        container = container ?? document.querySelector(`.main`)

        if (container) {
            container.appendChild(fragment)
        } else {
            document.body.appendChild(fragment)
        }
    }

    addArtefact = (artifact, fragment) => {

        const { template, id, parent, style = { class: [] } } = artifact
        console.log(style);
        const $template = template.nodo ?? document.querySelector(`#${template.id},.${template.class}`);
        const cloneTmp = $template.content.firstElementChild.cloneNode(true);

        cloneTmp.id = id
        cloneTmp.querySelector('#jxgbox').id = id + '_board'
        cloneTmp.classList.add(...style?.class ?? '')

        const artClass = new Artifact(artifact, {}, cloneTmp)

        if (fragment) {
            fragment.appendChild(cloneTmp)
        } else {
            let container = document.querySelector(`#${parent},.${parent}`)
            container = container ?? document.querySelector(`.main`)
            if (container) {
                container.appendChild(cloneTmp)
            } else {
                document.body.appendChild(cloneTmp)
            }
        }

    }
}

class Artifact {
    constructor(def, board, htmlNode) {
        this.engine = def?.engine?.insertTmp();
        console.log(this.engine);
        this.allbtn = htmlNode.querySelector('.all-btn')
    };

    initArtifact = () => {
        this.allbtn.addEventListener('click', (e) => {
            console.log(e.target);
        })
    };

    initEngine = () => {
        this.engine.initEngine(def, board)
    };
};





const def = {
    artifacts: {
        artifact_1: { template: { id: 'temp-segment' } },
        artifact_2: { template: { id: 'temp-segment' } },
    }

}

const contentMain = new CreateView(def);

contentMain.initVIew({
    style: { class: ['passInLibrary'] },
    parent: 'main_2',
    artifacts: {
        artifact_3: {
            engine: {
                insertTmp: () => {
                    console.log('inserta template');
                }
            },
            template: { id: 'temp-segment' }
        },
        artifact_4: { template: { id: 'temp-segment' } },
    }

})

contentMain.addArtefact({
    parent: 'main_2',
    template: {
        nodo: document.querySelector('#temp-segment')
    },
    id: 'artifact_5'
})