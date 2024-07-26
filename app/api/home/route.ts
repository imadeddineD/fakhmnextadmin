import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { user } : any = await auth();
        const body = await req.json();

        const { label, imageUrl , description } = body;

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 401 });
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

    

        const Home = await db.home.create({
            data: {
                label,
                imageUrl,
                description
            }
        });

        return NextResponse.json(Home);
    } catch (error) {
        console.log('[HOME_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {

        const homes = await db.home.findMany();

        return NextResponse.json(homes);
    } catch (error) {
        console.log('[HOMES_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}