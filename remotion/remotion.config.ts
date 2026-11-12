import {Config} from '@remotion/cli/config';
import {existsSync, readdirSync} from 'fs';

// Cloud sessions ship Chromium's headless shell under /opt/pw-browsers (the version number changes between images).
const shell = () => {
  const root = '/opt/pw-browsers';
  if (!existsSync(root)) return undefined;
  const dir = readdirSync(root).filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop();
  if (!dir) return undefined;
  return [`${root}/${dir}/chrome-linux/headless_shell`, `${root}/${dir}/chrome-headless-shell-linux64/chrome-headless-shell`].find(existsSync);
};

// On a Mac nothing is found and Remotion downloads its own browser.
const browser = process.env.REMOTION_BROWSER ?? shell();
if (browser) Config.setBrowserExecutable(browser);
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
