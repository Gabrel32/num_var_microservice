class Engine extends BaseEngine {
    constructor(id, type,content,tmp) {
        super()
      this.tmp = document.querySelector(`#${tmp}`)
      this.htmlNode = this.tmp.content.firstElementChild.cloneNode(true);
      this.content = document.querySelector(content)
      this.bool2 = false
      this.boardTypes(type)
      //template string
      this.boardId = id
      //ya no va, se necesita dinamico
      this.boardContent = this.htmlNode.querySelector(".board")
        this.boardContent.id = id
      
      this.content.appendChild(this.htmlNode)
      this.testing()
    }
    templateInsert = () => {
        if (!document.querySelector('#tmp')) {
            document.body.insertAdjacentHTML('afterend', $templateDefaults);
        }
        return this.htmlNode
      }
    boardTypes(type = 1) {
      //dejalo quieto
      switch (type) {
        case 1:
          this.lines = [
            [[-3, 2.5], [-3, 1.5]],
            [[0, 2.5], [0, 1.5]],
            [[0, 1.5], [-1.5, 1.5]],
            [[-3, 1.5], [-1.5, 1.5]],
            [[3, -1.5], [-1.5, -1.5]],
            { styles: { lastArrow: true }, position: [[0, -1.5], [0, -3]] },
            { styles: { lastArrow: true }, position: [[-1.5, 1.5], [-1.5, 0.5]] },
            [[3, 2.5], [3, -1.5]],
            [[-1.50, -0.5], [-1.50, -1.50]],
          ]
          this.array = [
            { x: 3, y: 3.6, value: '6' },
            { x: 0, y: 3.6, value: '8' },
            { x: -1.5, y: -0.1, value: '3' },
            { x: -3, y: 3.6, value: '4' },
            { x: 0, y: -3.5, value: '5' },
            { x: -1.5, y: 2.8, value: '+', type: 2 },
            { x: 1, y: -0.2, value: '+', type: 2 },
          ]
  
          break;
        case 2:
          this.lines = [
            [[3, 2.5], [3, 1.5]],
            [[0, 2.5], [0, 1.5]],
            [[0, 1.5], [1.5, 1.5]],
            [[3, 1.5], [1.5, 1.5]],
            [[-3, -1.5], [1.5, -1.5]],
            { styles: { lastArrow: true }, position: [[0, -1.5], [0, -3]] },
            { styles: { lastArrow: true }, position: [[1.5, 1.5], [1.5, 0.5]] },
            [[-3, 2.5], [-3, -1.5]],
            [[1.50,-1.5], [1.50, 1.50]],
          ]
          this.array = [
            { x: 3, y: 3.6, value: '2' },
            { x: 0, y: 3.6, value: '3' },
            { x: 1.5, y: -0.1, value: '5' },
            { x: -3, y: 3.6, value: '6' },
            { x: 0, y: -3.5, value: '7' },
            { x: 1.5, y: 2.8, value: '+', type: 2 },
            { x: -1, y: -0.2, value: '-', type: 2 },
          ]
  
          break;
   case 3:
          this.lines = [
            [[-1.5, 2.5], [-1.5, 1.5]],
            [[1.5, 2.5], [1.5, 1.5]],
            [[0, 1.5], [1.5, 1.5]],
            [[-1.5, 1.5], [1.5, 1.5]],
            { styles: { lastArrow: true }, position: [[0, -1], [0, -3]] },
            [[0, 1.4], [0, 0.5]] 
           
          ]
          this.array = [
            { x: 1.5, y: 3.6, value: 'ra' },
            { x: 0, y: 0, value: 'ra' },
            { x: -1.5, y: 3.6, value: 'ra' },
            { x: 0, y: -3.5, value: 'ra' },
            { x: 0, y: 2.8, value: 'ra', type: 2 },
          ]
          break
           case 4:
           this.lines = [
            [[-1.5, 2.5], [-1.5, 0.8]],
            [[1.5, 2.5], [1.5, 0.8]],
           
            [[-1.5, 0.8], [1.5, 0.8]],
            { styles: { lastArrow: true }, position: [[0, 0.8], [0, -0.4]] },
           
          ]
          this.array = [
            { x: 1.5, y: 3.6, value: 'ra' },
            { x: 0, y: -1, value: 'ra' },
            { x: -1.5, y: 3.6, value: 'ra' },
            { x: 0, y: 2.2, value: 'ra', type: 2 },
          ]
          break
        //si
     default:
          break;
      }
    }
    testing() {
        this.initTimer(this.htmlNode)
  
      //const allPoint = []
  
      this.board = JXG.JSXGraph.initBoard(this.boardContent.id,
        {
          showcopyright: false,
          boundingbox: [-5, 5, 5, -5],
          axis: this.bool2,
          ticks: { visible: false }
  
  
        });
  
  
      this.lines.forEach(element => {
        console.log('=>', element)
        if (Array.isArray(element)) {
          this.linesPoint(element)
        } else {
          this.linesPoint(element.position, element.styles)
        }
      })
  
  
  
  
      this.array.forEach((element) => {
        console.log('=>', element)
        //destructurado
        const { x, y, value, type } = element
        //invocación sin "element"
        this.createInput1(x, y, value, type)
      })
      
    }
    
  
    linesPoint(position, style) {
      this.board.create('line', position,
        {
          strokecolor: 'blue',
          strokeWidth: 2,
          straightFirst: false,
          straightLast: false,
  
          //fixed: true,
          ...style
        })
        
    }
  
    createInput1(x, y, text, type = 1) {
      console.log(type)
      return this.board.create(
        "text",
        [x, y, `<input value=${text} class='${type == 1 ? `inputClass` : `inputCuadrado`}'></input>`],
        {
          anchorX: "middle",
          anchorY: "middle",
          fixed: true,
          layer: 70,
          fontSize: 8,
          fontUnit: 'vmin',
        }
      );
    }
  
  }
  
  new Engine("jsxgraph", 1,"body","tmp")
  new Engine("jsxgraph2", 2,"body","tmp")
  new Engine("jsxgraph3", 3,"body","tmp2")
  // new Engine("jsxgraph4", 4)
  // new Engine("jsxgraph2", 2)
  
  // new Engine("jsxgraph3",3)
  // new Engine("jsxgraph4", 4)
  