import { format } from "date-fns";


import { db } from "@/lib/db";
import { CategoriesColumn } from "./components/Columns";
import { CategoriesClient } from "./components/Clients";


const Page = async () => {

    const billboards = await db.categories.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboards: CategoriesColumn[] = billboards.map((item) => ({
        id: item.id,
        name : item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))


  return (
    <>
    <div className="flex-1 space-y-4 p-8 pt-6 mt-7" >
    <CategoriesClient data={formattedBillboards}/>
    </div>
    </>
  )
}

export default Page
