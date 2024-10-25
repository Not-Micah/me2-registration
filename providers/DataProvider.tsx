"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import { initializeFirebase, getUserAuth } from "@/utils/databasefunctions";
import { getUsers } from "@/utils/userfunctions";

import { Auth, User } from "firebase/auth";

type DataContextType = {
  user: null | undefined | DocumentData;
  users: null | undefined | DocumentData[];
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export interface Props {
  [propNames: string]: any;
}

export const DataContextProvider = (props: Props) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  const getUserHook = (auth: Auth) => {
    const [user, setUser] = useState<User | undefined | null>(undefined); // Initialize with undefined

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, [auth]);

    return [user];
  };

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  const getUsersHook = () => {
    const [users, setUsers] = useState<DocumentData[] | undefined>(undefined); // Initialize with undefined

    useEffect(() => {
      const unsubscribe = getUsers(setUsers);
      return () => unsubscribe();
    }, []);

    return [users];
  };

////////////////////////////////////////////
  ////////////////////////////////////////////

  const [users] = getUsersHook();
  const [user] = getUserHook(auth);


  const value = {
    user,
    users
  };

  return <DataContext.Provider value={value} {...props} />;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
};
