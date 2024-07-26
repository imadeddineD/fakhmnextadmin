import { db } from "@/lib/db";
import { CategoriesForm } from "./components/categoriesForm";


const CategoriesPage = async ({
    params
}: {
    params: { categoriesId: string }
}) => {
    const categories = await db.categories.findUnique({
        where: {
            id: params.categoriesId
        }
    });
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesForm initialData={categories} />
            </div>
        </div>
    );
}
 
export default CategoriesPage;