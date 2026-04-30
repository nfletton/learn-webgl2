
import { createShader, createProgram } from './common';

/*
* A simple triangle
* Source: https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html
*/

const vertexShaderSource =`#version 300 es

layout (location = 0) in vec3 aPos;
 
void main() {
  gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
}
`

const fragmentShaderSource =`#version 300 es
 
precision highp float;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);
}`


export function helloTriangle(gl) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // look up the location of the attribute for the program we just created
    const positionAttributeLocation = gl.getAttribLocation(program, "aPos");
    // Attributes get their data from buffers, so we need to create a buffer
    const positionBuffer = gl.createBuffer();
    // Bind a resource to a bind point. Then, all other functions refer to the resource through the bind point.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // put data in the buffer. This data is already in the clip space
    const vertices = [
        0, 0, 0,
        0, 0.5, 0,
        0.7, 0, 0,
        -.5, 0, 0,
        -.5, -0.5, 0,
        0.7, -0.5, 0,
    ];
    // Now we can put data in that buffer by referencing it through the bind point
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // create a collection of attribute state called a Vertex Array Object.
    const vao = gl.createVertexArray();
    // make that the current vertex array so that all of our attribute settings will apply to that set of attribute state
    gl.bindVertexArray(vao);
    //Now we finally setup the attributes in the vertex array. First off we need to turn the attribute on.
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 3;          // 2 components per iteration
    const type = gl.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    // A hidden part of gl.vertexAttribPointer is that it binds the current ARRAY_BUFFER to
    // the attribute. In other words now this attribute is bound to positionBuffer.
    // That means we’re free to bind something else to the ARRAY_BUFFER bind point.
    // The attribute will continue to use positionBuffer.
    gl.useProgram(program);
    gl.bindVertexArray(vao);

    drawScene()

    function drawScene() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // This tells WebGL the -1 +1 clip space maps to 0 <-> gl.canvas.width for x and 0 <-> gl.canvas.height for y.
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 6
        gl.drawArrays(primitiveType, offset, count);    }

    return drawScene
}

