import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs'],
  target: 'es2022',
  platform: 'node',
  clean: true,
  dts: true,
  minify: false,
  treeshake: true,
  splitting: true,
  sourcemap: true,
});
