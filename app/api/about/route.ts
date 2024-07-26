import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { user } : any = await auth();
        const body = await req.json();

        const {  imageUrl , description } = body;

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

    

        const About = await db.about.create({
            data: {
                
                imageUrl,
                description
            }
        });

        return NextResponse.json(About);
    } catch (error) {
        console.log('[ABOUT_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {

        const about = await db.about.findMany();

        return NextResponse.json(about);
    } catch (error) {
        console.log('[ABOUTS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}