const allDef = {
  engine: DiagramVertical,
  artifacts: {
    artifact_1: {
      parent: 'lexico',
      conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"3x"},
        {value:"2"},
        {value:"2"},
        {value:"7"}
      ],
      engine: DiagramVertical,
      inputs: [
        { type: 1, value1: 'x', value2: '', value3:'',value4:'', style1:"",style2:"" },
         { type: 2, value1: '()+3', value2: '' , value3:'',value4:'',style1:"",style2:"" },
         { type: 1, value1: '', value2: '', value3:'',value4:'', style1:"",style2:"" },
         { type: 2, value1: '2*()', value2: '' , value3:'',value4:'',style1:"",style2:"" },
         { type: 1, value1: '', value2: '20', value3:'',value4:'',style1:"",style2:""  }
      ],
      id: "artifact1"
    },
     artifact_2: {
       parent: 'clase',
       conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"2"},
        {value:"2"},
        {value:"2"},
        {value:"7"},
        {value:"7"},
        {value:"13"},
        {value:"8"}
      ],
        engine: DiagramVertical,
        inputs: [
         { type: 1, value1: '', value2: '', value3:' 3 y + 2 = 8',value4:'', style1:"",style2:"" },
         { type: 2, value1: '', value2: '', value3:' 3 y + 2 = 8',value4:'',style1:"",style2:"" },
         { type: 1, value1: '', value2: '', value3:' 3 y + 2 = 8',value4:'', style1:"",style2:"" },
         { type: 2, value1: '', value2: '', value3:' 3 y + 2 = 8',value4:'',style1:"",style2:"" },
         { type: 1, value1: '', value2: '', value3:' 3 y + 2 = 8',value4:'',style1:"",style2:""  }
        ],
        id: "artifact1"
      },
      artifact_3: {
       parent: 'tarea',
       conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"2"},
        {value:"2"},
        {value:"2"},
        {value:"7"}
      ],
        engine: DiagramVertical,
        inputs: [
         { type: 1, value1: 'incognita', value2: 'solucion', value3:' ECUACION',value4:'SOLUCION', style1:"",style2:"" },
         { type: 2, value1: 'operacion', value2: 'operacion inversa', value3:' ECUACION',value4:'SOLUCION',style1:"",style2:"" },
         { type: 1, value1: 'formula', value2: 'numero', value3:' ECUACION',value4:'SOLUCION', style1:"",style2:"" }
        ]
      },
      artifact_4: {
       parent: 'lexico',
       conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"2"},
        {value:"2"},
        {value:"2"},
        {value:"7"}
      ],
       engine: DiagramVertical,
        inputs: [
         { type: 1, value1: 'x', value2: '3', value3:'2 x = 6',value4:'3', style1:"",style2:"" },
         { type: 2, value1: '2*()', value2: '()/2', value3:'2 x = 6',value4:'3',style1:"",style2:"" },
         { type: 1, value1: '2*x', value2: '6', value3:'2 x = 6',value4:'3', style1:"",style2:"" }
        ]
      },
      artifact_5: {
       parent: 'tarea',
       conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"2"},
        {value:"2"},
        {value:"2"},
        {value:"7"}
      ],
       engine: DiagramVertical,
        inputs: [
         { type: 1, value1: '4', value2: '4', value3:' ',value4:'', style3:"display:none;",style2:"" },
         { type: 2, value1: '()+2', value2: '', value3:'',value4:'',style3:"display:none;",style2:"" },
         { type: 1, value1: '', value2: '', value3:'',value4:'', style3:"display:none;",style2:"" }
        ]
      } ,
      artifact_6: {
       parent: 'lexico',
       conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"2"},
        {value:"2"},
        {value:"2"},
        {value:"7"}
      ],
       engine: DiagramVertical,
        inputs: [
         { type: 1, value1: '4', value2: '', value3:' ',value4:'', style3:"display:none;",style2:"display:none;" },
         { type: 2, value1: '()-2', value2: '', value3:'',value4:'',style3:"display:none;",style2:"display:none;" },
         { type: 1, value1: '6', value2: '', value3:'',value4:'', style3:"display:none;",style2:"display:none;" }
        ]
      } ,
      artifact_7: {
       parent: 'nodo',
       conditions:  [
        {value:"7"},
        {value:"13"},
        {value:"8"},
        {value:"9"},
        {value:"2"},
        {value:"2"},
        {value:"2"},
        {value:"7"}
      ],
       engine: DiagramVertical,
        inputs: [
         { type: 1, value1: '6', value2: '', value3:' ',value4:'', style3:"display:none;",style2:"display:none;" },
         { type: 2, value1: '9-()', value2: '', value3:'',value4:'',style3:"display:none;",style2:"display:none;" },
         { type: 1, value1: '3', value2: '', value3:' ',value4:'', style3:"display:none;",style2:"display:none;" },
         { type: 2, value1: '5*()', value2: '', value3:'',value4:'',style3:"display:none;",style2:"display:none;" },
         { type: 1, value1: '15', value2: '', value3:' ',value4:'', style3:"display:none;",style2:"display:none;" }
        ]
      } 
  }
}





const contentMain = new CreateView(allDef);