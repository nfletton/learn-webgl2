import {createShader, createProgram} from './common';

/*
* Fifty random rectangles
* Source: https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html
*/

const vertexShaderSource = `#version 300 es
in vec2 a_position;

uniform vec2 u_resolution;
 
void main() {
  vec2 clipSpace = (a_position * 2.0 / u_resolution - 1.0) * vec2(1, -1);
  gl_Position = vec4(clipSpace, 0, 1);
}
`

const fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec4 u_color;
out vec4 outColor;
 
void main() {
  outColor = u_color;
}`

function drawRectangle(gl, colorUniformLoc, canvasWidth, canvasHeight ) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const width = Math.random() * canvasWidth * 0.25;
    const height = Math.random() * canvasHeight * 0.25;

    const positions = new Float32Array([
        x, y,
        x + width, y,
        x, y + height,
        x + width, y,
        x + width, y + height,
        x, y + height,
    ])

    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 6
    gl.drawArrays(primitiveType, offset, count);

    gl.uniform4f(colorUniformLoc, Math.random(), Math.random(), Math.random(), 1);
}

export function randomRectangles(gl) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;          // 2 components per iteration
    const type = gl.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    gl.useProgram(program);
    gl.bindVertexArray(vao);


    drawScene()

    function drawScene() {
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), gl.canvas.width, gl.canvas.height);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // This tells WebGL the -1 +1 clip space maps to 0 <-> gl.canvas.width for x and 0 <-> gl.canvas.height for y.
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const colorUniformLoc = gl.getUniformLocation(program, "u_color");
        for (let i = 0; i < 50; i++)
            drawRectangle(gl, colorUniformLoc, gl.canvas.width, gl.canvas.height);
    }

    return drawScene
}

