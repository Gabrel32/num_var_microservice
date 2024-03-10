
class BaseEngine {
  constructor() {
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
    this.htmlNode.addEventListener('input', (e) => {
    this.validateStatus = false;
    this.iniciarTimer(e);
    });
    this.htmlNode.addEventListener('blur', this.detenerTimer);

  };

  iniciarTimer = (e) => {
    this.validateStatus = false
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
    console.log('detener');
    this.timerActive = false;
    clearInterval(this.Timer);
    this.Timer = null;
  };

  resetTimer = () => {
    console.log(`Tiempo transcurrido: ${this.timerInteraction} segundos;`);
    clearInterval(this.Timer);
    this.timerInteraction = 0;
  };

  validate = () => {

    if (this.validateStatus) {
      //status: posibles estatus
      //1: Correct
      //2: incorrect
      //3: notChange

      return { status: 3 };
    } else {
      this.validateStatus = !this.validateStatus

      const dataMod = {

        ...this.validation.iniTMainValidations(this, this.conditions),
        timer: this.timerInteraction,
      }

      this.resetTimer();
      this.detenerTimer();
      return dataMod
    }
  };

  reset() {
    this.iniTMainReset(this)
  }

  return() {
    this.iniTMainReturn(this)
  }

}
