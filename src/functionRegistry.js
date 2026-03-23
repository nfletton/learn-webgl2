import {setCanvasColor} from "./setCanvasColor";
import {trianglePlane} from "./trianglePlane.js";
import {randomRectangles} from "./randomRectangles.js";

export const functionRegistry = {
    setCanvasColor: {
        fn: setCanvasColor,
        altText: "Set the background color of the canvas"
    },
    trianglePlane: {
        fn: trianglePlane,
        altText: "Render a colored triangle on the canvas"
    },
    randomRectangles: {
        fn: randomRectangles,
        altText: "Render 50 random rectangles"
    },
};
