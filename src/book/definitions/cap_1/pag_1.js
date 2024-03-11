const defBoards = {
  board_1: {
    artifact: "artifact_1",
    styles: {
      boundingbox: [-4, 3, 4, -2],
      axies: {
        y: { visible: false },
        x: {
          ticks: {
            visible: false
          }
        }
      }
    },
    points: [
      {
        x: 0, y: 0, style: {
          visible: true,
          layer: 100
        }
      },

    ],

    intervals: [
      {
        height: 1,
        fillInterval: true,
        inputs: {
          a: {
            value: '1',
            style: { mathClass: 'esto' }
          }
        },
      }
    ],

  },
  /////////////////////////
  board_2: {
    artifact: "artifact_1",
    styles: {
      boundingbox: [-4, 3, 4, -2],
      axies: {
        y: { visible: false },
        x: {
          ticks: {
            visible: false
          }
        }
      }
    },
    points: [
      {
        x: 0, y: 0, style: {
          visible: true, color: "red",
          layer: 100
        }
      },

    ],

    intervals: [
      {
        height: 1,
        fillInterval: true,
        inputs: {
          a: {
            value: '3', style: { mathClass: 'esto' }
          },
          b: 4
        },
      }
    ],

  },
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {

  artifacts: {
    artifact_1: {
      parent: 'main_2',
      board: 'board_1',
      engine: HorizontalSegment,
      //condiciones
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: 'Error desde la def',
            //tiene que tener estos valores
            values: [
              ['x1', 'x2'],
              ['x2']
            ]
          },
        },
      },
      /*   template: { id: 'temp-segment' } */
    },
  }
};

const contentMain = new CreateView(def, defBoards);

contentMain.initVIew({
  style: { class: ['passInLibrary'] },
  parent: 'main_2',
  artifacts: {
    artifact_2: {
      board: 'board_2',
      engine: HorizontalSegment,
      template: { id: 'temp-segment' },
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: 'Error desde la def',
            //tiene que tener estos valores
            values: [
              ['x1', 'x2'],
              ['x2']
            ]
          },
        },
      },
    },
  }

});
