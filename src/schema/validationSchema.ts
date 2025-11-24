import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(2, 'Ism kamida 2 harfdan iborat bo‘lishi kerak'),
    last_name: z.string().min(2, 'Familya kamida 2 harfdan iborat bo‘lishi kerak'),
    email: z.string().email('To‘g‘ri email kiriting'),
    birthdate: z.string().min(2, "Majburiy"),
    gender: z.enum(["male", "female"], { message: "Jinsni tanlang" }),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;