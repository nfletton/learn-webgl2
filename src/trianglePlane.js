
import { createShader, createProgram } from './common';

/*
* A simple triangle
* Source: https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html
*/

const vertexShaderSource =`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`

const fragmentShaderSource =`#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = vec4(1, 0, 0.5, 1);
}`


export function trianglePlane(gl) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // look up the location of the attribute for the program we just created
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    // Attributes get their data from buffers, so we need to create a buffer
    const positionBuffer = gl.createBuffer();
    // Bind a resource to a bind point. Then, all other functions refer to the resource through the bind point.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // put data in the buffer. This data is already in the clip space
    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0,
        -.5, 0,
        -.5, -0.5,
        0.7, -0.5,
    ];
    // Now we can put data in that buffer by referencing it through the bind point
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // create a collection of attribute state called a Vertex Array Object.
    const vao = gl.createVertexArray();
    // make that the current vertex array so that all of our attribute settings will apply to that set of attribute state
    gl.bindVertexArray(vao);
    //Now we finally setup the attributes in the vertex array. First off we need to turn the attribute on.
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;          // 2 components per iteration
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

