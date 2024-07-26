import { db } from "@/lib/db";
import { ProductColumn } from "./components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductClient } from "./components/Clients";



const ProductsPage = async () => {

    const products = await db.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: formatter.format(item.price),
        category: item.category.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
}
 
export default ProductsPage;