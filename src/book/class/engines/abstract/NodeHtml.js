class NodeHtml extends BaseEngine {
    constructor(){
        super()
        this.entris = []
    }
    createMathField(params){
        let mathfield = document.createElement("math-field")
        mathfield.classList = params.style.mathStyle
        mathfield.mathVirtualKeyboardPolicy = "manual";
        mathfield.addEventListener("focusin", () =>  mathVirtualKeyboard.show());
        mathfield.addEventListener("focusout", () =>  mathVirtualKeyboard.hide());
        mathfield.addEventListener("keydown", (evt) => evt.preventDefault(), { capture: true });
        mathfield.addEventListener("focus", () =>  mathVirtualKeyboard.show());
        this.entris.push(mathfield)
        return mathfield

    }
    createSelect(params){
        let select = document.createElement("select")
        select.classList =  params.style.select
        for (let i = 0; i < params.valueOption.length; i++) {
            let opcion = new Option(params.valueOption[i].valor,params.valueOption[i].valor);
            select.add(opcion,this.NumberRamdom(params.valueOption.length) );
        }
        this.entris.push(select)
        return select
    }
    NumberRamdom(num){
        let numeroAleatorio = Math.floor(Math.random() * num) + 1;
      
        while (this.numerosGenerados.includes(numeroAleatorio)) {
          return numeroAleatorio = Math.floor(Math.random() * num) + 1;
        }
        this.numerosGenerados.push(numeroAleatorio);
        return numeroAleatorio;
      }
} 