import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <canvas id="canvas"></canvas>
`

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');
