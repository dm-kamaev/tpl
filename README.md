# Tpl
Module for convenient templating html and other text content in runtime without special bundlers (as Webpack and etc) or special template engine (as Pug and etc), only javascript.
This module allows use conditions operations `if/else if/else` and `switch/case/default`. The module to allows you to collect html code in functional style with methods: `forEach`, `each` (forEach for object).

### Install
```sh
npm i @ignis-web/tpl -S
```

### if/else_if/else
```js
const tpl = require('@ignis-web/tpl');

const score = 12;
const html = `
  <div>
    ${tpl
      .if(score < 0, () => `<span>Negative: ${score}</span>`)
      .else_if(score > 0 && score < 100, () => `<span>From 0 to 100: ${score}</span>`)
      .else(() => `<span>Default: ${score}</span>`)
    }
  </div>
  `;
console.log(html); // => <div><span>From 0 to 100: 12</span></div>
```

You can use only `if` or `if/else` in general as in the usual javascript code.
Example `if`:
```js
let score = -10;
let html = `
  <div>
    ${tpl.if(score < 0, () => `<span>Negative: ${score}</span>`)}
  </div>
  `;
console.log(html); // => <div><span>Negative: -10</span></div>
```

Example `if/else if`:
```js
let score = 15;
let html = `
  <div>
    ${
      tpl
      .if(score < 0, () => `<span>Negative: ${score}</span>`)
      .else_if(score > 0 && score < 100, () => `<span>From 0 to 100: ${score}</span>`)
    }
  </div>
  `;
console.log(html); // => <div><span>From 0 to 100: 15</span></div>
```

Example `if/else`:
```js

let score = 100;
let html = `
  <div>
    ${tpl
      .if(score < 0, () => `<span>Negative: ${score}</span>`)
      .else(() => `<span>Default: ${score}</span>`)
    }
  </div>
  `;
console.log(html); // =>  <div><span>Default: 100</span></div>
```

### Note:
You can pass string as second argument instead function, if you want use static content:
```js
const score = 12;
const html = `
  <div>
    ${tpl
      .if(score < 0, `<span>Negative: ${score}</span>`)
      .else_if(score > 0 && score < 100, `<span>From 0 to 100: ${score}</span>`)
      .else(`<span>Default: ${score}</span>`)
    }
  </div>
  `;
console.log(html); // => <div><span>From 0 to 100: 12</span></div>
```


### switch/case/default
```js
const score = 12;
const html = `
  <div>
    ${tpl
      .switch(score)
        .case(12, () => `<span>Total: ${score*2} === 24</span>`)
        .case(100, () => `<span>Total: ${score*2} === 200 </span>`)
        .default(() => `<span>Default: ${score}</span>`)
    }
  </div>
  `;
console.log(html); // => <div><span>Total 24</span></div>
```

You can pass string as second argument instead function, if you want use static content:
```js
const score = 100;
const html = `
  <div>
    ${tpl
      .switch(score)
        .case(12, `<span>Total: ${score} === 24</span>`)
        .case(100, `<span>Total: ${score} === 100 </span>`)
        .default(`<span>Default: ${score}</span>`)
    }
  </div>
  `;
console.log(html); // => <div><span>Total: 100</span></div>
```

### forEach
For rendering array:
```js
const scores = [12, 100, 24];
const html = `
  <div>
    ${tpl.forEach(scores, (el, i) => `<p>index = ${i}, value = ${el}</p>`)}
  </div>
`;
console.log(html); // =>
/*
<div>
  <p>index = 0, value = 12</p>
  <p>index = 1, value = 100</p>
  <p>index = 2, value = 24</p>
</div>
*/
```

### each
For rendering object:
```js
const scores = { 'Player 1': 12, 'Player 2': 100, 'Player 3': 24 };
const html = `
  <div>
    ${tpl.each(scores, (name, score) => `<p>name = ${name}, scores = ${score}</p>`)}
  </div>
`;
console.log(html); // =>
/*
<div>
  <p>name = Player 1, scores = 12</p>
  <p>name = Player 2, scores = 100</p>
  <p>name = Player 3, scores = 24</p>
</div>
*/
```



