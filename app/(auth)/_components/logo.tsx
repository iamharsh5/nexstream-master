import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className=" p-1">
        <Link href="/">
          <Image
            src="/next-stream.svg"
            alt="nexstream"
            height="180"
            width="180"
          />
        </Link>
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        {/* <p className="text-xl font-semibold">
                    NEXSTREAM
                </p> */}
        <p className="text-sm text-muted-foreground">
          {/* Let&apos;s Live */}
          Streaming Beyond Boundaries with 'NexStream'
        </p>
      </div>
    </div>
  );
};
