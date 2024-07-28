"use client"

import { useParams, useRouter } from "next/navigation"

import { useMediaQuery } from 'react-responsive';

// import { Button } from "@/components/ui/button"
// import { Heading } from "@/components/ui/heading"
// import { Separator } from "@/components/ui/separator"
// import { DataTable } from "@/components/ui/data-table"
// import { ApiList } from "@/components/ui/api-list"
import { Plus } from "lucide-react"
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/datatable";
import { AboutColumn, columns } from "./Columns";

interface AboutClientProps {
    data: AboutColumn[]
}

export const AboutClient
: React.FC<AboutClientProps>
 = (
    {
    data
}
) => {
    const params = useParams();
    const router = useRouter();
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    return (    
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`الصفحة من نحن`}
                    description="إدارة الصفحة من نحن الخاصة بك لمتجرك"
                />
                {data.length > 0 ? "" : <Button size={isMobile ? "icon" : "default"} onClick={() => router.push(`/dashboard/about/new`)} className=" bg-[#5d0060]">
                    {isMobile ? (<Plus className="h-4 w-4" />) : (<Plus className="mr-2 h-4 w-4" />)}
                    {!isMobile && "أضف الجديد"}
                </Button>}
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Separator />
        </>
    )
}