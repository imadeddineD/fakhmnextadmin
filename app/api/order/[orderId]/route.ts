import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE (
    req: Request,
    { params }: { params: {  orderId: string } }
) {
    try {
        const { user } : any =await auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.orderId) {
            return new NextResponse("order ID is required", { status: 400 });
        }

       

        const order = await db.order.deleteMany({
            where: {
                id: params.orderId,
            },
        });
        
        return NextResponse.json(order);
    } catch (error) {
        console.log('[order_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}