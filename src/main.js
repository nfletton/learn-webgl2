import './style.css'
import {vec2} from "gl-matrix";
import {setCanvasColor} from "./setCanvasColor";

function initPage() {
  const app = document.querySelector('#app');
  app.innerHTML = `<canvas id="canvas"></canvas>`;
}

function initWebGL() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.error("WebGL2 not supported");
    return;
  }
  console.log(`WebGL2 initialized`);
  return gl
}

const functionRegistry = {
  setCanvasColor: setCanvasColor,
  example2: example2,
};

function example2(gl) {
  gl.clearColor(0.3, 0.1, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function executeFunc(gl) {
  const params = new URLSearchParams(window.location.search);
  const funcName = params.get('func') || 'home';

  if (typeof functionRegistry[funcName] === 'function') {
    console.log(`Function ${funcName} executed`)
    functionRegistry[funcName](gl);
  } else {
    console.warn(`Function ${funcName} not found.`);
  }
}

initPage();
const gl = initWebGL();
if (gl) executeFunc(gl)