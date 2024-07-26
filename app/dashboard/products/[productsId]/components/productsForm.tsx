"use client";

import { Product , Categories } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import "./style.css"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Trash } from "lucide-react";
import { AlertModal } from "@/components/modal/alertModal";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import ImageUpload from "@/components/ui/imageupload";

const formSchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().min(1),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData: Product | null;
    categories: Categories[];
}   

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "تعديل المنتجات" : "إنشاء المنتجات"
    const description = initialData ? "تعديل المنتجات" : "إضافة صفحة رئيسية جديدة"
    const toastMessage = initialData ? "تم تحديث المنتجات" : "تم إنشاء المنتجات"
    const action = initialData ? "حفظ التغييرات" : "إنشاء"

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price))
        } : {
            name: '',
            imageUrl: "",
            price: 0,
            categoryId: '',
        }
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/products/${params.productsId}`, data);
            } else {
                await axios.post(`/api/products`, data);
            }
            router.push(`/dashboard/products`)
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
            await axios.delete(`/api/products/${params.productsId}`)
            router.refresh();
            router.push(`/products`)
            toast.success("تم حذف المنتج")
        } catch (error) {
            toast.error("هناك خطأ ما");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
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
                        >
                            <Trash className="h-4 w-4" />
                        </Button>  
                    )
                    : (
                        <Button
                            disabled={loading}
                            variant="outline"
                            size="icon"
                            onClick={() => router.push(`/dashboard/products`)}
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
                                <FormLabel>صورة</FormLabel>
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الإسم</FormLabel>
                                        <FormControl>
                                            <Input className="md:w-full w-60" disabled={loading} placeholder="إسم المنتج" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>السعر <span className="text-muted-foreground text-xs">ex: 9.99</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="md:w-full w-60"
                                                disabled={loading}
                                                placeholder="0"
                                                {...field}
                                            />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الفئة</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="md:w-full w-60">
                                                <SelectValue defaultValue={field.value} placeholder="الفئة" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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