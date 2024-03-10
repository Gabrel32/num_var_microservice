class verticalValidate {
    constructor(){

    }
    iniTMainValidations(def, conditions){
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
          return data
    }
    iniTMainReset(def){
      const inputs_r = def.htmlNode.firstElementChild.querySelectorAll(".hblted")
    inputs_r.forEach((inputs)=> {
    if(inputs.textContent==""){ inputs.value="";}
     
    })
    }
}