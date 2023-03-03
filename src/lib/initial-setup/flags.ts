import { env } from '$env/dynamic/public';
import fs from 'node:fs';
import path from 'node:path';

async function setFlag(envvar: string, value: string) {
  const dotEnvPath = path.resolve('.env');
  fs.appendFile(
    dotEnvPath,
    `\n# --- Initial Setup Done Flag ---\nPUBLIC_${envvar}=${value}\n`,
    (err) => {
      if (err) throw new Error('Unable to write flag to .env, check filesystem permissions');
    }
  );
}

export let setup_complete = false;
// Check if ENVVAR is set to indicate the first-time setup (or other setup method) is already done:
if (env.PUBLIC_INITIAL_SETUP_DONE !== undefined && env.PUBLIC_INITIAL_SETUP_DONE === 'COMPLETE') {
  setup_complete = true;
}
export function setFlag_setup_complete() {
  setFlag('INITIAL_SETUP_DONE', 'COMPLETE');
}
