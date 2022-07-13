export function orderAPI() {
    cy.intercept('?wc-ajax=add_to_cart').as('addToCart');
    cy.intercept('?wc-ajax=update_order_review').as('updateOrder');
}
