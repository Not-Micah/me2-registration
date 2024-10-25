"use client";

import Main from "./components/Main";
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
      <Main isUserLinked={isUserLinked} isUserRegistered={isUserRegistered} />
  );
};

export default Home;
