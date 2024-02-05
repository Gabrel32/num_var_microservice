
// test esta prueba revisa la creacion de todos los
// objetos y ademas los llamados de los metodos
// Objeto literal que contiene las características del tablero y las listas indicadas

const definitionTest = {
    id: "jxgbox",
    styles: {
        boundingbox: [-5, 5, 5, -5],
        grids: { x: { visible: false }, y: { visible: false } },
        axies: {
            y: {
                visible: false,
                strokeColor: "green",
            },
            x: {
                visible: true,
                strokeColor: "red",
                label: { visible: false },
            },
        },
    },
    points: [{ x: 1, y: 1, style: { visible: true } }, [3, 2, true]],
    lines: [
        //{ points: [[0, 2], [2, 2]], style: { dash: 2 } },
        {
            pointsStyles: {
                color: "blue",
                visible: true,
            },
            points: [[-2, -3, true], { x: 2, y: -3, style: { visible: true } }],
        },
    ],
    curves: [
        {
            points: [[-3, -1, true], { x: 1.5, y: -1 }, { x: 2, y: -2 }],
        },
    ],
    polygons: [
        {
            pointsStyle: {
                visible: true,
            },
            styles: { fillOpacity: 1 },
            points: [
                { x: 3, y: 3, style: { visible: false, color: "red" } },
                { x: 1, y: 1 },
                { x: -2, y: 1 },
            ],
        },
    ],
    arcs: [
        {
            points: [
                [1, 0],
                [0, 0],
                [2, 0],
            ],
        },
        {
            points: [
                [0, 1],
                [0, 2],
                [0, 0],
            ],
        },
    ],
    inputs: [
        { x: 0, y: 1, value: '1' },
        { x: -1, y: -1, value: '3', },
        { x: 1, y: -1, value: '2' },
    ],
};
// Crear una instancia de la clase baseBoards con el objeto literal definition
const baseBoardsX = new baseBoards(definitionTest);

baseBoardsX.addPoint({ x: 2, y: 3, style: { color: "green" } });
