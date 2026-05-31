import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// LIB_BUILD controls what gets built:
//   'js'  -> the JS/.d.ts library bundle (npm run build:js)
//   'css' -> the standalone prebuilt stylesheet (npm run build:css)
//   unset -> the local demo app (npm run dev / npm run build)
const libBuild = process.env.LIB_BUILD

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(libBuild === 'js'
      ? [
          dts({
            // Only the library source — never the docs app — ships type defs.
            include: ['src'],
            tsconfigPath: './tsconfig.app.json',
            // Root the declarations at src/ so the entry emits as dist/index.d.ts.
            entryRoot: 'src',
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ...(libBuild === 'js'
    ? {
        build: {
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
          },
          rollupOptions: {
            // Externalize every third-party package: the library ships only its
            // own component code, and consumers resolve deps from node_modules.
            // This keeps the bundle small and avoids duplicate React/context.
            // Anything starting with "." or "@/" is internal and gets bundled.
            external: (id) => !/^(\.{0,2}\/|@\/)/.test(id),
          },
          sourcemap: true,
          emptyOutDir: true,
        },
      }
    : {}),
  // The demo's public/ dir must not be copied into the library dist.
  ...(libBuild ? { publicDir: false as const } : {}),
  // Keep the docs site's output out of the published dist/ directory.
  ...(libBuild ? {} : { build: { outDir: 'dist-docs' } }),
  ...(libBuild === 'css'
    ? {
        build: {
          // Emit the compiled Tailwind CSS as dist/styles.css.
          rollupOptions: {
            input: path.resolve(__dirname, 'src/styles.css'),
            output: {
              assetFileNames: 'styles.css',
            },
          },
          // Don't wipe the JS bundle built in the previous step.
          emptyOutDir: false,
        },
      }
    : {}),
})
