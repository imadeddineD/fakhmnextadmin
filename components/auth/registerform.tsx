"use client"
import React, { useState, useTransition } from 'react'
import {useForm} from "react-hook-form"

import * as z from "zod"
// import { LoginSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FormError } from '../formerror'
import { FormSucess } from '../formsuccess'
import { login } from '@/actions/login'
import { RegisterSchema } from '@/schema';
import { register } from '@/actions/register';
// import { register } from '@/actions/register';


const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          email: "",
          password: "",
          name:""
        },
      });

      const [isPending , startTransition] = useTransition()
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");


      const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success)
            })
        })
      }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                        //   disabled={isPending}
                          placeholder="هاني"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                        //   disabled={isPending}
                          placeholder="الإيميل هنا"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم السر</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                        //   disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        {/* <Link href="/auth/reset">Forgot password?</Link> */}
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        </div>
        <FormError message={error || ""}/>
        <FormSucess message={success || ""} />
        <Button  type="submit" className="w-full">
        تسجيل حساب
        </Button>
        </form>
    </Form>
  )
}

export default RegisterForm