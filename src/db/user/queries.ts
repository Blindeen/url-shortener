import { db } from '../db';
import { userWithGroupsArgs } from '../user/definitions';

export const createUser = async (
    email: string,
    hashedPassword: string,
    groupId: bigint
) => {
    return db.user.create({
        data: {
            login: email,
            password: hashedPassword,
            groups: {
                connect: { id: groupId },
            },
        },
    });
};

export const getUserById = async (userId: bigint) => {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await db.user.findUnique({ where: { login: email } });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

export const getUserWithGroups = async (userId: bigint) => {
    const user = await db.user.findUnique({
        where: { id: userId },
        ...userWithGroupsArgs,
    });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

export const checkUserExists = async (email: string) => {
    const user = await db.user.findUnique({ where: { login: email } });
    return !!user;
};
