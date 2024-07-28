import { format } from "date-fns";

import { db } from "@/lib/db";
import { OrderColumn } from "./components/Columns";
import { OrderClient } from "./components/Clients";


const Page = async () => {

    const orders = await db.order.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedorders: any = orders.map((item) => ({
        id: item.id,
        label: item.name,
        number : item.number,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))


  return (
    <>
    <div className="flex-1 space-y-4 p-8 pt-6 mt-7" >
    <OrderClient data={formattedorders}/>
    </div>
    </>
  )
}

export default Page
