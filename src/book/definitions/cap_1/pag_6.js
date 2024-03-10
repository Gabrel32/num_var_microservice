const def = {
  artifacts: {
    artifac_1: {
      valuesDefault: [

        {
          type: 5,

          inputA: '6',
          inputB: '3',
          inputC: '4',
          inputD: '',
          inputE: '',
          inputF: '+',
          inputG: '+',
          id: "jsxgraph",
          content: "body",

        },

        {
          type: 6,

          inputA: '6',
          inputB: '3',
          inputC: '4',
          inputD: '',
          inputE: '',
          inputF: '+',
          inputG: '+',
          id: "jsxgraph2",
          content: "body",


        },
      ],
      conditions: [
        '7', '13', '9'
      ],
      tmp: "tmp2",
      engine: Engine,
    },
    artifac_2: {
      valuesDefault: [
        {
          type: 2,

          inputA: '8',
          inputB: '4',
          inputC: '5',
          inputD: '',
          inputE: '',
          inputF: '+',
          inputG: '+',
          content: "body",
          id: "jsxgraph3",
        }],
      conditions: [
        '9', '17'
      ],
      tmp: "tmp",
      engine: Engine,

    },
    artifac_3: {
      valuesDefault: [
        {
          type: 3,

          inputA: '8',
          inputB: '4',
          inputC: '',
          inputD: '8+4',
          inputE: '+',
          content: "body",
          id: "jsxgraph4",
        }],
      conditions: [
        '12'
      ],
      tmp: "tmp",
      engine: Engine,

    }, artifac_4: {
      valuesDefault: [
        {
          type: 4,

          inputA: '8',
          inputB: '4',
          inputC: '',
          inputD: '+',
          content: "body",
          id: "jsxgraph5",
        }],
      conditions: [
        '12'
      ],
      tmp: "tmp",
      engine: Engine,

    },
  },

};


const contentMain = new CreateView(def)
