"use client";

import { signIn, signOut } from "@/utils/databasefunctions";
import { useData } from "@/providers/DataProvider";

import RegisterUser from "./RegisterUser";

import { links } from "@/data";

interface MainProps {
    isUserLinked: boolean;
    isUserRegistered: boolean;
}

const Main: React.FC<MainProps> = ({ isUserLinked, isUserRegistered }) => {
  const { user } = useData();

  if (isUserLinked && !isUserRegistered) {
    <RegisterUser />
  }

  return (
    <section className="
    w-[100vw] h-[100vh] 
    flex justify-center items-center
    bg-offwhite">
        <div className="
        max-w-[1000px] w-full
        px-4 py-8
        flex flex-col gap-y-4
        ">
            <div className="
            w-full h-[50px]
            flex justify-end 
            mb-12">
                {
                    (!isUserLinked && !isUserRegistered) && (
                        <button 
                        onClick={signIn}
                        className="
                        bg-header text-white font-semibold
                        rounded-lg
                        px-3 py-1">
                            Register & Log In
                        </button>
                    )
                }
                {
                    (isUserLinked && isUserRegistered) && (
                        <button
                        onClick={signOut}
                        className="w-[50px] h-full">
                            <img 
                            className="w-full h-full"
                            src={user?.photoURL} />
                        </button>
                    )
                }
            </div>
            <div className="
            flex items-center gap-x-6
            mb-6">
                <img 
                src="favicon.ico"
                className="w-[50px] bg-secondary p-1 rounded-full" />
                <h3 className="dynamic-subheading font-title text-header font-semibold">
                    The Chat App for Students, Me2
                </h3>
            </div>
            {links.map((link, index) => (
                <a 
                key={index}
                href={link.link}
                className="
                w-full
                px-6 py-4
                flex gap-x-6 items-center
                rounded-full
                border-2 border-black
                ">
                    <div className="dynamic-text">
                        {link.icon}
                    </div>
                    <p className="dynamic-text">
                        {link.label}
                    </p>
                </a>
            ))}
        </div>
    </section>
  )
}

export default Main