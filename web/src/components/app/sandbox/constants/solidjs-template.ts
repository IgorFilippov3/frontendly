export const SOLIDJS_TEMPLATE = {
  "/package.json": `{
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "solid-js": "^1.8.0"
    },
    "devDependencies": {
      "typescript": "^4.9.5",
      "vite": "4.1.4",
      "vite-plugin-solid": "^2.11.6",
      "esbuild-wasm": "0.17.12"
    }
  }`,
  "/vite.config.ts": `import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
});
  `,
  "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Solid App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
  `,
  "index.tsx": `import { render } from 'solid-js/web';
import './styles.css';
import App from './App';

const root = document.getElementById('root');

render(() => <App />, root!);
  `,
  "styles.css": `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} 
  `,
  "App.tsx": `import type { Component } from 'solid-js';

const App: Component = () => {
  return <div>🚀 SolidJS App</div>;
};

export default App;
  `,
  "tsconfig.json": `
    {
    "compilerOptions": {
      "target": "ESNext",
      "useDefineForClassFields": true,
      "lib": [
        "DOM",
        "DOM.Iterable",
        "ESNext"
      ],
      "allowJs": false,
      "skipLibCheck": true,
      "esModuleInterop": false,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx"
    },
    "include": [
      "src"
    ],
    "references": [
      {
        "path": "./tsconfig.node.json"
      }
    ]
  }
  `,
  "tsconfig.node.json": `
    {
    "compilerOptions": {
      "composite": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "allowSyntheticDefaultImports": true
    },
    "include": [
      "vite.config.ts"
    ]
  }
  `,
  "vite-env.d.ts": `/// <reference types="vite/client" />`,
};
