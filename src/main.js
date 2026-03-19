import './style.css'
import {vec2} from "gl-matrix";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

function renderPage() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 'home';
  const app = document.querySelector('#app');

  // Change what is displayed in the div with id 'app'
  if (page === 'home') {
    app.innerHTML = `
      <div style="padding: 20px;">
        <h1>Home</h1>
        <p>Welcome to the WebGL2 learning project.</p>
        <canvas id="canvas"></canvas>
      </div>
    `;
    initWebGL();
  } else {
    app.innerHTML = `
      <div style="padding: 20px;">
        <h1>${page.charAt(0).toUpperCase() + page.slice(1)}</h1>
        <p>Content for ${page}.</p>
        <canvas id="canvas"></canvas>
      </div>
    `;
    initWebGL();
  }
}

function initWebGL() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.error("WebGL2 not supported");
    return;
  }

  const v1 = vec2.fromValues(4, 1);
  const v2 = vec2.fromValues(2, 2);
  const result = vec2.create();
  vec2.add(result, v1, v2);
  console.log(`WebGL2 initialized on ${window.location.search || '?page=home'}. Vector add result: ${result}`);
  
  // Set clear color to dark gray and clear
  gl.clearColor(0.1, 0.1, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// Handle navigation without full page reload if possible, 
// but since we used query params, standard links will reload.
// For "No javascript frameworks", this is a simple way to handle routing.
window.addEventListener('popstate', renderPage);
renderPage();