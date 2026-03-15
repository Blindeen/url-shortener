import z from 'zod';

export const registerUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export type RegisterFormData = z.infer<typeof registerUserSchema>;

export type RegisterSuccess = {
    message: string;
};
