import {createShader, createProgram} from './common';

/*
* Demonstrates how to copy a texture or renderbuffer (see hard coded if condition)
* to the default canvas framebuffer.
* The initial purpose was to demonstrate color space conversion from linear to
* sRGB in the default framebuffer but this does not appear to work.
*/


const vertexShaderSource =`#version 300 es

layout (location = 0) in vec3 aPos;
uniform vec3 u_color;
out vec4 fragColor;
 
void main() {
  gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
  fragColor = vec4(u_color, 1.0);
}
`

const fragmentShaderSource =`#version 300 es
 
precision highp float;
 
out vec4 outColor;
in vec4 fragColor;
 
void main() {
  outColor = fragColor;
}`

function sRGBToLinear(color) {
    return color.map(c => c < 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
}

const mySrgbColor = [1.00, 0.753, 0.796];

export function blittingToCanvas(gl) {
    gl.unpackColorSpace = "srgb";
    gl.drawingBufferColorSpace = 'srgb';
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionAttributeLocation = gl.getAttribLocation(program, "aPos");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = [
        0.5, 0.5, 0,
        0.5, 0, 0,
        -0.5, 0.5, 0,
        -.5, 0.25, 0,
        -.5, -0.25, 0,
        0.5, -0.25, 0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.uniform3fv(gl.getUniformLocation(program, "u_color"), sRGBToLinear(mySrgbColor));

    drawScene()

    function drawScene() {
        console.log(gl.canvas.width, gl.canvas.height);

        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        let attachment
        if (true) { // Use a texture with the hardware sRGB format
            attachment = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, attachment);
            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.SRGB8_ALPHA8, gl.canvas.width, gl.canvas.height);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
                attachment,
                0
            );
        } else {
            // Use renderbuffer with the hardware sRGB format
            attachment = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, attachment);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.SRGB8_ALPHA8, gl.canvas.width, gl.canvas.height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, attachment);
        }

        console.log(gl.canvas.width, gl.canvas.height);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(1.00, 0.753, 0.796, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const primitiveType = gl.TRIANGLES;
        const count = 6
        gl.drawArrays(primitiveType, offset, count);

         // Blit the results to the default canvas framebuffer
         gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fb);
         gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);

        gl.blitFramebuffer(
            0, 0, gl.canvas.width, gl.canvas.height,
            0, 0, gl.canvas.width, gl.canvas.height,
            gl.COLOR_BUFFER_BIT,
            gl.NEAREST
        );
    }

    return drawScene;
}

