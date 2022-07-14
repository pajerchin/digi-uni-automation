import * as order from '../modules/base.modules';
import { SELECTORS } from '../view/selectors.view';
import * as api from '../api/order.api';

context('Order', () => {
    describe('Order flow with GA4', () => {
        beforeEach(() => {
            api.orderAPI();
            cy.openPage('macbook-15', '/');
            cy.checkGoogleId('GTM-WJJQRDX', 'GTM');
            cy.checkGoogleId('G-3RX4W139YN', 'GA4');
        });

        it('Test datalayer order', () => {
            order.addProductToCart(4);
            cy.wait('@addToCart');

            order.redirectToNextStep(SELECTORS.cart, 'kosik');

            cy.datalayerEvent('view_cart', 'viewCart.json')
                .then((cart) => {
                    expect(cart.event).is.equal('view_cart');
                    expect(cart.ecommerce.items.length).is.greaterThan(0);
                })
                .log('check view_cart datalayer');

            order.redirectToNextStep(SELECTORS.checkout, 'pokladna');

            cy.wait('@updateOrder');

            cy.datalayerEvent('begin_checkout', 'beginCheckout.json')
                .then((begin) => {
                    expect(begin.event).is.equal('begin_checkout');
                })
                .log('check begin_checkout datalayer');

            order.fillForm();

            cy.clickCheckbox(SELECTORS.localShipping);

            cy.datalayerEvent('add_shipping_info', 'addShipingInfo.json').then(
                (shipping) => {
                    expect(shipping.event).is.equal('add_shipping_info');
                    expect(shipping.ecommerce.shipping_tier).to.contain(
                        'local_pickup'
                    );
                }
            );

            cy.clickCheckbox(SELECTORS.cashOnDelivery);

            cy.datalayerEvent('add_payment_info', 'addPaymentInfo.json').then(
                (payment) => {
                    expect(payment.event).is.equal('add_payment_info');
                    expect(payment.ecommerce.payment_type).is.equal('cod');
                }
            );

            order.redirectToNextStep(SELECTORS.placeOrder, 'order-received');

            cy.datalayerEvent('purchase', 'purchase.json').then((purchase) => {
                expect(purchase.event).is.equal('purchase');
                expect(purchase.ecommerce.transaction_id).not.be.empty;
                expect(purchase.ecommerce.value).not.be.null;
            });
        });
    });
});
