class ValidationDiagrama {
  constructor() {

  }
  iniTMainValidations(def, conditions,) {
    this.inputs = def.htmlNode.querySelectorAll(".show")
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
    conditions.forEach(condicion => {
      this.inputs.forEach(input => {
        if (input.value == condicion) {
          input.classList.add('passInLibrary')
          interaction.correctas++

        } else {
          input.classList.add('failedInLibrary')

          // interaccciones incorrectas 

          interaction.inCorrectas++
        }
      })
    })

return data

  }
  iniTMainReset() {

  }



}
