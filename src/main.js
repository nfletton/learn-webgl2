import './style.css'
import {vec2} from "gl-matrix";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <canvas id="canvas"></canvas>
`

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');

var v1 = vec2.fromValues(4, 1);
var v2 = vec2.fromValues(2, 2);
var result = vec2.create()
vec2.add(result, v1, v2);
console.log(result.toString())