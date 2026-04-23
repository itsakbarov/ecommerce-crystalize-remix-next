import { createServer } from 'node:http';
import { createRequestListener } from '@remix-run/node-fetch-server';
import { createRouter, RequestContext } from '@remix-run/fetch-router';
import { staticFiles } from '@remix-run/static-middleware';
import { routes } from './src/routes.js';
import { registerControllers } from './src/controllers/index.js';

const router = createRouter();

// Register all route handlers
registerControllers(router, routes);

// Static files middleware
const staticMiddleware = staticFiles('./src');

const listener = createRequestListener(
    async (request, client) => {
        // Create a context for the middleware
        const context = new RequestContext(request);
        
        // Try static files first
        const staticResponse = await staticMiddleware(context, async () => {
            return router.fetch(request);
        });
        
        if (staticResponse) {
            return staticResponse;
        }
        
        return router.fetch(request);
    },
    {
        onError: (error) => {
            console.error('Server error:', error);
            return new Response('Internal Server Error', { status: 500 });
        },
    }
);

const port = parseInt(process.env.PORT || '3000');
const server = createServer(listener);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
