import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// for https certificate
import mkcert from "vite-plugin-mkcert";
// for localhost url
import dns from "dns";
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), react()],
  server: {
    https: true,
    host: true,
    port: 3000
  }
});
