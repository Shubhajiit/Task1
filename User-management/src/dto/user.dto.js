import {z} from "zod";

export const createUserDTO = z.object({
    name:z.string().min(3,"name must be at least 3 chars"),
    email:z.string().email("invalid email"),
});

export const updateUserDTO = z.object({
    name:z.string().min(3).optional(),
    email:z.string().email().optional(),
})
