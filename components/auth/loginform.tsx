"use client"
import React, { useState, useTransition } from 'react'
import {useForm} from "react-hook-form"

import * as z from "zod"
import { LoginSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import Link from 'next/link'
import { login } from '@/actions/login'
import { Input } from '../ui/input'
import { FormError } from '../formerror'
import { FormSucess } from '../formsuccess'


const Loginform = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const [isPending , startTransition] = useTransition()
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");


      const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            .then((data : any) => {
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
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
                          disabled={isPending}
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
        سجل
        </Button>
        </form>
    </Form>
  )
}

export default Loginform