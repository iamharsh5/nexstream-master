import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className=" p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image
            src="/next-stream.svg"
            alt="nexstream"
            height="130"
            width="130"
          />

          <div className={cn("hidden lg:block mt-1", font.className)}>
            <p className="flex justify-center text-xs text-muted-foreground">Creator dashboard</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
