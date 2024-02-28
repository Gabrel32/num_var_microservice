class BaseEngine {
    constructor() {
        this.def = {}
        this.htmlNode = null
        this.timerInteraction = 0;
        this.Timer = null
        this.timerActive = false
    }
    
    initTimer(node) {
        /* agregar todos los eventos necesarios o que peudan tener el ejercicio */
        this.htmlNode.addEventListener('mouseenter', this.iniciarTimer)
        this.htmlNode.addEventListener('input', this.iniciarTimer)
        this.htmlNode.addEventListener('mouseleave', ()=>{
            this.detenerTimer()
        })
        this.htmlNode.addEventListener("click", (event) => {
            if (event.target.matches(".btnV") || event.target.matches(".check")) {
                this.resetTimer()
                this.detenerTimer()
            } 
        });
    }

    iniciarTimer = (cont = true) => {

        if (this.timerActive) {
            // console.log('se llama pero no se crea otro timer');
            return
        }
        this.timerActive = true
        this.Timer = setInterval(() => {
            this.timerInteraction = this.timerInteraction + 1
            console.log(this.timerInteraction);
        }, 1000)
    }

    detenerTimer = () => {
        this.timerActive = false
        clearInterval(this.Timer);
        this.Timer = null
    }

    resetTimer = () => {
        console.log(`Tiempo transcurrido: ${this.timerInteraction} segundos;`);
        clearInterval(this.Timer)
        this.timerInteraction = 0
    }

}