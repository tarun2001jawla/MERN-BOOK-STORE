import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";

export default defineConfig({
  optimizeDeps: {
    
    esbuildOptions: {
      // Enable esbuild polyfill plugins
      plugins: [nodeModulesPolyfillPlugin()],
    
    },
    
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
});