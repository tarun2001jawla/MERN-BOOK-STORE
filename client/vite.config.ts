
import { defineConfig } from 'vite';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  // ... other config options
  build: {
    rollupOptions: {
      plugins: [
        // @ts-expect-error sdd
        nodePolyfills({
          crypto: true,
          process: true, 
        }),
      ],
    },
  },
});