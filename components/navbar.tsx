import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import logo from "../public/logo.png"
import Image from "next/image";
import StoreSwitcher from "./storeswitcher";
import { MainNav } from "./MainNav";


const Navbar = async () => {
    const { user } : any = await auth();

    if (!user) {
        redirect("/auth/login");
    }

    

    return (
        <div className="border-b">
            <div className="flex h-[64px] w-[90%] mx-auto justify-between items-center px-4">
                {/* <StoreSwitcher /> */}
                <div className=" w-[60px]">
                    <Image src={logo} width={60} height={40} alt="logo"/>
                </div>
                <MainNav/>
                <div >
                
                    <form action={async () => {
                        "use server" ; 
                        await signOut()
                    }}>
                        <Button size="sm" className=" bg-[#5d0060]">الخروج</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;