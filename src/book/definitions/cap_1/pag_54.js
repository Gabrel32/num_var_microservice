const def = {
    artifacts:{
        artifact_1: {
            inputs: [
              { type: 1, value1: 'x', value2: '' },
              { type: 2, value1: '()+3', value2: '' },
              { type: 1, value1: '', value2: '' },
              { type: 2, value1: '2*()', value2: '' },
              { type: 1, value1: '', value2: '20' }
            ],
            id:"artifact1"
          },
        artifact_2: {
            inputs: [
              { type: 1, value1: '', value2: '' },
              { type: 2, value1: '', value2: '' },
              { type: 1, value1: '', value2: '' },
              { type: 2, value1: '', value2: '' },
              { type: 1, value1: '', value2: '' }
            ]
        },
        artifact_3: {
            inputs: [
              { type: 1, value1: 'incognita', value2: 'solucion' },
              { type: 2, value1: 'operacion', value2: 'operacion inversa' },
              { type: 1, value1: 'formula', value2: 'numero' }
            ]
        },
        artifact_4: {
            inputs: [
              { type: 1, value1: 'x', value2: '3' },
              { type: 2, value1: '2*()', value2: '()/2' },
              { type: 1, value1: '2*x', value2: '6' }
            ]
        },
        artifact_5: {
            inputs: [
              { type: 1, value1: '4', value2: '4' },
              { type: 2, value1: '()+2', value2: '' },
              { type: 1, value1: '', value2: '' }
            ]
        }
    }
}