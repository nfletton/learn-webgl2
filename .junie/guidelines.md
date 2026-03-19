# Development Guidelines

This document provides project-specific details to aid development and maintenance.

## 1. Build and Configuration Instructions

This project is a WebGL2 application powered by **Vite** and **gl-matrix**.

### Prerequisites
- Node.js (version >= 18.x recommended)
- npm (version >= 9.x recommended)

### Setup and Development
- **Install dependencies:**  
  ```bash
  npm install
  ```
- **Start development server:**  
  ```bash
  npm run dev
  ```
  Vite will provide a local URL (e.g., `http://localhost:5173`) where the application can be accessed.
- **Build for production:**  
  ```bash
  npm run build
  ```
  The production-ready assets will be generated in the `dist` directory.
- **Preview production build:**  
  ```bash
  npm run preview
  ```

## 2. Testing Information

This project uses **Vitest** for unit testing, which provides a fast and Vite-compatible testing experience.

### Running Tests
- **Execute all tests once:**  
  ```bash
  npm test
  ```
- **Run tests in watch mode (recommended for development):**  
  ```bash
  npx vitest
  ```

### Adding New Tests
Tests should be placed in the `src/` directory with the `.test.js` or `.spec.js` suffix.

### Example Test Case
To verify mathematical operations using `gl-matrix`, create a file like `src/math.test.js`:

```javascript
import { vec2 } from 'gl-matrix';
import { assert, test } from 'vitest';

test('vec2 addition', () => {
  const v1 = vec2.fromValues(4, 1);
  const v2 = vec2.fromValues(2, 2);
  const result = vec2.create();
  vec2.add(result, v1, v2);
  
  // Verify result is [6, 3]
  assert.deepEqual(result, Float32Array.from([6, 3]));
});
```

## 3. Additional Development Information

### WebGL2 Context
The application uses a simple routing system in `src/main.js` that updates the `#app` container based on URL parameters. The layout consists of a scrollable left sidebar for navigation and a main content area on the right.

To update the content, modify the `renderPage` function in `src/main.js`. Ensure that any new page content includes a `<canvas id="canvas"></canvas>` if WebGL rendering is required for that page.

### Code Style and Conventions
- **Matrix/Vector Math:** Use `gl-matrix` functions for all transformations. Avoid manual matrix manipulations when possible.
- **Performance:** For hot loops in rendering, prefer pre-allocating vectors (e.g., `vec2.create()`) outside the loop to minimize garbage collection.
- **Asset Imports:** Use Vite's ESM import syntax for assets (images, CSS, shaders).
- **ES Modules:** The project is configured as `"type": "module"`. Use `import/export` syntax consistently.
- **Layout:** The layout is managed via CSS Flexbox. The sidebar is scrollable (`overflow-y: auto`), and the main `#app` area is fixed (`overflow: hidden`).
- **Theme:** The application uses a dark theme by default, configured in `src/style.css`.
- **Navigation:** Navigation is handled by standard `<a>` tags with query parameters (e.g., `?page=name`). The `renderPage` function listens for `popstate` and initializes on load to update the view.
