"use client";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import Header from "../components/Header";
import { Loader } from "../components/Loader";
import { auth } from "../firebase";

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
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoadingUser(false);
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {isLoadingUser ? (
        <Loader className="h-full w-full flex items-center justify-center" />
      ) : (
        <>
          {!!user && <Header className="shrink-0 sticky top-0" />}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};
