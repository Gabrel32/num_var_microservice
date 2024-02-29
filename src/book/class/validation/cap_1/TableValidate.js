class TableValidate {
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
                if (resColumRow.column == valueValidate.dataset.column && resColumRow.row == valueValidate.dataset.row) {
                    let sucess = resColumRow.response.some(res=>{
                        if (valueValidate.value == "selecciona"||valueValidate.value == "") {
                            valueValidate.parentElement.style.background = "transparent"

                        }
                        else if (res == valueValidate.value.trim().toLowerCase()) {
                            return true
                        }
                        else{
                            valueValidate.parentElement.style.background = "#e17055" 
                        }
                    })
                    if (sucess) {

                        this.propertySuccess.push(valueValidate)
                    }
                  return;
                  }
            })
            }
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
    }
}