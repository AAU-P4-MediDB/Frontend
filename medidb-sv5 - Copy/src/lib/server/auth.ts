// src/lib/server/auth.ts
import { env } from '$env/dynamic/private';
import * as jose from 'jose';

const secret = new TextEncoder().encode(env.JWT_KEY);
console.log('JWT_KEY:', env.JWT_KEY);
console.log('JWT_ISSUER:', env.JWT_ISSUER);
console.log('JWT_AUDIENCE:', env.JWT_AUDIENCE);

export async function verifyJwt(token: string) {
    try {
        const { payload } = await jose.jwtVerify(token, secret, {
            issuer: env.JWT_ISSUER,
            audience: env.JWT_AUDIENCE,
        });
        return payload;
    } catch {
        return null;
    }
}