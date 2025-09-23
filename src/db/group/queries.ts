import { db } from '@/db';

export const createGroup = async (name: string) => {
    return db.group.create({
        data: { name },
    });
};

export const getGroupByName = async (name: string) => {
    const group = await db.group.findUnique({ where: { name } });
    if (!group) {
        throw new Error('Group not found');
    }

    return group;
};
