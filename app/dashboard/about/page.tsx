import { format } from "date-fns";


import { db } from "@/lib/db";
import { AboutColumn } from "./components/Columns";
import { AboutClient } from "./components/Clients";


const Page = async () => {

    const billboards = await db.about.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboards: AboutColumn[] = billboards.map((item) => ({
        id: item.id,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))


  return (
    <>
    <div className="flex-1 space-y-4 p-8 pt-6 mt-7" >
    <AboutClient data={formattedBillboards}/>
    </div>
    </>
  )
}

export default Page
