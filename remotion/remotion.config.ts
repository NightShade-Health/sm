import {Config} from '@remotion/cli/config';

// Cloud sessions ship Chromium's headless shell; on a Mac, delete this line (Remotion downloads its own).
Config.setBrowserExecutable(process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
