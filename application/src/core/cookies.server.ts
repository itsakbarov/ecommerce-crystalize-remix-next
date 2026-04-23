import { createCookie } from '@remix-run/cookie';

export const authCookie = createCookie('authentication', {
    maxAge: 604_800,
});
