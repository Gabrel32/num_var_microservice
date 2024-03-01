class BaseEngine {
    constructor() {
      this.def = {};
      this.htmlNode = null;
      this.timerInteraction = 0;
      this.Timer = null;
      this.timerActive = false;
      this.onFocus = null;
    }
  
    initTimer() {
      /* agregar todos los eventos necesarios o que peudan tener el ejercicio */
      this.htmlNode.addEventListener('mouseenter', this.iniciarTimer);
      this.htmlNode.addEventListener('mouseleave', this.detenerTimer);
      this.htmlNode.addEventListener("click", (event) => {
        if (event.target.matches(".check")) {
          this.resetTimer();
          this.detenerTimer();
        }
      });
      this.htmlNode.addEventListener('input', this.iniciarTimer);
      this.htmlNode.addEventListener('blur', this.detenerTimer);
  this.htmlNode.addEventListener("keydown", (event) =>
      event.preventDefault(), { capture: true });
	  
	  this.htmlNode.mathVirtualKeyboardPolicy = "manual";
    }
  
    iniciarTimer = (e) => {
  
  this.htmlNode.addEventListener("focusin", (e) => {
	
if (e.target.matches('math-field')){
		      mathVirtualKeyboard.show()
}else if(e.target.matches('.disabled')){
			      mathVirtualKeyboard.hide()
}else{
	console.log('hay select')
}

this.iniciarTimer
    });
  
      if (this.timerActive) {
        // console.log('se llama pero no se crea otro timer');
        return;
      }
      this.onFocus = e.target;
      const onFocus = e.target;
      this.timerActive = true;
      this.Timer = setInterval(() => {
  
        if (this.onFocus.hasFocus && !this.onFocus.hasFocus()) {
          this.detenerTimer();
          return;
        }
  
        this.timerInteraction = this.timerInteraction + 1;
        console.log(this.timerInteraction);
      }, 1000);
    };
  
    detenerTimer = () => {
    //   console.log('detener');
      this.timerActive = false;
      clearInterval(this.Timer);
      this.Timer = null;
    };
  
    resetTimer = () => {
      console.log(`Tiempo transcurrido: ${this.timerInteraction} segundos;`);
      clearInterval(this.Timer);
      this.timerInteraction = 0;
    };
  
  }