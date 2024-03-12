class UX {
  constructor() {
    this.modal();
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
  modal = () => {
    const modalTmp = `
     <div id="genericModal" class="modalGeneric">
      <!-- Modal content -->
      <div class="modalGeneric-content">
        <div class="modalGeneric-header">
          <buttom class="modalGenericClose buttonAux closed"></buttom>
          <h2>User data</h2>
          <p id="text-modal">User</p>
        </div>
        <div class="modalGeneric-body">
          <table style="width: 100%;">
            <tr>
              <th>typeArtifact</th> <th>status</th> <th>timer</th> <th>interaction</th>
            </tr>
            <tr>
              <td class="type"></td>
               <td class="status"></td>
               <td class="timer"></td> <td>
                  <ul class="interaction" style="text-align: start;">
                  <ul>Correctas: <span class="correct"></span> </ul>
                  <ul>Incorrectas: <span class="inCorrect"></span> </ul>
                  <ul>Por hacer: <span class="forAswer"></span> </ul>
                </ul>
              </td>
            </tr>
          </table>
        </div>
        <div class="modalGeneric-footer">
          <h3>Modal Footer</h3>
        </div>

      </div>
    </div> `;

    if (!document.querySelector('#genericModal')) {
      document.body.insertAdjacentHTML('afterend', modalTmp);
    };

    this.modalView = document.querySelector('#genericModal');
    this.modalView.addEventListener('click', (e) => {
      if (e.target.classList.contains('modalGenericClose')) {
        this.visibleModal(false);
      } else {
        console.log('hola?');
      }
    });

    return this.modalView;
  };

  visibleModal(mode = true, data) {
    if (data) {

      const { interaction, typeArtifact, status, timer } = data;
      //console.log(interaction, typeArtifact, message, status, timer);
      console.log('entra', data);
      if (data.status !== 3) {
        this.modalView.querySelector('.inCorrect').innerText = interaction.inCorrectas;
        this.modalView.querySelector('.forAswer').innerText = interaction.forAswer;
        this.modalView.querySelector('.correct').innerText = interaction.correctas;
        this.modalView.querySelector('.type').innerText = typeArtifact;
        this.modalView.querySelector('.status').innerText = status;
        this.modalView.querySelector('.timer').innerText = timer;
      }
    }
    this.modalView.style.display = mode ? "flex" : 'none';
  }
};