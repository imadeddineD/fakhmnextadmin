import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";



export default async function  DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode; 
    params: { storeId: string }
}) {
    const { user } : any =await auth();

    if (!user) {
        redirect('auth/login');
    }

    
    

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}