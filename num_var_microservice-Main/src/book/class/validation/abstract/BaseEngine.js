class BaseEngine {
    constructor() {
        this.def = {}
        this.htmlNode = null
    }

    timer(def, mode = true, reset = true) {
        if (!def) { return; };
        def.timeInteraction = def?.timeInteraction ?? 0;
        if (def.statusValidate === undefined) {
            def.statusValidate = false;
        };

        if (!def.statusValidate) {
            if (mode) {
                if (!def.timerState) {

                    def.timer = setInterval(function () {
                        if (def.statusValidate) {
                            clearInterval(def.timer);
                            def.timeInteraction = 0;
                            return;
                        };
                        def.timeInteraction++;
                        if (def.debug) {
                            console.log(def.timeInteraction);
                        };
                    }, 1000);

                    def.timerState = true;
                };
            } else {
                if (def.timer) {
                    clearInterval(def.timer);
                    def.timerState = false;
                }
                if (reset) {
                    def.timeInteraction = 0;
                    def.statusValidate = true;
                };
            };
        };
    }

    addTimer() {
        console.log('timer');
    }

}