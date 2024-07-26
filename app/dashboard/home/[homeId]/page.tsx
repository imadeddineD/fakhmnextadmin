import { db } from "@/lib/db";
import { HomeForm } from "./components/HomeForm";


const HomePage = async ({
    params
}: {
    params: { homeId: string }
}) => {
    const home = await db.home.findUnique({
        where: {
            id: params.homeId
        }
    });
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <HomeForm initialData={home} />
            </div>
        </div>
    );
}
 
export default HomePage;