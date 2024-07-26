"use client";

import { Categories, Home } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

// import { Heading } from "@/components/ui/heading";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { AlertModal } from "@/components/modals/alert-modal";
// import ImageUpload from "@/components/ui/image-upload";
import { ChevronLeft, Trash } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/imageupload";
import { Separator } from "@/components/ui/Separator";

const formSchema = z.object({
    name: z.string().min(1),
});

type CategoriesFormValues = z.infer<typeof formSchema>

interface CategoriesFormProps {
    initialData: Categories | null;
}

export const CategoriesForm: React.FC<CategoriesFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "تعديل الفئات" : "إنشاء الفئات"
    const description = initialData ? "تعديل الفئات" : "إضافة صفحة رئيسية جديدة"
    const toastMessage = initialData ? "تم تحديث الفئات" : "تم إنشاء الفئات"
    const action = initialData ? "حفظ التغييرات" : "إنشاء"

    const form = useForm<CategoriesFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
        }
    });

    const onSubmit = async (data: CategoriesFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/categories/${params.categoriesId}`, data);
            } else {
                await axios.post(`/api/categories`, data);
            }
            router.push(`/dashboard/categories`)
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {
            toast.error("هناك خطأ ما");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/categories/${params.categoriesId}`)
            router.refresh();
            router.push(`/dashboard/categories`)
            toast.success("تم حذف الفئات")
        } catch (error) {
            toast.error("تأكد من إزالة كافة الفئات باستخدام هذه الفئات أولاً");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    
    return (
        <>
            {/* <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            /> */}
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData
                    ? (
                        <Button
                            disabled={loading}
                            variant="destructive"
                            size="icon"
                            onClick={() => setOpen(true)}
                            className=" rounded-[6px]"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>  
                    )
                    : (
                        <Button
                            disabled={loading}
                            variant="outline"
                            size="icon"
                            onClick={() => router.push(`/dashboard/categories`)}
                            className=" rounded-[6px]"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>  
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الإسم</FormLabel>
                                        <FormControl>
                                            <Input className="md:w-full w-60" disabled={loading} placeholder="الفئة الفئات" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}