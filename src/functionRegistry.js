import {setCanvasColor} from "./setCanvasColor";
import {trianglePlane} from "./trianglePlane.js";

export const functionRegistry = {
    setCanvasColor: {
        fn: setCanvasColor,
        altText: "Set the background color of the canvas"
    },
    trianglePlane: {
        fn: trianglePlane,
        altText: "Render a colored triangle on the canvas"
    },
};
