import { db } from '../db';

export const getAllModules = async () => {
    return db.module.findMany();
};

export const getUserModules = async (userId: number) => {
    return db.module.findMany({
        where: {
            permissions: {
                some: {
                    groups: {
                        some: {
                            users: {
                                some: { id: userId },
                            },
                        },
                    },
                    operation: {
                        read: true,
                    },
                },
            },
        },
        distinct: ['name'],
        select: {
            name: true,
        },
    });
};
