class HorizontalSegment extends baseBoards {
  constructor(def, defBoard) {
    super({ def, defBoard });
    this.name = def.name;
    this.defBoard = defBoard;
    this.idTemplate = '#temp-segment';
    this.conditions = def.conditions;
    this.allPoints = [];
    this.def = { ...def };
    this.idboard = def.name + "_board";
    this.validation = new ValidationHorizontal(this.def);
    this.templateInsert();
  };

  validate() {
    this.validation.iniMainValidations();
  };

  templateInsert = () => {
    if (!document.querySelector('#temp-segment')) {
      const $templateDefaults = null ?? `<template id="temp-segment"><
        <div class="d-flex flex-column border-board-dark verticalDiagram">
          <div class="statement-top border-board-dark w-100 textCenter">
            <button class="styleBtn buttonTertiary" title="value 1">1</button>
            <button class="styleBtn buttonTertiary" title="value 2">2</button>
            <button class="styleBtn buttonTertiary" title="value 3">3</button>
            <button class="styleBtn buttonTertiary" title="value 4">4</button>
          </div>
    
          <div id="jxgbox" class="jxgbox baseBoard boardDiagram w-100"></div><!-- board donde tiene que ir el-->
          <div class="statement statement-bottom border-board-dark w-100 h-100 textCenter mt-1 mb-1"
            style="height: 100%; min-height: 30px; display: none;"></div>
    
          <div class="all-btn w-100 border-board-dark">
            <div class="btnBaseArtifact border-dark rounded">
              <div class="sectionBtn interactive-btn"> </div>
              <div class="sectionBtn default-btn gap-2">
                <button class="reset styleBtn buttonSecundary" title="Reset"></button>
                <button class="check styleBtn buttonPrimary" title="Validar"></button>
              </div>
            </div>
          </div>
        </div>
    
      </template>`;
      document.body.insertAdjacentHTML('afterend', $templateDefaults);
    }

    this.htmlNode ??= document.querySelector('#temp-segment').content.firstElementChild.cloneNode(true);
    return this.htmlNode;
  };

  initEngine() {
    if (this.initBoardBase({ id: this.idboard, ...this.defBoard })) {
      this.createIntervals({ intervals: this.defBoard.intervals });
    }
    this.addTimer();
  };

  createIntervals(params) {
    const { intervals = [] } = params;
    intervals.forEach((interval) => {
      this.addInterval(interval);
    });
  };

  addInterval({
    height = 1.5,
    interval = [-2, 2],
    values = { a: "", b: "", c: "" },
    fillInterval = true,
  }) {

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
    const style = { disabled: true };
    this.createInputs({
      inputs: [
        {
          x: (interval[0] + interval[1]) / 2,
          y: height + 0.7,
          value: values.b,
          style
        },
        { x: interval[0], y: -1, value: values.a, style },
        { x: interval[1], y: -1, value: values.c, style },
      ],
    });

    if (MathLive) {
      MathLive.renderMathInDocument();
    }
  };

}