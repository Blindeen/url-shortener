import { Prisma } from 'generated/prisma';

export const userWithGroupsArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: { groups: true },
});
export type UserWithGroups = Prisma.UserGetPayload<typeof userWithGroupsArgs>;
