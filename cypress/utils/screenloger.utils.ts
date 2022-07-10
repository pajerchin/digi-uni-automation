export {};

declare global {
  interface Window {
    logCalls: number;
    testFlow: Array<string>;
  }
}

beforeEach(() => {
  window.logCalls = 1;
  window.testFlow = [];
});

Cypress.Commands.overwrite("log", (...args) => {
  const msg: string = args[1];

  Cypress.log({
    displayName: `${window.logCalls}. ${msg.toUpperCase()}`,
    message: "\n",
  });

  window.testFlow.push(`${window.logCalls}. ${msg}`);
  window.logCalls++;
});

Cypress.on("fail", (err) => {
  err.message += `${"\n\n" + "Test flow was:\n\n"}${window.testFlow.join(
    "\n"
  )}`;
  throw err;
});
