import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import { useGetMeEndpointApiV1UsersMeGet } from "@/api";
import {
  useCurrentUserStore,
  useCurrentUserStoreActions,
} from "@/store/use-current-user";

export const AuthRoute = () => {
  const currentUser = useCurrentUserStore();
  const { setCurrentUser } = useCurrentUserStoreActions();

  const currentUserGet = useGetMeEndpointApiV1UsersMeGet({
    query: {
      enabled: false,
      retry: false,
    },
  });

  const isLoading = !currentUser.id && currentUserGet.isPending;

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser.id) {
        try {
          const { data } = await currentUserGet.refetch();
          if (data) {
            setCurrentUser({
              email: data.email,
              id: data.id,
              full_name: data.full_name || "",
              job_title: data.job_title || "",
              address: data.address || "",
              company_name: data.company_name || "",
              logo: data.logo || "",
              isClient: false,
            });
          }
        } catch (err) {
          // podría loguearse o manejar redirección si quieres hacerlo aquí
        }
      }
    };

    fetchUser();
  }, [currentUser.id, currentUserGet, setCurrentUser]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F5F4]">
        <Loader className="animate-spin w-12 h-12 ]" />
      </div>
    );
  }

  if (!currentUser.id) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
