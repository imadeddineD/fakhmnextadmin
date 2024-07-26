import * as z from "zod" 

export const LoginSchema = z.object({
    email : z.string().email({
        message : "البريد الالكتروني مطلوب",
    }),
    password : z.string().min(1 , {
        message  : "كلمة المرور مطلوبة"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
      message: "البريد الالكتروني مطلوب",
    }),
    password: z.string().min(6, {
      message: "مطلوب ستة أحرف على الأقل",
    }),
    name: z.string().min(1, {
      message: "مطلوب اسم",
    }),
  });