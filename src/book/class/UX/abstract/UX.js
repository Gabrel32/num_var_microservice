class UX {
  constructor(def) {

  }
  //agrega avisos sobre el board
  gAlerts({ def, id, text, type = 1, size = 15, timer = 4 }) {
    if (def.timeAlertCounts == undefined) {
      def.timeAlertCounts = 0;
    }

    if (def.timerAlertState) {
      if (def.textAlert) {
        def.textAlert.remove();
        def.textAlert = null;
      }
      def.timeAlertCounts = 0;
      clearInterval(def.timerAlert);
      def.timerAlertState = false;
    }

    const textAlert = document.createElement('p');
    textAlert.textContent = text;

    textAlert.classList.add(
      type == 1
        ? 'passInLibrary'
        : type == 2
          ? 'failedInLibrary'
          : 'warnInLibrary',
      'gAlert',
      'centerFloat',
    );

    textAlert.width = 'fit-content';
    textAlert.maxWidth = '90%';

    if (!def.timerAlertState && type != 1) {
      def.timerAlert = setInterval(function () {
        def.timeAlertCounts++;
        if (def.debug) {
          console.log(def.timeAlertCounts);
        }
        if (timer == def.timeAlertCounts) {
          def.timeAlertCounts = 0;
          clearInterval(def.timerAlert);
          if (def.textAlert) {
            def.textAlert.remove();
            def.textAlert = false;
          }
          def.timerAlertState = false;
        }
      }, 1000);
      def.timerAlertState = true;
    }

    if (textAlert.style.fontSize) {
      console.console.warn('le tone valor a la fuente');
      textAlert.style.fontSize = size + 'px';
    };

    if (document.querySelector('#' + id).querySelector('.jxgbox')) {
      const board = document.querySelector('#' + id).querySelector('.jxgbox');
      board.style.display = 'grid';
      board.style.placeItems = 'center';
      board.appendChild(textAlert);

    } else {
      document.querySelector('#' + id).appendChild(textAlert);
    };

    def.textAlert = textAlert;
  }

  displayConfig(params = {}) {
    if (params.def.divConfig) {
      params.def.divConfig.remove();
      params.def.divConfig = null;
    } else {
      const tmpConfig = document.querySelector('#tmp-config');
      const divConfig = tmpConfig.content.firstElementChild.cloneNode(true);
      // divConfig.querySelector(".rangeConfig").value =
      //   params.def.config?.curves?.flex ?? 1;

      divConfig.querySelector('.buttonOptions').addEventListener('click', (e) => {
        toEdit = params.def.config?.curves;
        toEdit.flex = 2;

        if (e.target.id == 'curve1') {
          toEdit.flex = 1;
        } else if (e.target.id == 'curve2') {
          toEdit.flex = 0.5;
        } else if (e.target.id == 'curve3') {
          toEdit.flex = 0;
        };
      });

      divConfig.querySelector('.colorConfig').value =
        params.def.config?.curves?.color ?? 'black';
      document.querySelector('#' + params.id).appendChild(divConfig);
      params.def.divConfig = divConfig;
    };
  };
};