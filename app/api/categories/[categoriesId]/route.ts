import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { categoriesId: string } }
) {
    try {
        if (!params.categoriesId) {
            return new NextResponse("Categories ID is required", { status: 400 })
        }

        const Categories = await db.categories.findUnique({
            where: {
                id: params.categoriesId,
            },
        });
        
        return NextResponse.json(Categories);
    } catch (error) {
        console.log('[Categories_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: {  categoriesId: string } }
) {
    try {
        const { user } : any = await auth();

        const body = await req.json();

        const { name } = body;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }


        if (!params.categoriesId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }

        

        

        const categories = await db.categories.updateMany({
            where: {
                id: params.categoriesId,
            },
            data: {
                name
            }
        });
        
        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORIES_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: {  categoriesId: string } }
) {
    try {
        const { user } : any =await auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.categoriesId) {
            return new NextResponse("categories ID is required", { status: 400 });
        }

       

        const categories = await db.categories.deleteMany({
            where: {
                id: params.categoriesId,
            },
        });
        
        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORIES_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}