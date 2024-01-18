const defSegmentTest = {
    board_1: {
        styles: {
            boundingbox: [-4, 3, 4, -2],
            axies: {
                y: { visible: false },
                x: {
                    ticks: {
                        visible: false,
                    },
                },
            },
        },
        intervals: [
            {
                height: 1,
                fillInterval: true,
                values: { a: "1", b: "2" /* c: '3'  */ },
                style: { disabled: true },
            },
        ],
    },
};
const defTest = {
    artifact_1: {
        conditions: {
            inputs: {
                input_3: 2,
            },
        },
    },
};
/* test */
window.onload = () => {
    const newHorizontal = new HorizontalSegment(
        defTest.artifact_1,
        defSegmentTest.board_1
    );
};
