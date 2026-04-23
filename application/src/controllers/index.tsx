import type { Router } from '@remix-run/fetch-router';
import type { routes } from '../routes.js';
import { rootController } from './root.js';
import { langstoreController } from './langstore.js';
import { apiController } from './api.js';

export function registerControllers(
    router: Router,
    routeMap: typeof routes,
) {
    // Root routes
    router.get(routeMap.index, rootController.index);
    router.get(routeMap.catchall, rootController.catchall);
    router.get(routeMap.robots, rootController.robots);

    // Langstore routes
    router.get(routeMap.langstore.index, langstoreController.index);
    router.get(routeMap.langstore.shop.index, langstoreController.shopIndex);
    router.get(routeMap.langstore.shop.folder, langstoreController.shopFolder);
    router.get(routeMap.langstore.shop.folderPdf, langstoreController.shopFolderPdf);
    router.get(routeMap.langstore.shop.product, langstoreController.shopProduct);
    router.get(routeMap.langstore.shop.productPdf, langstoreController.shopProductPdf);
    router.get(routeMap.langstore.stories.index, langstoreController.storiesIndex);
    router.get(routeMap.langstore.stories.story, langstoreController.storiesStory);
    router.get(routeMap.langstore.search, langstoreController.search);
    router.get(routeMap.langstore.cart, langstoreController.cart);
    router.get(routeMap.langstore.checkout, langstoreController.checkout);
    router.get(routeMap.langstore.cancelPayment, langstoreController.cancelPayment);
    router.get(routeMap.langstore.order.index, langstoreController.orderIndex);
    router.get(routeMap.langstore.order.cart, langstoreController.orderCart);
    router.get(routeMap.langstore.order.invoice, langstoreController.orderInvoice);
    router.get(routeMap.langstore.orders, langstoreController.orders);
    router.get(routeMap.langstore.favicon, langstoreController.favicon);

    // API routes
    router.post(routeMap.langstore.api.cart.index, apiController.cartIndex);
    router.post(routeMap.langstore.api.cart.place, apiController.cartPlace);
    router.get(routeMap.langstore.api.cart.id, apiController.cartId);
    router.get(routeMap.langstore.api.orders.index, apiController.ordersIndex);
    router.get(routeMap.langstore.api.orders.id, apiController.ordersId);
    router.post(routeMap.langstore.api.payment.create, apiController.paymentCreate);
    router.post(routeMap.langstore.api.payment.buynow, apiController.paymentBuynow);
    router.get(routeMap.langstore.api.payment.methods, apiController.paymentMethods);
    router.post(routeMap.langstore.api.payment.crystal, apiController.paymentCrystal);
    router.post(routeMap.langstore.api.shipping.callback, apiController.shippingCallback);
    router.get(routeMap.langstore.api.shipping.pickup, apiController.shippingPickup);
    router.post(routeMap.langstore.api.magicklink.register, apiController.magicklinkRegister);
    router.get(routeMap.langstore.api.magicklink.confirm, apiController.magicklinkConfirm);
    router.get(routeMap.langstore.api.vipps.connect, apiController.vippsConnect);

    // Webhook routes
    router.post(routeMap.api.webhook.cachePurge, apiController.webhookCachePurge);
    router.post(routeMap.api.webhook.orderCreated, apiController.webhookOrderCreated);
    router.post(routeMap.api.webhook.orderStage, apiController.webhookOrderStage);
    router.post(routeMap.api.webhook.payment.adyen, apiController.webhookPaymentAdyen);
    router.post(routeMap.api.webhook.payment.dintero, apiController.webhookPaymentDintero);
    router.post(routeMap.api.webhook.payment.intent, apiController.webhookPaymentIntent);
    router.post(routeMap.api.webhook.payment.klarna, apiController.webhookPaymentKlarna);
    router.post(routeMap.api.webhook.payment.montonio, apiController.webhookPaymentMontonio);
    router.post(routeMap.api.webhook.payment.quickpay, apiController.webhookPaymentQuickpay);
    router.post(routeMap.api.webhook.payment.razorpay, apiController.webhookPaymentRazorpay);
    router.post(routeMap.api.webhook.payment.stripe, apiController.webhookPaymentStripe);
    router.post(routeMap.api.webhook.payment.vipps, apiController.webhookPaymentVipps);
}
