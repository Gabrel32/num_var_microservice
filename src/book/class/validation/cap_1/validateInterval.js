
class ValidationHorizontal {
  constructor() {

  }

  iniTMainValidations(def, conditions) {
    //correctas,incorrectas y por hacer
    //interaction: { correctas: 3, incorrectas: 2, forAswer: 0 }
    /* {
      status: 3,
      message:'Error'
      interaction: {
        correctas: 3,
        incorrectas: 2,
        forAswer: 0
      }
    } */
    const data = {
      typeInteraccion: 'standard',//loadPage
      status: 1,
      timer: 0,
      userInteraction: {},
      message: '',
      interaction: {
        correctas: 0,
        inCorrectas: 0,
        forAswer: 0
      }
    }
    this.validateIntervals(def, conditions, data)
    return data
  }

  validateIntervals(def, conditions, data) {
    const { intervals } = conditions
    const { inputs } = intervals
    const interaction = data.interaction

    const messageDefault = 'El intercalo indicado no es correcto';
    const intervalsValues = []
    def.intervals.forEach(interval => {

      const values = []
      interval.inputs.forEach((inp, i) => {
        if (inp.mathfield.value !== '') {
          if (this.valudateInputs(inp.mathfield.value, inputs.values[i])) {
            inp.mathfield.classList.add('passInLibrary')
            // interaccciones correctas
            interaction.correctas++
          } else {
            inp.mathfield.classList.add('failedInLibrary')
            data.status = 2
            // interaccciones incorrectas 
            interaction.inCorrectas++
          }
        } else {
          //interacciones por hacer 
          interaction.forAswer++
        };

        values.push(inp.mathfield.value)

      });
      intervalsValues.push(values);
    });
    data.message = data.message + '2'
    data.userInteraction.intervals = intervalsValues
  }

  valudateInputs(input, condition) {
    return condition.includes(input);
  }

};
