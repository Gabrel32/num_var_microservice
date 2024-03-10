class engineTable extends NodeHtml {
  constructor(definition, defBoard) {
    super(defBoard);
    this.defBoard = defBoard
    this.idTemplate = 'tmpTabla'
    this.conditions = definition.conditions;
    this.allPoints = [];
    this.definition = { ...definition };
    this.idboard = definition.name + "_board"
    this.htmlNode = null
    this.validation = new TableValidate()
    this.propertySuccess = []
    this.numerosGenerados = [];
  }
  
  templateInsert = () => {
    if (!document.querySelector(this.idTemplate)) {
      const $templateDefaults = `<template id="tmpTabla">
      <div class="contenedorTabla">
      <table class="tabla">
        <thead id="tHead">

        </thead>
        <tbody id="tBody"> 

        </tbody>
      </table>
      <div class="contendorButtonTabla all-btn">
        <button type="button" class="btnR reset styleBtn"></button>
        <button type="button" class="btnV check styleBtn"></button>
      </div>
      </div>
      </template>`;
      
    document.body.insertAdjacentHTML('afterend', $templateDefaults);
    }
    this.htmlNode ??= document.querySelector(`#${this.idTemplate}`).content.firstElementChild.cloneNode(true);
    return this.htmlNode 
  }


  initEngine(){
  this.tHead = this.htmlNode.querySelector("#tHead")
  this.tBody = this.htmlNode.querySelector("#tBody")
  this.createHead(this.definition.head)
  this.createBody(this.definition.body)
  this.initTimer(this.thmlNode)
}

    createHead(head = []){
        const tr = document.createElement("tr")

        head.forEach(e=> {
            let th = document.createElement("th")
            th.classList.add("th")
            th.textContent = e
            tr.appendChild(th)
        });
        this.tHead.appendChild(tr)
    }
    createBody(bodys = []){
        bodys.forEach(body=>{
            const tr = document.createElement("tr")

            body.forEach(e=>{
                let td = document.createElement("td")
                td.classList.add("td")

                // if(!e.tag) return e

                if (e.tag == "select" ) {
                    let tag = this.createSelect({
                      style:{
                        select:"select"
                      },
                      valueOption:e.default
                    })
                    tag.dataset.column = e.column
                    tag.dataset.row = e.row
                    td.textContent = e.text
                    td.appendChild(tag)
                   
                }
                else if (e.tag) {
                    let tag = this.createMathField({
                      style:{
                        mathStyle:"mathfield celdaEncabezado"
                      }
                    })
                    tag.dataset.column = e.column
                    tag.dataset.row = e.row
                    tag.textContent= e.text            
                    td.appendChild(tag)                    
                }
                else{                  
                  td.textContent = e
                }
            
                tr.appendChild(td)
            })
            this.tBody.appendChild(tr)
        })
    }
    iniTMainReset(def){
      this.inputs = def.htmlNode.querySelectorAll("math-field")
      this.selects = def.htmlNode.querySelectorAll("select")
      this.inputs.forEach(e=>{
          e.value = ""
          e.parentElement.style.background = "transparent" 
      })
      this.selects.forEach(e=>{
          e.selectedIndex = 0
          e.parentElement.style.background = "transparent" 

      })
  }
}


