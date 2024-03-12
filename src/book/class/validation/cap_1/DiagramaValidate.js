class ValidationDiagrama {
  constructor() {

  }
  iniTMainValidations(def, conditions) {
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
    this.validateDiagrama(def, conditions, data)
    return data
  
  }
  validateDiagrama(def, conditions, data){
  const interaction = data.interaction
  //Se itera el array que ya contiene las respuestas
  def.inputsValidate.forEach((input, i) => {
    const condicion = conditions[i];
    if (input.mathfield.value == '') {
      interaction.forAswer++;
    }else{
      if (condicion.includes(input.mathfield.value)) {
        input.mathfield.classList.add('passInLibrary');
        interaction.correctas++;
    }else {
        input.mathfield.classList.add('failedInLibrary');
        data.status = 2;
        interaction.inCorrectas++;
    }
    }
});

}

}
7