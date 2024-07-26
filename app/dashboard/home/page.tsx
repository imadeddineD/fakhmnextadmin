import { format } from "date-fns";


import { db } from "@/lib/db";
import { HomeColumn } from "./components/Colummns";
import { HomeClient } from "./components/Client";

const Page = async () => {

    const billboards = await db.home.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboards: HomeColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))


  return (
    <>
    <div className="flex-1 space-y-4 p-8 pt-6 mt-7" >
    <HomeClient data={formattedBillboards}/>
    </div>
    </>
  )
}

export default Page
