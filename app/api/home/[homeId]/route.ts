import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { homeId: string } }
) {
    try {
        if (!params.homeId) {
            return new NextResponse("Home ID is required", { status: 400 })
        }

        const Home = await db.home.findUnique({
            where: {
                id: params.homeId,
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
    { params }: { params: {  homeId: string } }
) {
    try {
        const { user } : any = await auth();

        const body = await req.json();

        const { label, imageUrl , description } = body;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }


        if (!params.homeId) {
            return new NextResponse("Home ID is required", { status: 400 });
        }

        

        

        const home = await db.home.updateMany({
            where: {
                id: params.homeId,
            },
            data: {
                label,
                imageUrl,
                description
            }
        });
        
        return NextResponse.json(home);
    } catch (error) {
        console.log('[HOME_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: {  homeId: string } }
) {
    try {
        const { user } : any =await auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.homeId) {
            return new NextResponse("Home ID is required", { status: 400 });
        }

       

        const home = await db.home.deleteMany({
            where: {
                id: params.homeId,
            },
        });
        
        return NextResponse.json(home);
    } catch (error) {
        console.log('[HOME_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}