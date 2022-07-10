import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "https://www.florkashop.sk/",
    env: {},
  },
});
