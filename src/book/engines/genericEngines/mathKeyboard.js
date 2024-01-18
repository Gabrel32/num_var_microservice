function getKeyboardMath(screenWidth, keyMod) {
   let MG_KEYBOARD_LAYER;
   let MG_KEYBOARD = {};
   let virtualKeyboards = "";
   MG_KEYBOARD_LAYER = {

      styles: "margin: 0 auto;",
      operadores: {
         styles: "",
         rows: [
            [], [
               {
                  class: "small",
                  latex: "g\\left(\\right)",
                  insert: "g\\left(\\right)",
               },
               { class: "small", latex: "g^{-1}\\left(\\right)" },
               { class: "small", latex: "f^{-1}\\left(\\right)" },
               {
                  class: "small",
                  latex: "f\\left(\\right)",
                  insert: "f\\left(\\right)",
               },
               { label: "+", key: "+" },
               { label: "-", key: "-" },
               { label: "*", key: "*" },
               { latex: "#@^{#?}" },

            ],
            [

               {
                  class: "small",
                  latex: "\\placeholder{}^{1}",
               },
               {
                  class: "small",
                  latex: "\\placeholder{}^{-1}",
               },
               { latex: "(" },
               { latex: ")" },
               { class: 'small', latex: '\\frac{#@}{#0}', key: "/" },
               {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                  command: ["performWithFeedback", "moveToPreviousChar"],
               }, {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                  command: ["performWithFeedback", "moveToNextChar"],
               }, {
                  class: "action font-glyph bottom right",
                  label: "&#x232b;",
                  command: ["performWithFeedback", "deleteBackward"]
               },
            ],
            /////////////////

         ],
      },
      numeros: {
         styles: "",
         rows: [
            []
            , [
               { label: "1", key: "1" },
               { label: "2", key: "2" },
               { label: "3", key: "3" },
               { label: "4", key: "4" },
               { label: "5", key: "5" },
               { label: "6", key: "6" },

               {
                  class: "action font-glyph bottom right",
                  label: "&#x232b;",
                  command: ["performWithFeedback", "deleteBackward"]
               }
            ], [
               { label: "7", key: "7" },
               { label: "8", key: "8" },
               { label: "9", key: "9" },
               { label: ".", key: "." },
               { label: ",", key: "," },
               { label: "0", key: "0" },

               {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                  command: ["performWithFeedback", "moveToPreviousChar"],
               }, {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                  command: ["performWithFeedback", "moveToNextChar"],
               },
            ],
         ],
      },
      variables: {
         styles: "",
         rows: [
            [

            ], [
               { label: "a", key: "a" },
               { label: "b", key: "b" },
               { label: "c", key: "c" },
               { latex: "d", key: "d" },
               { latex: "e", key: "e" },
               { latex: "f", key: "f" },
               { latex: "g", key: "g" },
               { latex: "h", key: "h" },
               { latex: "i", key: "i" },

            ], [

               { latex: "j", key: "j" },
               { latex: "k", key: "k" },
               { latex: "t", key: "t" },
               { label: "x", key: "x" },
               { label: "y", key: "y" },
               { label: "z", key: "z" },


               {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                  command: ["performWithFeedback", "moveToPreviousChar"],
               }, {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                  command: ["performWithFeedback", "moveToNextChar"],
               }, {
                  class: "action font-glyph bottom right",
                  label: "&#x232b;",
                  command: ["performWithFeedback", "deleteBackward"]
               }
            ],
         ],
      },
      simbolos: {
         styles: "",
         rows: [
            [

            ], [
               { latex: "e", key: "e" },
               { label: "∄", insert: "\\nexists" },
               { latex: "\\pi" },

               { latex: "\\empty" },
               { latex: "\\infty" },

               { label: "≠", insert: "≠" },

            ],
            [
               { latex: "<" },
               { latex: ">" },
               { latex: '\\leq' },

               { latex: "\\geq" },
               {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                  command: ["performWithFeedback", "moveToPreviousChar"],
               }, {
                  class: "action",
                  label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                  command: ["performWithFeedback", "moveToNextChar"],
               }, {
                  class: "action font-glyph bottom right",
                  label: "&#x232b;",
                  command: ["performWithFeedback", "deleteBackward"]
               }
            ],


         ],
      },
   },
      MG_KEYBOARD = {
         operadores: {
            label: "Operadores",

            layer: "operadores",
         },
         numeros: {
            label: "Números",

            layer: "numeros",
         },
         variables: {
            label: "Variables",

            layer: "variables",
         },
         simbolos: {
            label: "Simbolos",

            layer: "simbolos",
         }
      },
      virtualKeyboards = 'operadores numeros variables simbolos';
   return [
      keyMod?.MG_KEYBOARD_LAYER || MG_KEYBOARD_LAYER,
      keyMod?.MG_KEYBOARD || MG_KEYBOARD,
      keyMod?.virtualKeyboards || virtualKeyboards
   ];
};