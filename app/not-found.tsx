"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { Loader } from "@/components/Loader";
import { routes } from "@/constants/routes";
import { AuthContext } from "@/providers/AuthProvider";

const NotFound = () => {
  const router = useRouter();
  const { user, isLoadingUser } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoadingUser) {
      if (user) {
        router.push(routes.ROULETTE);
      } else {
        router.push(routes.LOGIN);
      }
    }
  }, [isLoadingUser, router, user]);

  return <Loader className="h-full w-full flex justify-center items-center" />;
};

export default NotFound;
