

class DiagramVertical extends BaseEngine {
  constructor(def, id) {

    super()
    this.def = def
    this.temp1 = document.querySelector('#tmp1')
    this.temp2 = document.querySelector('#tmp2')
    this.thmlNode = null;

  }

  templateInsert = () => {
    const maintTmp = `<template id="temp">

    <div class="container">

      <div class="artifact1" id="artifact1">
        <math-field class="up input_up"></math-field>
        <math-field class=" down input_down"></math-field>
        <div class="botons all-btn">
        <button class="return">↶</button>
          <button class="reset" id="reset1">↻</button>
          <button class="check" id="check">✓</button>
        </div>

      </div>

  </template>`

  this.clone1=`
    <div class="mdlo1">
      <math-field class="mdrigth input_1" ></math-field>
      <math-field class="mdleft input_2" > </math-field>
    </div>`
  this.clone2 =`
  <div class="mdlo2">
    <math-field class="rctg1 input_1" ></math-field>
    <div class="flechas">
      <div class="arrowDown">🡣</div>
      <div class="arrowUp md">🡡</div>
    </div>
    <math-field class="rctg2 input_2" ></math-field>
  </div>
  `
  
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
      const clone1= this.htmlNode.firstElementChild
      const input_1 = clone.querySelector(".input_1");
      const input_2 = clone.querySelector(".input_2");
      const md = clone.querySelector(".md")
      const input_up= clone1.querySelector(".input_up")
      const input_down = clone1.querySelector(".input_down")
      input_up.textContent =  item.value3
      input_up.style =  item.style3
      input_1.textContent = item.value1
      input_2.textContent = item.value2
      input_down.style =  item.style3
      input_2.style=item.style2
      input_down.textContent = item.value4
      if(md){md.style=item.style2}
      input_1.style=item.style1

      if(input_1.textContent==""){

      }else{
        input_1.setAttribute("disabled", "")
      }

      if(input_2.textContent==""){

      }else{
        input_2.setAttribute("disabled", "")
      }

      if(input_up.textContent==""){

      }else{
        input_up.setAttribute("disabled", "")
      }
      if(input_down.textContent==""){

      }else{
        input_down.setAttribute("disabled", "")
      }
      
     
      this.htmlNode.firstElementChild.appendChild(clone);
      this.htmlNode.id = this.artId
    })
  }
  initEngine() {
    this.artiopc(this.def)
    this.initTimer()
  }
}