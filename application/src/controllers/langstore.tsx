import { getContext } from '../use-cases/http/utils.js';
import { getStoreFront } from '../use-cases/storefront.server.js';
import { CrystallizeAPI } from '../use-cases/crystallize/read/index.js';
import { isValidLanguageMarket, availableLanguages } from '../use-cases/LanguageAndMarket.js';

function renderPage(language: string, content: string) {
    return `<!DOCTYPE html>
<html lang="${language}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Crystallize - Superfast</title>
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <link rel="manifest" href="/manifest.json" />
    </head>
    <body>
        <header class="bg-white border-b border-gray-200">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="text-xl font-bold">Crystallize</a>
                    <nav>
                        <ul class="flex gap-4">
                            <li><a href="/${language}/shop" class="text-gray-600 hover:text-gray-900">Shop</a></li>
                            <li><a href="/${language}/stories" class="text-gray-600 hover:text-gray-900">Stories</a></li>
                        </ul>
                    </nav>
                    <div class="flex gap-4">
                        <a href="/${language}/cart" class="text-gray-600 hover:text-gray-900">Cart</a>
                    </div>
                </div>
            </div>
        </header>
        <main>${content}</main>
        <footer class="bg-gray-900 text-white py-8">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div><h3 class="text-lg font-semibold mb-4">About</h3><p class="text-gray-400">Crystallize Furniture Store</p></div>
                    <div><h3 class="text-lg font-semibold mb-4">Links</h3><ul class="space-y-2"><li><a href="/${language}/shop" class="text-gray-400 hover:text-white">Shop</a></li><li><a href="/${language}/stories" class="text-gray-400 hover:text-white">Stories</a></li></ul></div>
                    <div><h3 class="text-lg font-semibold mb-4">Contact</h3><p class="text-gray-400">support@crystallize.io</p></div>
                </div>
            </div>
        </footer>
    </body>
</html>`;
}

export const langstoreController = {
    index: async (context: any): Promise<Response> => {
        const request = context.request;
        const requestContext = getContext(request);

        if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
            return Response.redirect('/' + availableLanguages[0] + requestContext.url.pathname, 301);
        }

        const { shared, secret } = await getStoreFront(requestContext.host);
        const api = CrystallizeAPI({
            apiClient: secret.apiClient,
            language: requestContext.language,
        });

        const [navigation, tenantConfig, footer] = await Promise.all([
            api.fetchNavigation('/'),
            api.fetchTenantConfig(secret.config.tenantIdentifier),
            api.fetchFooter('/footer'),
        ]);

        const content = `
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-4xl font-bold mb-4">Welcome to Crystallize</h1>
                <p class="text-lg text-gray-600">Discover our curated collection of furniture and home accessories.</p>
                <div class="mt-8">
                    <a href="/${requestContext.language}/shop" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Shop Now</a>
                </div>
            </div>
        `;

        return new Response(renderPage(requestContext.language, content), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    },

    shopIndex: async (context: any): Promise<Response> => {
        const request = context.request;
        const requestContext = getContext(request);
        if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
            return Response.redirect('/' + availableLanguages[0] + requestContext.url.pathname, 301);
        }

        const content = `
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold mb-6">Shop</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="border rounded-lg p-4">
                        <h2 class="text-xl font-semibold">Product 1</h2>
                        <p class="text-gray-600 mt-2">Description here</p>
                        <a href="/${requestContext.language}/shop/category/product-1" class="text-blue-600 mt-4 inline-block">View Details</a>
                    </div>
                </div>
            </div>
        `;
        return new Response(renderPage(requestContext.language, content), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    },

    shopFolder: async (context: any): Promise<Response> => {
        const request = context.request;
        const requestContext = getContext(request);
        if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
            return Response.redirect('/' + availableLanguages[0] + requestContext.url.pathname, 301);
        }

        const content = `
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold mb-6">Shop Category</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="border rounded-lg p-4">
                        <h2 class="text-xl font-semibold">Product 1</h2>
                        <p class="text-gray-600 mt-2">Description here</p>
                    </div>
                </div>
            </div>
        `;
        return new Response(renderPage(requestContext.language, content), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    },

    shopFolderPdf: async (context: any): Promise<Response> => {
        return new Response('Shop Folder PDF', { status: 200 });
    },

    shopProduct: async (context: any): Promise<Response> => {
        const request = context.request;
        const requestContext = getContext(request);
        if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
            return Response.redirect('/' + availableLanguages[0] + requestContext.url.pathname, 301);
        }

        const content = `
            <div class="container mx-auto px-4 py-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><div class="bg-gray-200 rounded-lg aspect-square"></div></div>
                    <div>
                        <h1 class="text-3xl font-bold mb-4">Product Name</h1>
                        <p class="text-2xl text-gray-900 mb-4">$99.00</p>
                        <p class="text-gray-600 mb-6">Product description goes here.</p>
                        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        return new Response(renderPage(requestContext.language, content), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    },

    shopProductPdf: async (context: any): Promise<Response> => {
        return new Response('Shop Product PDF', { status: 200 });
    },

    storiesIndex: async (context: any): Promise<Response> => {
        return new Response('Stories Index', { status: 200 });
    },

    storiesStory: async (context: any): Promise<Response> => {
        return new Response('Story', { status: 200 });
    },

    search: async (context: any): Promise<Response> => {
        return new Response('Search', { status: 200 });
    },

    cart: async (context: any): Promise<Response> => {
        const request = context.request;
        const requestContext = getContext(request);
        if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
            return Response.redirect('/' + availableLanguages[0] + requestContext.url.pathname, 301);
        }

        const content = `
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
                <div class="border rounded-lg p-6">
                    <p class="text-gray-600">Your cart is empty</p>
                </div>
                <div class="mt-6">
                    <a href="/${requestContext.language}/checkout" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Proceed to Checkout</a>
                </div>
            </div>
        `;
        return new Response(renderPage(requestContext.language, content), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    },

    checkout: async (context: any): Promise<Response> => {
        const request = context.request;
        const requestContext = getContext(request);
        if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
            return Response.redirect('/' + availableLanguages[0] + requestContext.url.pathname, 301);
        }

        const content = `
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold mb-6">Checkout</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="border rounded-lg p-6">
                        <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
                        <form class="space-y-4">
                            <div><label class="block text-sm font-medium mb-1">Email</label><input type="email" class="w-full border rounded-lg px-3 py-2" /></div>
                            <div><label class="block text-sm font-medium mb-1">Full Name</label><input type="text" class="w-full border rounded-lg px-3 py-2" /></div>
                            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Place Order</button>
                        </form>
                    </div>
                    <div class="border rounded-lg p-6">
                        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
                        <p class="text-gray-600">No items in cart</p>
                    </div>
                </div>
            </div>
        `;
        return new Response(renderPage(requestContext.language, content), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    },

    cancelPayment: async (context: any): Promise<Response> => {
        return new Response('Cancel Payment', { status: 200 });
    },

    orderIndex: async (context: any): Promise<Response> => {
        return new Response('Order', { status: 200 });
    },

    orderCart: async (context: any): Promise<Response> => {
        return new Response('Order Cart', { status: 200 });
    },

    orderInvoice: async (context: any): Promise<Response> => {
        return new Response('Order Invoice PDF', { status: 200 });
    },

    orders: async (context: any): Promise<Response> => {
        return new Response('Orders', { status: 200 });
    },

    favicon: async (context: any): Promise<Response> => {
        return new Response('Favicon', { status: 200 });
    },
};
