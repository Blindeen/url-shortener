import bcrypt from 'bcrypt';

export const hashPassword = async (rawPassword: string) => {
    return await bcrypt.hash(
        rawPassword,
        parseInt(process.env.SALT_ROUNDS || '10', 10)
    );
};
