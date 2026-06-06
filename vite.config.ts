/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// App is served from a subfolder on S3+CloudFront, so every asset path must be
// relative. Keep base './' — do not change to an absolute path.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'node',
  },
});
