"use client";

import { About } from "@prisma/client";
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
    description: z.string().min(1),
    imageUrl: z.string().min(1)
});

type AboutFormValues = z.infer<typeof formSchema>

interface AboutFormProps {
    initialData: About | null;
}

export const AboutForm: React.FC<AboutFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "تعديل الصفحة من نحن" : "إنشاء الصفحة من نحن"
    const description = initialData ? "تعديل الصفحة من نحن" : "إضافة صفحة من نحن جديدة"
    const toastMessage = initialData ? "تم تحديث الصفحة من نحن" : "تم إنشاء الصفحة من نحن"
    const action = initialData ? "حفظ التغييرات" : "إنشاء"

    const form = useForm<AboutFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            imageUrl: '',
            description : ''
        }
    });

    const onSubmit = async (data: AboutFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/about/${params.aboutId}`, data);
            } else {
                await axios.post(`/api/about`, data);
            }
            router.push(`/dashboard/about`)
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
            await axios.delete(`/api/about/${params.aboutId}`)
            router.refresh();
            router.push(`/dashboard/about`)
            toast.success("تم حذف الصفحة من نحن")
        } catch (error) {
            toast.error("تأكد من إزالة كافة الفئات باستخدام هذه الصفحة من نحن أولاً");
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
                            onClick={() => router.push(`/dashboard/about`)}
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>صورة الصفحة من نحن</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                    <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الوصف</FormLabel>
                                        <FormControl>
                                            <Textarea className="md:w-full w-60" disabled={loading} placeholder="وصف الصفحة من نحن" {...field} />
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