// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        openPage: (
            view: Cypress.ViewportPreset,
            url: string
        ) => Cypress.Chainable;

        enterValueToInput: (
            selector: string,
            value: string
        ) => Cypress.Chainable;

        checkPathnameUrl: (pathname: string) => Cypress.Chainable;

        checkGoogleId: (id: string, name: string) => Cypress.Chainable;

        datalayerEvent: (
            eventName: string,
            jsonPath?: string
        ) => Cypress.Chainable;

        clickCheckbox: (selector: string) => Cypress.Chainable;
    }
}
