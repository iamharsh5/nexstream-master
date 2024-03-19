import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";


const font = Poppins({
    subsets: ["latin"],
    weight: ["200","300","400","500","600","700","800"],
});

export const Logo = () => {
    return (
        <>
        <Link href="/">
            <div className="flex flex-col  items-center gap-x-4 hover:opacity-75 transition">
                <div className="p1 mr-2 shrink-0 lg:mr-0 lg:shrink">
                    <Image src="./next-stream.svg" alt="nexstream" height="130" width="130"/>
                </div>
            </div>
        </Link>
        </>
    )
}