export function setCanvasColor(gl) {
    function drawScene() {
        gl.clearColor(0.3, 0.1, 0.9, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    drawScene()

    return drawScene
}