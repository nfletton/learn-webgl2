import './style.css'
import {functionRegistry} from "./functionRegistry.js";

(function init() {
        function onResize(entries) {
            for (const entry of entries) {
                let width;
                let height;
                let dpr = window.devicePixelRatio;
                if (entry.devicePixelContentBoxSize) {
                    // NOTE: Only this path gives the correct answer
                    // The other paths are imperfect fallbacks
                    // for browsers that don't provide anyway to do this
                    width = entry.devicePixelContentBoxSize[0].inlineSize;
                    height = entry.devicePixelContentBoxSize[0].blockSize;
                    dpr = 1; // it's already in width and height
                } else if (entry.contentBoxSize) {
                    if (entry.contentBoxSize[0]) {
                        width = entry.contentBoxSize[0].inlineSize;
                        height = entry.contentBoxSize[0].blockSize;
                    } else {
                        width = entry.contentBoxSize.inlineSize;
                        height = entry.contentBoxSize.blockSize;
                    }
                } else {
                    width = entry.contentRect.width;
                    height = entry.contentRect.height;
                }
                canvas.width = Math.round(width * dpr);
                canvas.height = Math.round(height * dpr);
                if (typeof drawScene === 'function') {
                    requestAnimationFrame(drawScene);
                }
            }
        }

        function initResizeHandling() {
            const canvas = document.getElementById('canvas')
            const resizeObserver = new ResizeObserver(onResize);
            try {
                // only call us of the number of device pixels changed
                resizeObserver.observe(canvas, {box: 'device-pixel-content-box'});
            } catch (ex) {
                // device-pixel-content-box is not supported so fallback to this
                resizeObserver.observe(canvas, {box: 'content-box'});
            }
            return canvas
        }

        function getSketchData() {
            const params = new URLSearchParams(window.location.search);
            const funcName = params.get('func') || 'setCanvasColor';

            const registryEntry = functionRegistry[funcName];
            if (registryEntry) {
                return registryEntry;
            } else {
                console.error(`Function ${funcName} not found. Available: ${Object.keys(functionRegistry).join(', ')}`);
                return null;
            }
        }

        function executeSketch(gl, sketchData) {
            if (typeof sketchData.fn === 'function') {
                console.log(`Function ${sketchData.fn.name} executed`);
                return sketchData.fn(gl);
            }
            return null;
        }

        function populateNav() {
            const navUl = document.querySelector('#nav-sidebar ul');
            if (!navUl) return;

            navUl.innerHTML = '';
            Object.keys(functionRegistry).forEach(funcName => {
                const entry = functionRegistry[funcName];
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `?func=${funcName}`;
                a.textContent = funcName;
                if (entry.altText) {
                    a.title = entry.altText;
                }
                li.appendChild(a);
                navUl.appendChild(li);
            });
        }

        populateNav();
        const canvas = initResizeHandling();
        let drawScene;

        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }

        const sketchData = getSketchData();
        if (!sketchData) return;

        let defaultOptions = {
            stencil: true,
            preserveDrawingBuffer: true,
        };
        const gl = canvas.getContext(
            'webgl2',
            {...defaultOptions, ...sketchData.contextOptions}
        );
        if (gl) {
            console.log("WebGL2 initialized");
            if (!gl.getExtension("EXT_color_buffer_float")) {
                console.warn("EXT_color_buffer_float extension not supported");
            }

            canvas.dispatchEvent(new Event('resize'))
            drawScene = executeSketch(gl, sketchData);
        } else {
            console.warn("WebGL2 not supported");
        }
    }
)();
