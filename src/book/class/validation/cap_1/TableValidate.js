class TableValidate {
    constructor(def){
        this.conditions = def
        this.propertySuccess = []
        this.htmlNode = null

    }
    setHtmlNode(htmlNode){
        this.htmlNode = htmlNode
    }
  
    valuesSuccess(){
      this.propertySuccess.forEach(sucess=>{
          sucess.parentElement.style.backgroundColor = "#b6f3bf";

        })  
      this.propertySuccess = []
    }


  iniTMainValidations(def, conditions) {
    const data = {
      typeInteraccion: 'standard',
      status: 1,
      timer: 0,
      userInteraction: {
        inputs:[],
        selects:[]
      },
      message: '',
      interaction: {
        correctas: 0,
        inCorrectas: 0,
        forAswer: 0
      }
    }
   
    this.validate(def, conditions, data)
    return data
  }
  
    validate(def, conditions, data){
        
        const interaction = data.interaction
        this.mathfield = def.htmlNode.querySelectorAll("math-field")
        this.selects = def.htmlNode.querySelectorAll("select")
        const arrayEntradas= [...this.mathfield, ...this.selects]
        
        for (let i = 0; i < conditions.length; i++) {
            conditions[i].forEach(resColumRow=>{
                arrayEntradas.forEach(e=>{


                    if (resColumRow.column == e.dataset.column && resColumRow.row == e.dataset.row) {
                       
                        let sucess = resColumRow.response.some(res=>{
                            if (e.value == "selecciona"||e.value == "") {
                                e.parentElement.style.background = "transparent"
                                interaction.forAswer++
                            }
                            else if (res == e.value.trim().toLowerCase()) {
                                return true
                            }
                            else{
                                e.parentElement.style.background = "#eab8a5"
                                interaction.inCorrectas++
                                data.status= 2;
                                data.message="Respuesta incorrecta";
                            }
                        })

                        if(e.matches('.mathfield')){
                            data.userInteraction.inputs.push(e.value)
                        }else{
                            data.userInteraction.selects.push(e.value)
                        }
                        if (sucess) {
                            interaction.correctas++
                            data.status=1;
                            data.message="Respuesta correcta";
                            this.propertySuccess.push(e)
                        }
                      return;
                      }
                })

                })
                    

            }
            this.valuesSuccess()

    }
    iniTMainReset(def){
        this.inputs = def.htmlNode.querySelectorAll("math-field")
        this.selects = def.htmlNode.querySelectorAll("select")
        this.inputs.forEach(e=>{
            e.value = ""
            e.parentElement.style.background = "transparent" 
        })
        this.selects.forEach(e=>{
            e.selectedIndex = 0
            e.parentElement.style.background = "transparent" 

        })
    }
}

