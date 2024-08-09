import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { notificationId: string } }
) {
    try {
        if (!params.notificationId) {
            return new NextResponse("Notification ID is required", { status: 400 })
        }

        const Home = await db.notification.findUnique({
            where: {
                id: params.notificationId,
            },
        });
        
        return NextResponse.json(Home);
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: {  notificationId: string } }
) {
    try {
        const { user } : any = await auth();



        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        if (!params.notificationId) {
            return new NextResponse("Home ID is required", { status: 400 });
        }

        

        

        const home = await db.notification.updateMany({
            where: {
                id: params.notificationId,
            },
            data: {
                status : "read"
            }
        });
        
        return NextResponse.json(home);
    } catch (error) {
        console.log('[NOTIFICATION_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: {  notificationId: string } }
) {
    try {
        const { user } : any =await auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.notificationId) {
            return new NextResponse("Home ID is required", { status: 400 });
        }

       

        const home = await db.notification.deleteMany({
            where: {
                id: params.notificationId,
            },
        });
        
        return NextResponse.json(home);
    } catch (error) {
        console.log('[HOME_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}