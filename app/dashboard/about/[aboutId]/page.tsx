import { db } from "@/lib/db";
import { AboutForm } from "./components/AboutForm";


const AboutPage = async ({
    params
}: {
    params: { aboutId: string }
}) => {
    const About = await db.about.findUnique({
        where: {
            id: params.aboutId
        }
    });
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <AboutForm initialData={About} />
            </div>
        </div>
    );
}
 
export default AboutPage;