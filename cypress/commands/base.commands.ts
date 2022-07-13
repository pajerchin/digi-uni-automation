Cypress.Commands.add(
    'openPage',
    (view: Cypress.ViewportPreset, url: string) => {
        cy.viewport(view).log(`open viewport: ${view}`);
        cy.visit(url)
            .its('window.performance.timing.loadEventEnd')
            .should('not.be.null')
            .log(`url ${url} and ${view} on dev environment is open `);
    }
);

Cypress.Commands.add('enterValueToInput', (selector: string, value: string) => {
    cy.get(selector)
        .clear()
        .should('be.empty')
        .focus()
        .type(value)
        .should('have.value', value)
        .blur()
        .log(`input ${selector} have value ${value}`);
});

Cypress.Commands.add('checkPathnameUrl', (pathname: string) => {
    cy.location('pathname')
        .should('contain', pathname)
        .log(`Url contain ${pathname}`);
});

Cypress.Commands.add('checkGoogleId', (id: string, name: string) => {
    cy.window()
        .its(`google_tag_manager.${id}`)
        .should('exist')
        .log(`${name} is implemented`);
});

Cypress.Commands.add(
    'datalayerEvent',
    (eventName: string, jsonName?: string) => {
        cy.window()
            .its('dataLayer')
            .then((data) => {
                const event = data.find((ga4) => ga4.event === eventName);

                if (jsonName) {
                    cy.writeFile(`cypress/fixtures/${jsonName}`, event);
                }
            })
            .fixture(jsonName);
    }
);

Cypress.Commands.add('clickCheckbox', (selector: string) => {
    cy.get(selector).click().should('be.checked');
});
