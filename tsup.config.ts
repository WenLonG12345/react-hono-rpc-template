import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./server/main.ts"],
  platform: "node",
  target: "esnext",
  format: ["esm"],
  external: ["lightningcss"],
  cjsInterop: true,
  legacyOutput: false,
  splitting: false,
  sourcemap: true,
  shims: true,
});
