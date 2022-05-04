<div align="center">
  <a href="https://www.npmjs.com/package/virtual-keyboard-offset">
    <img alt="npm" src="https://badgen.net/npm/v/virtual-keyboard-offset?color=2c139f" />
  </a>
  <a href="https://www.npmjs.com/package/virtual-keyboard-offset">
    <img alt="" src="https://badgen.net/npm/dt/virtual-keyboard-offset?color=2c139f" />
  </a>
  <a href="https://bundlephobia.com/result?p=virtual-keyboard-offsetr">
    <img alt="" src="https://badgen.net/bundlephobia/min/virtual-keyboard-offsetr?color=2c139f" />
  </a>
</div>

# virtual-keyboard-offset

#### A react hook to help manage mobile browser virtual keyboards

When the keyboard is open, the hook returns the remaining viewport size and the amount the page is offset.

We have all toiled our days away on gorgeous mobile web designs just to have them accordioned by unpredictable virtual keyboards. With no reliable API to determine virtual keyboard specs or even wether or not it is open, creating responsive mobile browser designs has been unnecessarily difficult. 

This project aims to create a simple, lightweight React hook that determines when the virtual keyboard is open, how much it has offset our pages components and the size of the remaining viewport.

## Install
```
npm install virtual-keyboard-offset
```

```
yarn add virtual-keyboard-offset
```

## Example 
```js
import React from 'react';
import { useKeyboardOffset } from 'virtual-keyboard-offset';

function MyScreen() {
  const { keyBoardOffset, windowHeight } = useKeyboardOffset();
  console.log(keyBoardOffset, windowHeight);

}
```
