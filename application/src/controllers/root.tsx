import { availableLanguages } from '../use-cases/LanguageAndMarket.js';

export const rootController = {
    index: () => {
        return Response.redirect('/' + availableLanguages[0], 301);
    },
    catchall: (context: any) => {
        const path = context.params['*'] || '';
        return Response.redirect('/' + availableLanguages[0] + '/' + path, 301);
    },
    robots: async (context: any) => {
        // TODO: Port storefront logic
        return new Response(
            `User-agent: *\nAllow: /\n`,
            {
                headers: {
                    'Content-Type': 'text/plain',
                    'Cache-Control': 'public, max-age=604800',
                },
            }
        );
    },
};
