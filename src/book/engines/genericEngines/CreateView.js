

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

        this.allArtifacts = Object.keys(artifacts).map(def => {
            const artifact = artifacts[def]
            return this.addArtefact({ id: def, ...artifact, parent, style }, fragment)

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

        const { template = {}, engine, id, parent, style = { class: [] } } = artifact

        const artClass = new Artifact(artifact, {}, engine)

        const $template = template?.nodo ?? document.querySelector(`${artClass.engine.idTemplate},#${template.id},.${template.class}`);
        const cloneTmp = $template.content.firstElementChild.cloneNode(true);

        cloneTmp.id = id
        cloneTmp.querySelector('#jxgbox').id = id + '_board'
        cloneTmp.classList.add(...style?.class ?? '')
        artClass.htmlNode = cloneTmp

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
        return artClass

    }

    initArtifats = () => {
        this.allArtifacts.forEach((artifact) => {
            artifact.initArtifact()
        });
    }
}



const def = {
    artifacts: {
        /*   artifact_1: { template: { id: 'temp-segment' } },
          artifact_2: { template: { id: 'temp-segment' } }, */
        artifact_3: {
            engine: HorizontalSegment,
            /*   template: { id: 'temp-segment' } */
        },
    }

}

const contentMain = new CreateView(def);

contentMain.initVIew({
    style: { class: ['passInLibrary'] },
    parent: 'main_2',
    artifacts: {
        artifact_4: {
            engine: HorizontalSegment,
            template: { id: 'temp-segment' }
        },
    }

})

contentMain.addArtefact({
    parent: 'main_2',
    engine: HorizontalSegment,
    template: {
        nodo: document.querySelector('#temp-segment')
    },
    id: 'artifact_5'
})