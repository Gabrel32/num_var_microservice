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
<<<<<<< HEAD
    this.validation = new TableValidate(this.definition.conditions)
=======
    this.validation = new TableValidate(this.definition.respuestas)
>>>>>>> dda43317208f423287650edbef4d145549dac34d
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
<<<<<<< HEAD
        <button type="button" class="styleBtn back return"></button>
=======
        <button type="button" class="styleBtn back"></button>
>>>>>>> dda43317208f423287650edbef4d145549dac34d
        <button type="button" class="btnR reset styleBtn"></button>
        <button type="button" class="btnV check styleBtn"></button>
      </div>
      </div>
      </template>`;
      
    document.body.insertAdjacentHTML('afterend', $templateDefaults);
    }
    this.htmlNode = document.querySelector(`#${this.idTemplate}`).content.firstElementChild.cloneNode(true);
    return this.htmlNode
  }


  initEngine(){
  this.tHead = this.htmlNode.querySelector("#tHead")
  this.tBody = this.htmlNode.querySelector("#tBody")
  this.createHead(this.definition.head)
  this.createBody(this.definition.body)
<<<<<<< HEAD
  this.inputs = this.htmlNode.querySelectorAll("math-field")
  this.selects = this.htmlNode.querySelectorAll("select")
  this.initTimer(this.thmlNode)
=======
  this.validation.setHtmlNode(this.htmlNode)
  this.btnR = this.htmlNode.querySelector(".reset")
  this.btnR.addEventListener("click",()=>this.validation.reset())
  this.btnV = this.htmlNode.querySelector(".check")
  this.btnV.addEventListener("click",()=>{
      this.inputs = this.htmlNode.querySelectorAll("math-field")
      this.selects = this.htmlNode.querySelectorAll("select")

        this.selects.forEach(select=>{
          this.validation.validate(select)
        })
        if (!this.inputs.length) {
            return 
        }
        this.inputs.forEach(input=>{
           this.validation.validate(input)
           
        })
              
  })
this.initTimer(this.thmlNode)
>>>>>>> dda43317208f423287650edbef4d145549dac34d

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
<<<<<<< HEAD
                    let tag = this.createMathField({
                      style:{
                        mathStyle:"mathfield celdaEncabezado"
                      }
                    })
                    tag.dataset.column = e.column
                    tag.dataset.row = e.row
                    tag.textContent= e.text            
                    td.appendChild(tag)                    
=======
                    let mathfield = new MathfieldElement()
                    let tag = document.createElement(e.tag)
                    mathfield.classList.add("mathfield")
                    // tag.classList.add("input")
                    mathfield.dataset.column = e.column
                    mathfield.dataset.row = e.row
                    // td.textContent = e.text
                    mathfield.classList.add("celdaEncabezado")
                    tag.textContent= e.text
                    mathfield.appendChild(tag)
                    td.appendChild(mathfield)
                    // eventos mathfield
                    mathfield.mathVirtualKeyboardPolicy = "manual";
                    mathfield.addEventListener("focusin", () =>  mathVirtualKeyboard.show());
                    mathfield.addEventListener("focusout", () =>  mathVirtualKeyboard.hide());
                    mathfield.addEventListener("keydown", (evt) => evt.preventDefault(), { capture: true });
                    mathfield.addEventListener("focus", () =>  mathVirtualKeyboard.show());
>>>>>>> dda43317208f423287650edbef4d145549dac34d
                }
                else{                  
                  td.textContent = e
                }
            
                tr.appendChild(td)
            })
            this.tBody.appendChild(tr)
        })
    }
}


