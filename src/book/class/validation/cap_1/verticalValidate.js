class verticalValidate {
  constructor() {

    this.color = {
      succes: "#b6f3bf",
      failed: "#eab8a5",
      forAswer: "transparent"
    }
  }

  iniTMainValidations(def, conditions,) {
    this.inputs=def.inputsValidate
    this.condi=conditions
     const data = {
       typeInteraccion: 'standard',
       status: 1,
       timer: 0,
       userInteraction: {},
       message: 'esta todo correcto',
       interaction: {
         correctas: 0,
         inCorrectas: 0,
         forAswer: 0
       }
     }
     const interaction = data.interaction
     for (let i = 0; i < this.inputs.length; i++) {
       const input = this.inputs[i]
       const vlue = this.condi[i]

       if (input.value == "") {
         interaction.forAswer++
       }
       else {
         
           if (input.value == vlue.value) {
            interaction.correctas++
           input.style.background = this.color.succes
           }
          else {
           interaction.inCorrectas++
           input.style.background = this.color.failed
         }
       }
     }



     return data

  };
  
}