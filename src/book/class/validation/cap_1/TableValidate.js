class TableValidate {
    constructor(){
        this.propertySuccess = []
    }
    valuesSuccess(data){
      this.propertySuccess.forEach(sucess=>{
          sucess.parentElement.style.backgroundColor = "#797c";
          data.interaction.correctas++
        })  
      this.propertySuccess = []
    } 
  
    iniTMainValidations(def,conditions,){
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

        
        if (def.entris.length) {
            def.entris.forEach(e=>{
                this.validate(e,conditions,data)
            })    
        }
        this.valuesSuccess(data)
        return data
        
        
    }
    validate(valueValidate,conditions,data){
        for (let i = 0; i < conditions.length; i++) {
            conditions[i].forEach(resColumRow=>{
                if (resColumRow.column == valueValidate.dataset.column && resColumRow.row == valueValidate.dataset.row) {
                    let sucess = resColumRow.response.some(res=>{
                        if (valueValidate.value == "selecciona"||valueValidate.value == "") {
                            valueValidate.parentElement.style.background = "transparent"
                            data.interaction.forAswer++
                        }
                        else if (res == valueValidate.value.trim().toLowerCase()) {
                            return true

                        }
                        else{
                            valueValidate.parentElement.style.background = "#e17055"
                            data.interaction.inCorrectas++
                            data.status = 2
                            data.message = `tiene: ${data.interaction.inCorrectas} respuestas incorrectas`  
                        }
                    })
                    if (sucess) {
                        this.propertySuccess.push(valueValidate)
                    }
                  return data;
                  }
            })
            }
    }
    iniTMainReset(def){
        if (def.entris.length) {
            def.entris.forEach(e=>{
                e.value = ""
                e.parentElement.style.background = "transparent"
                e.selectedIndex = 0
 
            })
        }
    }
    iniTMainReturn(){
    console.log("estamos return... ");
    }
}