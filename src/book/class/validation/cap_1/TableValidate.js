class TableValidate {
<<<<<<< HEAD
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
=======
    constructor(def){
        this.respuestas = def
        this.propertySuccess = []
        this.htmlNode = null
    }
    setHtmlNode(htmlNode){
        this.htmlNode = htmlNode
    }
  
    valuesSuccess(){
      this.propertySuccess.forEach(sucess=>{
          sucess.parentElement.style.backgroundColor = "#797c";
        })  
      this.propertySuccess = []
    }
  
    validate(valueValidate){
        for (let i = 0; i < this.respuestas.length; i++) {
            this.respuestas[i].forEach(resColumRow=>{
>>>>>>> dda43317208f423287650edbef4d145549dac34d
                if (resColumRow.column == valueValidate.dataset.column && resColumRow.row == valueValidate.dataset.row) {
                    let sucess = resColumRow.response.some(res=>{
                        if (valueValidate.value == "selecciona"||valueValidate.value == "") {
                            valueValidate.parentElement.style.background = "transparent"
<<<<<<< HEAD
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
=======

                        }
                        else if (res == valueValidate.value.trim().toLowerCase()) {
                            return true
                        }
                        else{
                            valueValidate.parentElement.style.background = "#e17055" 
                        }
                    })
                    if (sucess) {

>>>>>>> dda43317208f423287650edbef4d145549dac34d
                        this.propertySuccess.push(valueValidate)
                    }
                  return;
                  }
            })
            }
<<<<<<< HEAD
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
=======
            this.valuesSuccess()
    }
    reset(){
        this.inputs = this.htmlNode.querySelectorAll("math-field")
        this.selects = this.htmlNode.querySelectorAll("select")
        this.inputs.forEach(e=>{
            e.value = ""
            e.parentElement.style.background = "transparent" 
        })
        this.selects.forEach(e=>{
            e.selectedIndex = 0
            e.parentElement.style.background = "transparent" 

        })
>>>>>>> dda43317208f423287650edbef4d145549dac34d
    }
}