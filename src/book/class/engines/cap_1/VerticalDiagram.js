

class DiagramVertical extends BaseEngine {
  constructor(def, id) {

    super()
    
    this.def = def
    this.conditions=this.def.conditions
    this.temp1 = document.querySelector('#tmp1')
    this.temp2 = document.querySelector('#tmp2')
    this.validation = new verticalValidate()
    this.hmlNode = null;
    this.inputsValidate = []

  }

  templateInsert = () => {
    const maintTmp = `<template id="temp">

    <div class="container">

      <div class="artifact" id="artifact1">
        <math-field class="up input_up hblted"></math-field>
        <math-field class=" down input_down hblted"></math-field>
        <div class="botons all-btn">
        <button class="return">↶</button>
          <button class="reset" id="reset1">↻</button>
          <button class="check" id="check">✓</button>
        </div>

      </div>

  </template>`

 
  
    if (!document.querySelector('#temp')) {
      this.template ??= maintTmp
      document.body.insertAdjacentHTML('afterend',
        this.template);
    }
    this.htmlNode ??= document.querySelector('#temp').content.firstElementChild.cloneNode(true);
    return this.htmlNode

    
  }

  artiopc(def) {
    const options = {
      "1": this.temp1,
      "2": this.temp2
    };
    this.def.inputs.forEach((item, index) => {

      const clone = options[item.type].content.firstElementChild.cloneNode(true)
      const clone1 = this.htmlNode.firstElementChild

      const input_1 = clone.querySelector(".input_1");
      const input_2 = clone.querySelector(".input_2");
      const md = clone.querySelector(".md")
      const input_up = clone1.querySelector(".input_up")
      const input_down = clone1.querySelector(".input_down")

      input_up.textContent = item.value3
      input_up.style = item.style3
      input_1.textContent = item.value1
      input_2.textContent = item.value2
      input_down.style = item.style3
      input_2.style = item.style2
      input_down.textContent = item.value4

      /* x(input_down, style, value4)

      const x = (input, style, value) => {
        input.style = item.style
        input.textContent = value
      } */

      if (md) { md.style = item.style2 }
      input_1.style = item.style1

      if (item.value3 !== "") {
        input_up.setAttribute("disabled", "")
      } else {
        if(!this.inputsValidate.includes(input_up)){this.inputsValidate.push(input_up);}
        
      }
      if (item.value1 !== "") {
        input_1.setAttribute("disabled", "")
      } else {
        this.inputsValidate.push(input_1);
      }

      if (item.value2 !== "") {
        input_2.setAttribute("disabled", "")
      } else {
        this.inputsValidate.push(input_2);
      }

     
      if (item.value4 !== "") {
        input_down.setAttribute("disabled", "")
      } else {
        if(!this.inputsValidate.includes(input_down)){this.inputsValidate.push(input_down);}
        
      }

      this.htmlNode.firstElementChild.appendChild(clone);
      this.htmlNode.id = this.artId
    })
  }
  iniTMainReset(def) {
    const inputs_r = def.htmlNode.firstElementChild.querySelectorAll(".hblted")
    inputs_r.forEach((inputs) => {
      if (inputs.textContent == "") { 
        inputs.value = ""; 
        inputs.style.background="transparent"
      }

    })
  }
  initEngine() {
    this.artiopc(this.def)
    this.initTimer()
  }
}