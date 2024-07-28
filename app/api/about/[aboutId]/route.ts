import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { aboutId: string } }
) {
    try {
        if (!params.aboutId) {
            return new NextResponse("About ID is required", { status: 400 })
        }

        const About = await db.about.findUnique({
            where: {
                id: params.aboutId,
            },
        });
        
        return NextResponse.json(About);
    } catch (error) {
        console.log('[ABOUT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: {  aboutId: string } }
) {
    try {
        const { user } : any = await auth();

        const body = await req.json();

        const { imageUrl , description } = body;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }


        if (!params.aboutId) {
            return new NextResponse("About ID is required", { status: 400 });
        }

        

        

        const about = await db.about.updateMany({
            where: {
                id: params.aboutId,
            },
            data: {
                imageUrl,
                description
            }
        });
        
        return NextResponse.json(about);
    } catch (error) {
        console.log('[ABOUT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: {  aboutId: string } }
) {
    try {
        const { user } : any =await auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.aboutId) {
            return new NextResponse("about ID is required", { status: 400 });
        }


        // const about = await db.about.deleteMany({
        //     where: {
        //         id: params.aboutId,
        //     },
        // });
        
        return NextResponse.json("You can't delete it");
    } catch (error) {
        console.log('[ABOUT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}