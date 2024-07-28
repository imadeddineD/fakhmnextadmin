import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface CustumHeaderProps {
  label: string;
}

const CustumHeader = ({ label }: CustumHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold text-[#5d0060]", font.className)}>{label}</h1>
    </div>
  );
};

export default CustumHeader;