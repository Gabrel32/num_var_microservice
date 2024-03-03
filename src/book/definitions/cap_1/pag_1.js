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
                    visible: true, color: "red",
                    layer: 100
                }
            },

        ],

        intervals: [
            {
                height: 1,
                fillInterval: true,
                values: { a: '1' },
                style: { disabled: true }
            }
        ],

    },
    /////////////////////////
    board_2: {
        //1
        points: [
            [0, 1, true, "1", true, "black"],
            [0, -1, true, "-1", true, "black"],
        ],
        //asymptotes: asynVisual_1,
        artifact: "artifact_2",
        style: {
        },

        curves: [
            {
                dash: 2,
                points: [[-8, 1], [8, 1]],
            },
            {
                points: [[-2, 1], [-1.72, 0.78], [-1.6, 0.5]],
            },
            {
                points: [[-1, 1], [-0.68, 0.7], [-0.5, 0.4]],
            },
            {
                points: [[2, 1], [2.6, 0.6], [3, 0]],
            },
            {
                points: [[1, 1], [1.4, 0.7], [1.6, 0.2]],
            },
        ],

        lines: [
            { points: [[-8, -1], [8, -1]], dash: 2 },
            { points: [[3, 8], [3, -8]], dash: 2, strokeColor: '#6a019f', opacity: 0.4, strokeWidth: 3 }
        ],
    }
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {

    artifacts: {
        /*   artifact_1: { template: { id: 'temp-segment' } },
          artifact_2: { template: { id: 'temp-segment' } }, */
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

                }
            }
            /*   template: { id: 'temp-segment' } */
        },

    }

}

const contentMain = new CreateView(def, defBoards);

contentMain.initVIew({
    style: { class: ['passInLibrary'] },
    parent: 'main_2',
    artifacts: {
        artifact_2: {
            board: 'board_1',
            engine: HorizontalSegment,
            template: { id: 'temp-segment' }
        },
    }

})