import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ['latin'],
    weight: ["400","600"],
});


const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-5">
        <Image
            src="/logo.png"
            height="20"
            width="20"
            alt="logo"
        />
        <p className={cn("font-semibold text-[14px]", font.className)}>A-SPACE</p>
    </div>
  )
}

export default Logo