import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { routes } from "@/constants/routes";
import { AuthContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const { user, isLoadingUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.push(routes.LOGIN);
    }
  }, [isLoadingUser, user, router]);
};
