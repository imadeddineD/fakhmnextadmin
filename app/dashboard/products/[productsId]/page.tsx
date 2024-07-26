import { db } from "@/lib/db";
import { ProductForm } from "./components/productsForm";

const ProductPage = async ({
    params
}: {
    params: { productsId: string}
}) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productsId
        }
    });

    const categories = await db.categories.findMany();

    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={product}
                    categories={categories}
                />
            </div>
        </div>
    );
}
 
export default ProductPage;