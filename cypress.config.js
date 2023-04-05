import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task.js";

const setupBrowser = (browser, launchOptions) => {
  if (browser.name === "chrome") {
    // required browser settings for VRT consistency
    launchOptions.args.push(
      "--start-fullscreen",
      "--window-size=1440,1200", // This must be larger than the set viewport for a full screen snapshot
      "--force-device-scale-factor=1",
      "--font-render-hinting=none",
      "--disable-gpu"
    );
  }
  return launchOptions;
};

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on("before:browser:launch", setupBrowser);
      return config;
    },
    specPattern: "src/testme.cy.js",
    env: {
      preserveOriginalScreenshot: true,
    },
    slowTestThreshold: 1000,
  },
});
