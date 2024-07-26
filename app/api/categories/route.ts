import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { user } : any = await auth();
        const body = await req.json();

        const {  name } = body;

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        

    

        const Categories = await db.categories.create({
            data: {
                name
            }
        });

        return NextResponse.json(Categories);
    } catch (error) {
        console.log('[CATEGORIES_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {

        const categories = await db.categories.findMany();

        return NextResponse.json(categories);
    } catch (error) {
        console.log('[categoriesS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}