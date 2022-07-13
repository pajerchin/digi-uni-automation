import { VALID_FORM_DATA } from '../mocks/form.mock';
import { SELECTORS } from '../view/selectors.view';

export function fillForm() {
    cy.enterValueToInput(SELECTORS.firstname, VALID_FORM_DATA.firstName);
    cy.enterValueToInput(SELECTORS.lastname, VALID_FORM_DATA.lastName);
    cy.enterValueToInput(SELECTORS.street, VALID_FORM_DATA.street);
    cy.enterValueToInput(SELECTORS.postcode, VALID_FORM_DATA.postcode);
    cy.enterValueToInput(SELECTORS.city, VALID_FORM_DATA.city);
    cy.enterValueToInput(SELECTORS.phone, VALID_FORM_DATA.phone);
    cy.enterValueToInput(SELECTORS.email, VALID_FORM_DATA.email);
}

export function addProductToCart(productNumber: number) {
    cy.get('.product-small:visible')
        .eq(productNumber)
        .then((product) => {
            const name = Cypress.$(product).find('.product-title').text();

            const price = Cypress.$(product)
                .find('.price')
                .text()
                .substring(0, 1);

            cy.wrap(product)
                .find('.add-to-cart-button > a')
                .click()
                .should('have.class', 'added');

            cy.datalayerEvent('add_to_cart', 'addToCart.json');

            cy.fixture('addToCart.json')
                .then((datalayer) => {
                    const priceGA4 =
                        datalayer.ecommerce.items[0].price.substring(0, 1);

                    const nameGA4 = datalayer.ecommerce.items[0].item_name;

                    expect(name).is.equal(nameGA4);
                    expect(price).is.equal(priceGA4);
                })
                .log('check event add product to cart');
        });
    return this;
}

export function redirectToNextStep(selector: string, pathname: string) {
    cy.get(selector).click().should('not.exist');
    cy.checkPathnameUrl(pathname);
    return this;
}
