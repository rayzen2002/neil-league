import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import { Crown, Gamepad2, Skull, Swords } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NEIL",
  description: "Neil Inhouse League",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-blitz-100 font-sans text-gray-100`}
      >
        <main className="bg-zinc-900">
          <Header />
          <div className="grid min-h-screen grid-cols-8">
            {/* Sidebar */}
            <div className="just col-span-1 flex flex-col  bg-blitz-100 ">
              <div className="gap- flex flex-col items-start justify-start gap-3 px-9 py-16 font-alt  text-lg">
                <div className="flex w-full  gap-6 hover:bg-orange-500">
                  <Gamepad2 />
                  <a href="/jogos" className=" ">
                    Jogos
                  </a>
                </div>
                <div className="flex w-full  gap-6 hover:bg-orange-500">
                  <Crown />
                  <a href="/leaderboard" className=" ">
                    Leaderboard
                  </a>
                </div>
                <div className="flex w-full  gap-6 hover:bg-orange-500">
                  <Skull />
                  <a href="/jogadores" className=" ">
                    Jogadores
                  </a>
                </div>
                <div className="flex w-full  gap-6 hover:bg-orange-500">
                  <Swords />
                  <a href="/arena" className=" ">
                    Arena
                  </a>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="col-span-7 mr-6 rounded-2xl bg-blitz-200 px-16">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
