"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { useStoreModal } from '@/hooks/use-store-modal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import Modal from '../ui/modal'
import axios from "axios"
import toast from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(1),
});

const StoreModal = () => {
    const storeModal = useStoreModal()

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setLoading(true);
            
            const response = await axios.post('/api/store', values);

            toast.success("تم إنشاء المتجر")

            window.location.assign(`/dashboard`);
        } catch (error) {
            toast.error("هناك خطأ ما");
        } finally {
            setLoading(false);
        }
    }
  return (
    <Modal
    title="إنشاء متجر"
    description="أضف متجر جديد لإدارة المنتجات والفئات المتنوعة"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
         <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>إسم المتجر</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="إسم المتجر" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6  flex items-center justify-between w-full">
                                <Button disabled={loading} variant="outline" size="sm" onClick={storeModal.onClose}>إلغاء</Button>
                                <Button disabled={loading} type="submit" size="sm" className=' bg-[#5d0060]'>أنشئ</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
    </Modal>
  )
}

export default StoreModal