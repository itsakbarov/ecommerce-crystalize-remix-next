import { route, get, post } from '@remix-run/fetch-router/routes';

export const routes = route({
    index: get('/'),
    langstore: {
        index: get('/:lang'),
        shop: {
            index: get('/:lang/shop'),
            folder: get('/:lang/shop/:folder'),
            folderPdf: get('/:lang/shop/:folder.pdf'),
            product: get('/:lang/shop/:folder/:product'),
            productPdf: get('/:lang/shop/:folder/:product.pdf'),
        },
        stories: {
            index: get('/:lang/stories'),
            story: get('/:lang/stories/:story'),
        },
        search: get('/:lang/search'),
        cart: get('/:lang/cart'),
        checkout: get('/:lang/checkout'),
        cancelPayment: get('/:lang/cancel-payment'),
        order: {
            index: get('/:lang/order/:id'),
            cart: get('/:lang/order/cart/:id'),
            invoice: get('/:lang/order/invoice/:id.pdf'),
        },
        orders: get('/:lang/orders'),
        favicon: get('/:lang/favicon/:size.png'),
        api: {
            cart: {
                index: post('/:lang/api/cart'),
                place: post('/:lang/api/cart/place'),
                id: get('/:lang/api/cart/:id'),
            },
            orders: {
                index: get('/:lang/api/orders'),
                id: get('/:lang/api/orders/:id'),
            },
            payment: {
                create: post('/:lang/api/payment/:provider/create'),
                buynow: post('/:lang/api/payment/:provider/buynow'),
                methods: get('/:lang/api/payment/:provider/payment-methods'),
                crystal: post('/:lang/api/payment/crystal/:type/confirmed'),
            },
            shipping: {
                callback: post('/:lang/api/shipping/:provider/callback'),
                pickup: get('/:lang/api/shipping/:provider/pickup-points'),
            },
            magicklink: {
                register: post('/:lang/api/magicklink/register'),
                confirm: get('/:lang/api/magicklink/confirm/:token'),
            },
            vipps: {
                connect: get('/:lang/api/vipps/connect'),
            },
        },
    },
    api: {
        webhook: {
            cachePurge: post('/api/webhook/cache/purge'),
            orderCreated: post('/api/webhook/order/created'),
            orderStage: post('/api/webhook/order/stage/changed'),
            payment: {
                adyen: post('/api/webhook/payment/adyen'),
                dintero: post('/api/webhook/payment/dintero/verify'),
                intent: post('/api/webhook/payment/intent'),
                klarna: post('/api/webhook/payment/klarna/:cartId'),
                montonio: post('/api/webhook/payment/montonio'),
                quickpay: post('/api/webhook/payment/quickpay'),
                razorpay: post('/api/webhook/payment/razorpay/verify'),
                stripe: post('/api/webhook/payment/stripe'),
                vipps: post('/api/webhook/payment/vipps/v2/payments/:cartId'),
            },
        },
    },
    robots: get('/robots.txt'),
    catchall: get('/*'),
});
