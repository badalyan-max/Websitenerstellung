import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const result = spawnSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "build"],
  {
    cwd: fileURLToPath(new URL("../", import.meta.url)),
    stdio: "inherit",
    env: {
      ...process.env,
      VERCEL: "1",
      NEXT_ADAPTER_PATH: fileURLToPath(
        new URL("../tests/fixtures/build-adapter.cjs", import.meta.url),
      ),
    },
  },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
