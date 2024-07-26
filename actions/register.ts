"use server"

import { RegisterSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (
    values: z.infer<typeof RegisterSchema>
) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "الحقول غير صالحة" };
    }

    const { email, name, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "البريد الاليكتروني قيد الاستخدام" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });


    return {success : "تم إنشاء المستخدم"}
}