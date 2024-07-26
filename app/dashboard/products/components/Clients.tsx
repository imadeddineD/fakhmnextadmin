"use client"

import { useParams, useRouter } from "next/navigation"

import { ProductColumn, columns } from "./Columns"
import { useMediaQuery } from 'react-responsive';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/datatable";

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    return (    
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`المنتجات (${data.length})`}
                    description="إدارة المنتجات لمتجرك"
                />
                <Button size={isMobile ? "icon" : "default"} onClick={() => router.push(`/dashboard/products/new`)} className=" bg-[#5d0060]">
                    {isMobile ? (<Plus className="h-4 w-4" />) : (<Plus className="mr-2 h-4 w-4" />)}
                    {!isMobile && "أضف الجديد"}
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
        </>
    )
}