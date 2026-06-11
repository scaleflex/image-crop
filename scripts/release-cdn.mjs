#!/usr/bin/env node
import { execSync } from "child_process";
import { resolve, dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const { run } = await import(pathToFileURL(join(homedir(), ".claude/skills/release-cdn/release-cdn.mjs")).href);

run({
  root,
  artifacts: {
    plugin: {
      versionKey: "version",
      cdnFileName: "crop.min.js",
      // cdnFolder comes from FILEROBOT_CDN_FOLDER in .env.local
      build(version) {
        execSync("npm run build:cdn", { stdio: "inherit", cwd: root });
        return resolve(root, "dist-cdn/crop.min.js");
      },
    },
  },
  updateFiles: ["README.md"],
  // crop lives on GitHub only. Upstream of `master` is `origin` (personal);
  // also push the tag to the canonical company repo (`scaleflex` remote).
  extraRemotes: ["scaleflex"],
});
