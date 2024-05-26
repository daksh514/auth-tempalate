"use server"
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'

import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }

    const { email, password, name } = validatedFields.data
    const hashedPass = await bcryptjs.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: 'Email already exists' }
    }

    await db.user.create({
        data: {
            name,
            email,
            passwords: hashedPass,
        }
    })

    //TODO send verification email

    return { success: "User created" }
}