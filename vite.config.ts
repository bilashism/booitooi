/* eslint-disable import/no-extraneous-dependencies */
// for localhost url
import dns from 'dns';

import { defineConfig } from 'vite';
// for https certificate
import mkcert from 'vite-plugin-mkcert';

import react from '@vitejs/plugin-react';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), react()],
  server: {
    https: true,
    host: true,
    port: 3000,
  },
});
