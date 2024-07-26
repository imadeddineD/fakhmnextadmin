"use server"

import { LoginSchema } from "@/schema"
import * as z from "zod"
import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
    values: z.infer<typeof LoginSchema>
) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "الحقول غير صالحة" };
    }

    const { email, password } = validatedFields.data;

    

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "البريد الإلكتروني غير موجود" };
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch) {
        return { error: "بيانات الاعتماد غير صالحة" };
      }

    if (existingUser.role === "user" ) {
        return { error: "أنت لست المشرف" };
      }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
          }); 
    } catch (error : any) {
        if (error instanceof AuthError) {
            switch (error.type) {
              case "CredentialsSignin":
                return { error: "بيانات الاعتماد غير صالحة" };
              default:
                return { error: "هناك خطأ ما" };
            }
          }
      
        throw error;
    }
}