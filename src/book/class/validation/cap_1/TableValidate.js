class TableValidate {
    constructor(){
      this.color = {
        succes:"#b6f3bf",
        failed:"#eab8a5",
        forAswer:"transparent"
      }
    }


  iniTMainValidations(def, conditions) {
    const data = {
      typeArtifact: 'standard',
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
        for (let i = 0; i < conditions.length; i++) {
            conditions[i].forEach(resColumRow=>{
                def.entris.forEach(e=>{
                    if (resColumRow.column == e.dataset.column && resColumRow.row == e.dataset.row) {
                      let sucess = resColumRow.response.some(res=>{
                            if (e.value == "selecciona"||e.value == "") {
                                e.parentElement.style.background = this.color.forAswer
                                interaction.forAswer++
                            }
                            else if (res == e.value.trim().toLowerCase()) {
                                return true
                            }
                            else{
                                e.parentElement.style.background = this.color.failed
                                interaction.inCorrectas++
                                data.status= 2;
                            }
                        })
                        if(e.matches('.mathfield')){
                            data.userInteraction.inputs.push(e.value)
                        }else{
                            data.userInteraction.selects.push(e.value)
                        }
                        // data.userInteraction[e.tagName.toLowerCase()] = [e.value,...data.userInteraction[e.tagName.toLowerCase()]??[]]
                        if (sucess) {
                            interaction.correctas++
                            data.status=1;
                            e.parentElement.style.backgroundColor = this.color.succes;
                        }
                      return data;
                      }
                })

                })
                    

            }

    }
    
}

