import {setCanvasColor} from "./setCanvasColor";
import {helloTriangle} from "./helloTriangle.js";
import {randomRectangles} from "./randomRectangles.js";
import {blittingToCanvas} from "./blittingToCanvas.js";

export const functionRegistry = {
    setCanvasColor: {
        fn: setCanvasColor,
        altText: "Set the background color of the canvas"
    },
    helloTriangle: {
        fn: helloTriangle,
        altText: "Render a colored triangle on the canvas"
    },
    randomRectangles: {
        fn: randomRectangles,
        altText: "Render 50 random rectangles"
    },
    sRgbRendering: {
        fn: blittingToCanvas,
        altText: "Blitting offscreen framebuffer to default canvas framebuffer",
        contextOptions: {antialias: false}
    },
};
