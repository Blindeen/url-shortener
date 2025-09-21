import jwt from 'jsonwebtoken';

import { db } from './db';
import type { User } from '../../generated/prisma';

const secretKey = process.env.JWT_SECRET;
const expirationTime = parseInt(process.env.JWT_EXPIRATION || '3600', 10);

const decodeJwt = (token: string) => {
    if (!secretKey) {
        throw new Error('A secret key is required to verify the token');
    }

    try {
        return jwt.verify(token, secretKey);
    } catch {
        throw new Error('Invalid or expired token');
    }
};

export const signJwt = (user: User) => {
    if (!secretKey) {
        throw new Error('A secret key is required to sign the token');
    }

    const payload = {
        email: user.login,
        //TODO: add permissions or roles if needed
    };
    const options = {
        issuer: process.env.SERVER_URL,
        subject: user.id.toString(),
        expiresIn: expirationTime,
    };

    return jwt.sign(payload, secretKey, options);
};

export const extractUser = async (token: string) => {
    const payload = decodeJwt(token);
    if (typeof payload === 'string') {
        throw new Error('Invalid token payload');
    }

    const payloadObject = payload as jwt.JwtPayload;
    if (!payloadObject.sub) {
        throw new Error('Token payload misses subject (sub) claim');
    }

    const userId = +payloadObject.sub;
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};
