import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { productsId: string } }
) {
    try {
        if (!params.productsId) {
            return new NextResponse("Product ID is required", { status: 400 })
        }

        const product = await db.product.findUnique({
            where: {
                id: params.productsId,
            },
            include: {
                category: true,
            }
        });
        
        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: {  productsId: string } }
) {
    try {
        const { user } : any =await  auth();
        const body = await req.json();

        const {
            name,
            price,
            categoryId,
            imageUrl,
        } = body;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image is required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }


        if (!params.productsId) {
            return new NextResponse("Product ID is required", { status: 400 });
        }


        const product = await db.product.update({
            where: {
                id: params.productsId,
            },
            data: {
                name,
                price,
                categoryId,
                imageUrl
            }
        });

        // const product = await db.product.update({
        //     where: {
        //         id: params.productsId
        //     },
        //     data: {
        //         images: {
        //             createMany: {
        //                 data: [
        //                     ...images.map((image: { url: string }) => image)
        //                 ]
        //             }
        //         }
        //     }
        // })
        
        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, productsId: string } }
) {
    try {
        const { user } : any = await auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.productsId) {
            return new NextResponse("Product ID is required", { status: 400 });
        }


        const product = await db.product.deleteMany({
            where: {
                id: params.productsId,
            },
        });
        
        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}