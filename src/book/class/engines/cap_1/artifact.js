

class Artifact {
    constructor(id, art) {
      this.def = {
        artirfacts: {
          artifact_1: {
            inputs: [
              { type: 1, value1: 'x', value2: '' },
              { type: 2, value1: '()+3', value2: '' },
              { type: 1, value1: '', value2: '' },
              { type: 2, value1: '2*()', value2: '' },
              { type: 1, value1: '', value2: '20' }
            ]
          },
          artifact_2: {
            inputs: [
              { type: 1, value1: '', value2: '' },
              { type: 2, value1: '', value2: '' },
              { type: 1, value1: '', value2: '' },
              { type: 2, value1: '', value2: '' },
              { type: 1, value1: '', value2: '' }
            ]
        },
        artifact_3: {
          inputs: [
            { type: 1, value1: 'incognita', value2: 'solucion' },
            { type: 2, value1: 'operacion', value2: 'operacion inversa' },
            { type: 1, value1: 'formula', value2: 'numero' }
          ]
      },
      artifact_4: {
        inputs: [
          { type: 1, value1: 'x', value2: '3' },
          { type: 2, value1: '2*()', value2: '()/2' },
          { type: 1, value1: '2*x', value2: '6' }
        ]
    },
    artifact_5: {
      inputs: [
        { type: 1, value1: '4', value2: '4' },
        { type: 2, value1: '()+2', value2: '' },
        { type: 1, value1: '', value2: '' }
      ]
  }
      }
      }
      this.nodo = document.querySelector("#nodo")
      this.temp1 = document.querySelector('#tmp1')
      this.temp2 = document.querySelector('#tmp2')
      this.baseart = document.querySelector("#temp")
      this.cloneArt = this.baseart.content.firstElementChild.cloneNode(true)
      this.artifact=art
      this.artId = id
      this.articnt=document
      this.artiopc(this.artifact)
      this.timerInteraction = 0;
        this.thmlNode = this.cloneArt.firstElementChild;
        this.btnv= document.querySelector(".check")
        this.Timer = null
         this.initTimer(this.thmlNode,this.btnv)
        this.timerActive = false
        this.nodo.appendChild(this.cloneArt)
    }

        artiopc(arti){
      switch (arti) {
        case 'artifact_1':
          this.def.artirfacts.artifact_1.inputs.forEach((item,index) => {
          let copy
          switch (item.type) {
            case 1:
              copy = tmp1.content.firstElementChild.cloneNode(true);
            break;
            case 2:
              copy = tmp2.content.firstElementChild.cloneNode(true);
            break;
            default:
            break;
}

this.cloneArt.firstElementChild.appendChild(copy);
this.cloneArt.id=this.artId
})
        
  
          break;
        case 'artifact_2':
          this.def.artirfacts.artifact_2.inputs.forEach((item) => {
            let copy
            switch (item.type) {
              case 1:
                copy = tmp1.content.firstElementChild.cloneNode(true);
              break;
              case 2:
                copy = tmp2.content.firstElementChild.cloneNode(true);
              break;
              default:
              break;
  }
  this.cloneArt.firstElementChild.appendChild(copy);
  this.cloneArt.id=this.artId
  })
        
  
  
          break;
        case 'artifact_3':
          this.def.artirfacts.artifact_3.inputs.forEach((item) => {
            let copy
            switch (item.type) {
              case 1:
                copy = tmp1.content.firstElementChild.cloneNode(true);
              break;
              case 2:
                copy = tmp2.content.firstElementChild.cloneNode(true);
              break;
              default:
              break;
  }
  this.cloneArt.firstElementChild.appendChild(copy);
  this.cloneArt.id=this.artId
  })

          break
          case 'artifact_4':
            this.def.artirfacts.artifact_4.inputs.forEach((item) => {
              let copy
              switch (item.type) {
                case 1:
                  copy = tmp1.content.firstElementChild.cloneNode(true);
                break;
                case 2:
                  copy = tmp2.content.firstElementChild.cloneNode(true);
                break;
                default:
                break;
    }
    this.cloneArt.firstElementChild.appendChild(copy);
    this.cloneArt.id=this.artId
    })
  
            break
            case 'artifact_5':
              this.def.artirfacts.artifact_5.inputs.forEach((item) => {
                let copy
                switch (item.type) {
                  case 1:
                    copy = tmp1.content.firstElementChild.cloneNode(true);
                  break;
                  case 2:
                    copy = tmp2.content.firstElementChild.cloneNode(true);
                  break;
                  default:
                  break;
      }
      this.cloneArt.firstElementChild.appendChild(copy);
      this.cloneArt.id=this.artId
      })
    
              break;
              default:
              break;
    }
}
  
  

   initTimer(node,btn) {
       this.thmlNode.addEventListener('mouseenter', this.iniciarTimer);
       this.thmlNode.addEventListener('mouseleave', this.detenerTimer);
       this.thmlNode.addEventListener('input', this.iniciarTimer);
          //  this.btnv.addEventListener('click', this.resetTimer);
       };

    

   iniciarTimer = (cont = true) => {

       if (this.timerActive) {
           return
       }
       this.timerActive = true
       this.Timer = setInterval(() => {
           this.timerInteraction = this.timerInteraction + 1
           console.log(this.timerInteraction);
       }, 1000)
   }

   detenerTimer = () => {
       this.timerActive = false
       clearInterval(this.Timer);
       this.Timer = null
   }

   resetTimer = () => {
       console.log(`Tiempo transcurrido: ${this.timerInteraction} segundos;`);
       clearInterval(this.Timer)
       this.timerInteraction = 0
   }
  
      
}
  const artifact1= new Artifact("artifact1",'artifact_1')
  const artifact2= new Artifact("artifact2",'artifact_2')
  const artifact3= new Artifact("artifact3",'artifact_3')
  const artifact4 = new Artifact("artifact4", 'artifact_4')
  const artifact5 = new Artifact("artifact5", 'artifact_5')