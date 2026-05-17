import {setCanvasColor} from "./setCanvasColor";
import {helloTriangle} from "./helloTriangle.js";
import {randomRectangles} from "./randomRectangles.js";
import {antiAliasing} from "./antiAliasing.js";
import {colorSpaceConversion} from "./colorSpaceConversion.js";

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
    antiAliasing: {
        fn: antiAliasing,
        altText: "Multisampling anti-aliasing",
        contextOptions: {antialias: false}
    },
    colorSpaceConversion: {
        fn: colorSpaceConversion,
        altText: "FAILED attempt at offscreen canvas color space conversion",
        contextOptions: {antialias: false}
    },
};
