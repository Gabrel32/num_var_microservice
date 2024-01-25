class HorizontalSegment extends baseBoards {
  constructor(definition, board) {
    console.log(board);
    super(board);
    this.conditions = definition.conditions;
    this.allPoints = [];
    this.definition = { ...definition };
    //this.addInterval(definition.intervals[0])
    this.createIntervals({ intervals: board.intervals });
  }

  initArtifact() {
    super.initArtifact();
  }
  createIntervals(params) {
    const { intervals } = params;
    intervals.forEach((interval) => {
      this.addInterval(interval);
    });
  }
  addInterval({
    height = 1.5,
    interval = [-2, 2],
    values = { a: "", b: "", c: "" },
    fillInterval = true,
  }) {
    const intervalDefault = this.board.attr.boundingbox;
    this.createLines({
      lines: [
        {
          points: [
            [interval[0], height],
            [interval[1], height],
          ],
          style: {
            firstArrow: true,
            lastArrow: true,
          },
        },
        {
          points: [
            [interval[0], height],
            [interval[0], 0, true],
          ],
        },
        {
          points: [
            [interval[1], height],
            [interval[1], 0, true],
          ],
        },
      ],
    });

    if (fillInterval) {
      const fillCurves = { curves: [] };
      const fillPoints = { flex: 1.5, points: [] };
      fillPoints.points.push({
        x: interval[0],
        y: 0,
        style: { visible: true },
      });

      for (
        let i = interval[0];
        i < interval[1];
        i += fillInterval?.inteval ?? 1
      ) {
        fillPoints.points.push({
          x: i + (fillInterval?.inteval ?? 1) / 2,
          y: 0.75,
          style: { visible: false },
        });
        fillPoints.points.push({ x: i, y: 0, style: { visible: true } });
      }
      fillPoints.points.push({
        x: interval[1],
        y: 0,
        style: { visible: true },
      });

      fillPoints.points.sort((a, b) => a.x - b.x);
      fillCurves.curves.push(fillPoints);

      this.createCurves({
        curves: fillCurves.curves,
        styles: { strokeWith: 8 },
      });
    };

    this.createInputs({
      inputs: [
        {
          x: (interval[0] + interval[1]) / 2,
          y: height + 0.7,
          value: values.b,
        },
        { x: interval[0], y: -1, value: values.a },
        { x: interval[1], y: -1, value: values.c },
      ],
    });
    /* vuelve a llamar el render de mathlive */
    MathLive.renderMathInDocument();
  }
}