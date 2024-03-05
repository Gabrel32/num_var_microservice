
const def = {
    // parent: "main",
    artifacts: {
        artifact_1:{
            head:[
                "expresiones","menos expresiones","numero"
            ],
            body:[
                ["(2 + 5) . 8","7.8",56],
                ["2 + 5 . 8",{tag:"select", row:"2", column:"2",text:"",default:[{valor: 'selecciona'},{ valor: "7.8"},{ valor: '7.3' },{ valor: '8'}]},{tag:"input", row:"3", column:"2",text:""}],
                ["8 + 5 - 2",{tag:"select", row:"2", column:"3",text:"",default:[{valor: 'selecciona'},{ valor: "7+4"},{ valor: '7.4' },{ valor: '7+5'}]},{tag:"input", row:"3", column:"3",text:""}],
                ["5 + 8 / 2",{tag:"select", row:"2", column:"4",text:"",default:[{valor: 'selecciona'},{ valor: "13/2"},{ valor: '13/3' },{ valor: '13+2'}]},{tag:"input", row:"3", column:"4",text:""}],
            ],
            conditions:[
                [{column:"2", row:"2", response:["7.8"]},{column:"2",row:"3",response:["42"]}],
                [{column:"3", row:"2", response:["7+4"]},{column:"3",row:"3",response:["11"]}],
                [{column:"4", row:"2", response:["13/2"]},{column:"4",row:"3",response:["6,5"]}]
            ],
            engine: engineTable,
        },
        artifact_2:{
            body:[
                ["100 = z",{tag:"select", row:"2", column:"1",text:"102 =",default:[{valor: 'selecciona'},{ valor: "Z+2"},{ valor: 'AAA' },{ valor: 'A'}]}],
                ["1 = z",{tag:"select", row:"2", column:"2",text:"3 =",default:[{valor: 'selecciona'},{ valor: "ZZZ"},{ valor: 'ZZ' },{ valor: 'Z'}]}],
                ["100 = z",{tag:"select", row:"2", column:"3",text:"10000 =",default:[{valor: 'selecciona'},{ valor: "Z.10"},{ valor: 'Z/10' },{ valor: 'Z+10'}]}],
            ],
            conditions:[
                [{column:"1", row:"2", response:["z+2"]}],
                [{column:"2", row:"2", response:["zzz"]}],
                [{column:"3", row:"2", response:["z.10"]}]
            ],
            engine: engineTable,
            
        },
        artifact_3:{
            body:[
                ["6 = a",{tag:"select", row:"2", column:"1",text:"12 =",default:[{valor: 'selecciona'},{ valor: "AA"},{ valor: 'AAA' },{ valor: 'A'}]}],
                ["10 = a",{tag:"select", row:"2", column:"2",text:"99 =",default:[{valor: 'selecciona'},{ valor: "A.9+9"},{ valor: 'A.9-9' },{ valor: 'A/9+9'}]}],
                ["10 = a",{tag:"select", row:"2", column:"3",text:"30 =",default:[{valor: 'selecciona'},{ valor: "AAA"},{ valor: 'AA . 1' },{ valor: 'AAAA'}]}],
            ],
            conditions:[
                [{column:"1", row:"2", response:["aa"]}],
                [{column:"2", row:"2", response:["a.9+9"]}],
                [{column:"3", row:"2", response:["aaa"]}]
            ],
            engine: engineTable,


            
        },
        artifact_4:{
            head:[
                "expresiones","menos expresiones","numero"
            ],
            body:[
                ["8 . 5 / 2",{tag:"select", row:"2", column:"1",text:"",default:[{valor: 'selecciona'},{ valor: '20+20'},{ valor: '12+12' },{ valor: '8+8'}]},{tag:"input", row:"3", column:"1",text:""}],
                ["2 + 5 . 8",{tag:"select", row:"2", column:"2",text:"",default:[{valor: 'selecciona'},{ valor: '21+21'},{ valor: '18+18' },{ valor: '22+22'}]},{tag:"input", row:"3", column:"2",text:""}],
                ["8 + 5 - 2",{tag:"select", row:"2", column:"3",text:"",default:[{valor: 'selecciona'},{ valor: '5,5+5,5'},{ valor: '6+6' },{ valor: '5,8+5,8'}]},{tag:"input", row:"3", column:"3",text:""}],
                ["5 + 8 / 2",{tag:"select", row:"2", column:"4",text:"",default:[{valor: 'selecciona'},{ valor: "13/2"},{ valor: '11/2' },{ valor: '11/3'}]},{tag:"input", row:"3", column:"4",text:""}],
    
                
            ],
            conditions:[
                [{column:"1", row:"2", response:["20+20"]},{column:"1",row:"3",response:["40"]}],
                [{column:"2", row:"2", response:["21+21"]},{column:"2",row:"3",response:["42"]}],
                [{column:"3", row:"2", response:["5,5+5,5"]},{column:"3",row:"3",response:["11"]}],
                [{column:"4", row:"2", response:["13/2"]},{column:"4",row:"3",response:["13"]}]
    
            ],
            engine: engineTable,

            
            
        },
        artifact_5:{
            body:[
                ["A < B ¿Quien es el menor?",`A`],
                ["A < B ¿Quien es el mayor?",{tag:"select", row:"2", column:"2",text:"",default:[{valor: 'selecciona'},{valor: 'A'},{valor: 'B' }]}],
    
            ],
            conditions:[
                [{column:"2", row:"2", response:["b"]}],
            ],
            engine: engineTable,
        },
        artifact_6:{
            body:[
                ["A < B ¿Quien es el mayor?",{tag:"select", row:"2", column:"1",text:"",default:[{valor: 'selecciona'},{valor: 'A'},{valor: 'B' },{valor: 'C'}]}],
                ["A < B ¿Quien es el mayor?",{tag:"select", row:"2", column:"2",text:"",default:[{valor: 'selecciona'},{valor: 'A' },{valor: 'B' },{valor: 'C' }]}],
                ["A < B ¿Quien es el mayor?",{tag:"select", row:"2", column:"3",text:"",default:[{valor: 'selecciona'},{valor: 'A' },{valor: 'B' },{valor: 'C' }]}],
    
            ],
            conditions:[
                [{column:"1", row:"2", response:["a"]}],
                [{column:"2", row:"2", response:["b"]}],
                [{column:"3", row:"2", response:["b"]}],
            ],
            engine: engineTable,
            
        },
    }

}
const def2 = {
    parent: "main_2",
    artifacts: {
        artifact_1:{
            head:[
                "expresiones","menos expresiones","numero"
            ],
            body:[
                ["(2 + 5) . 8","7.8",56],
                ["2 + 5 . 8",{tag:"select", row:"2", column:"2",text:"",default:[{valor: 'selecciona'},{ valor: "7.8"},{ valor: '7.3' },{ valor: '8'}]},{tag:"input", row:"3", column:"2",text:""}],
                ["8 + 5 - 2",{tag:"select", row:"2", column:"3",text:"",default:[{valor: 'selecciona'},{ valor: "7+4"},{ valor: '7.4' },{ valor: '7+5'}]},{tag:"input", row:"3", column:"3",text:""}],
                ["5 + 8 / 2",{tag:"select", row:"2", column:"4",text:"",default:[{valor: 'selecciona'},{ valor: "13/2"},{ valor: '13/3' },{ valor: '13+2'}]},{tag:"input", row:"3", column:"4",text:""}],
            ],
            conditions:[
                [{column:"2", row:"2", response:["7.8"]},{column:"2",row:"3",response:["42"]}],
                [{column:"3", row:"2", response:["7+4"]},{column:"3",row:"3",response:["11"]}],
                [{column:"4", row:"2", response:["13/2"]},{column:"4",row:"3",response:["6,5"]}]
            ],
            engine: engineTable,
        },
        artifact_2:{
            body:[
                ["100 = z",{tag:"select", row:"2", column:"1",text:"102 =",default:[{valor: 'selecciona'},{ valor: "Z+2"},{ valor: 'AAA' },{ valor: 'A'}]}],
                ["1 = z",{tag:"select", row:"2", column:"2",text:"3 =",default:[{valor: 'selecciona'},{ valor: "ZZZ"},{ valor: 'ZZ' },{ valor: 'Z'}]}],
                ["100 = z",{tag:"select", row:"2", column:"3",text:"10000 =",default:[{valor: 'selecciona'},{ valor: "Z.10"},{ valor: 'Z/10' },{ valor: 'Z+10'}]}],
            ],
            conditions:[
                [{column:"1", row:"2", response:["z+2"]}],
                [{column:"2", row:"2", response:["zzz"]}],
                [{column:"3", row:"2", response:["z.10"]}]
            ],
            engine: engineTable,
            
        },
        artifact_3:{
            body:[
                ["3 < 5",`correcto`],
                ["3 > 5",{tag:"select", row:"2", column:"1",text:"",default:[{ posicion: 1, valor: 'selecciona'},{ posicion: 2, valor: 'correcto'},{ posicion: 3, valor: 'incorrecto' }]}],
                ["5 < 3",{tag:"select", row:"2", column:"2",text:"",default:[{ posicion: 1, valor: 'selecciona'},{ posicion: 2, valor: 'correcto' },{ posicion:3, valor: 'incorrecto'}]}],
               ,
            ],
            conditions:[
                [{column:"1", row:"2", response:["incorrecto"]}],
                [{column:"2", row:"2", response:["incorrecto"]}],
                [{column:"3", row:"2", response:["incorrecto"]}],
            ],
            engine: engineTable,
            
        },
    }}


const contentMain = new CreateView(def);
contentMain.initVIew(def2)
