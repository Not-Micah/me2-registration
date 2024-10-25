"use client";

import { signIn, signOut } from "@/utils/databasefunctions";
import { useData } from "@/providers/DataProvider";

import RegisterUser from "./RegisterUser";
import ToolTip from "./ToolTip";
import { links } from "@/data";

import { twMerge } from "tailwind-merge";
import { IoEnter, IoExit } from "react-icons/io5";
import { useRouter } from "next/navigation";


interface MainProps {
    isUserLinked: boolean;
    isUserRegistered: boolean;
}

const buttonBase = `
w-[40px] h-[40px] 
flex justify-center items-center 
rounded-full
group relative`;
const buttonIcon = `bg-header text-white p-1`;

const Main: React.FC<MainProps> = ({ isUserLinked, isUserRegistered }) => {
  const { user, users } = useData();
  const router = useRouter();

    console.log(isUserLinked, isUserRegistered)

  if (isUserLinked && !isUserRegistered) {
    return (
        <RegisterUser />    
    )
  }

  return (
    <section className="
    w-[100vw] h-[100vh] 
    flex justify-center items-center">
        <div className="
        max-w-[1000px] w-full
        px-4 py-8
        flex flex-col gap-y-4
        ">
            <div className="
            w-full
            flex justify-end gap-x-4
            mb-16">
                {
                    (!isUserLinked && !isUserRegistered) && (
                        <button 
                        onClick={signIn}
                        className={twMerge(buttonBase, buttonIcon)}
                        >
                            <ToolTip className="hidden group-hover:inline-block" 
                            tips={["Join Waitlist"]} />
                            <IoEnter size={22.5} />
                        </button>
                    )
                }
                {
                    (isUserLinked && isUserRegistered) && (
                        <>
                            <button 
                            onClick={signOut}
                            className={twMerge(buttonBase, buttonIcon)}
                            >
                                <ToolTip className="hidden group-hover:inline-block" 
                                tips={["Sign Out"]} />
                                <IoExit size={22.5} />
                            </button>
                            <button 
                            onClick={() => {
                                router.replace("./settings")
                            }}
                            className={twMerge(buttonBase)}
                            >
                                <ToolTip className="hidden group-hover:inline-block" 
                                tips={["Edit Profile"]} />
                                <img src={user?.photoURL}
                                className="w-full h-full rounded-full" />
                            </button>
                        </>
                    )
                }
            </div>
            <div className="
            flex gap-x-6
            mb-6
            max-[650px]:flex-col max-[650px]:gap-y-5">
                <img 
                src="favicon.ico"
                className="w-[50px] h-[50px]" />
                <div className="">
                    <h3 className="dynamic-subheading font-title text-header font-semibold">
                        The Chat App for Students, Me2
                    </h3>
                    <p
                    className="
                    dynamic-text text-black/70">
                        {users?.length}/1000 users until release!
                    </p>
                </div>
            </div>
            {links.map((link, index) => (
                <a 
                key={index}
                href={link.link}
                className={`
                w-full
                px-6 py-4
                flex gap-x-6 items-center
                rounded-full
                border-[1px] border-black
                ${link.locked && 'opacity-50'}
                `}>
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