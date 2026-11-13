// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

// Ensure process.env has the variables loaded for SSR during `vite dev`
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
Object.assign(process.env, env);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    define: {
      "process.env.SUPABASE_URL": JSON.stringify(env.SUPABASE_URL || env.VITE_SUPABASE_URL),
      "process.env.SUPABASE_PUBLISHABLE_KEY": JSON.stringify(env.SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY),
      "process.env.SUPABASE_PROJECT_ID": JSON.stringify(env.SUPABASE_PROJECT_ID || env.VITE_SUPABASE_PROJECT_ID),
    },
  },
});
