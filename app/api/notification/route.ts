import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
) {
    try {
        const Notification = await db.notification.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(Notification);
    } catch (error) {
        console.log('[Notification_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}