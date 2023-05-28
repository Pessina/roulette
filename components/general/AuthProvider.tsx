"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import { auth } from "../../firebase";
import Header from "../home/Header";
import { Loader } from "./Loader";

interface AuthContextInterface {
  user: any | null;
  isLoadingUser?: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoadingUser(false);
      setUser(user);
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {isLoadingUser ? (
        <Loader className="h-full w-full flex items-center justify-center" />
      ) : (
        <>
          {user && <Header />}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};
