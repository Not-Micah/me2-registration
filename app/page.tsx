"use client";

import Main from "./components/Main";
import RegisterUser from "./components/RegisterUser";
import Loader from "./components/Loader";

// Library Imports
import { useState, useEffect } from "react";

// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { checkUser } from "@/utils/utilfunctions";


const Home = () => {
  const [isUserLinked, setIsUserLinked] = useState<boolean | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(
    null
  );

  const { user, users } = useData();

  useEffect(() => {
    const registerStatus = checkUser(user?.uid, users);

    if (user !== undefined && users !== undefined) {
      setIsUserRegistered(registerStatus);
      setIsUserLinked(Boolean(user));
    } else if (user === null) {
      setIsUserRegistered(false);
      setIsUserLinked(false);
    }
  }, [user, users]);

  if (isUserLinked === null || isUserRegistered === null) {
    return <Loader />;
  }
  
  return (
    <main
    className="
    bg-offwhite py-16
    overflow-y-scroll no-scrollbar">
      <Main isUserLinked={isUserLinked} isUserRegistered={isUserRegistered} />
    </main>
  );
};

export default Home;
