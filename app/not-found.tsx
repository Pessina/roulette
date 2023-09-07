"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader } from "@/components/Loader";
import { routes } from "@/constants/routes";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.LOGIN);
  }, [router]);

  return <Loader className="h-full w-full flex justify-center items-center" />;
};

export default NotFound;
