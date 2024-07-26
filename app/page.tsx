import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/loginbutton";

const font  = Poppins({
  subsets : ["latin"] ,
  weight : ["600"]
})

export default function Home() {
  return (
    <main className={cn(" flex h-full flex-col justify-center items-center gradient-box drop-shadow-md" , font.className)}>
      <div className="space-y-6 text-center">
        <div className=" sm:text-6xl text-5xl text-gray-300 font-semibold ">لوحة التحكم</div>
        <div className=" text-lg text-white">هذه لوحة التحكم الخاصة بفخم البن</div>
        <div>
          <LoginButton>
          <Button>تسجيل</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}