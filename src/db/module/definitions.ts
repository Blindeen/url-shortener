import { Prisma } from '@generated/prisma';

export const userModules = Prisma.validator<Prisma.ModuleFindManyArgs>()({
    distinct: ['name'],
    select: {
        name: true,
    },
});

export type UserModules = Prisma.ModuleGetPayload<typeof userModules>[];
