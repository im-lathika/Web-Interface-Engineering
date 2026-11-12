import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" lets the build work on GitHub Pages, Netlify, Vercel or any sub-folder.
export default defineConfig({ base: "./", plugins: [react()] });
