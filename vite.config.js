import { defineConfig } from "vite";

// Konfigurasi untuk GitHub Pages
// Untuk aqilnxt.github.io (user/organization page), base harus '/'
export default defineConfig({
  // Base public path untuk GitHub Pages user/organization page
  base: "/",

  // Direktori build output
  build: {
    outDir: "dist",
    assetsDir: "assets",

    // Optimasi build
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Set true jika ingin menghapus console.log di production
        drop_debugger: true,
      },
    },

    // Source maps untuk debugging (nonaktifkan di production untuk keamanan)
    sourcemap: false,

    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,

    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunk splitting untuk optimasi
        manualChunks: {
          vendor: ["aos", "typed.js"],
        },
        // Naming pattern untuk assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },

  // Server configuration untuk development
  server: {
    port: 3000,
    open: true, // Otomatis buka browser saat dev server start
    strictPort: false, // Jika port sudah digunakan, coba port lain
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Path resolution
  resolve: {
    alias: {
      "@": "/src", // Alias untuk import dari src directory
    },
  },

  // Public directory (files di sini akan di-copy langsung ke root dist)
  publicDir: "public",

  // Optimasi dependencies
  optimizeDeps: {
    include: ["aos", "typed.js"],
  },
});
