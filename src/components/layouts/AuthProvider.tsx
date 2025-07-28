import { useState } from "react";
import { Outlet, useLocation } from "react-router";

import { AuthContextType } from "@/hooks/useAuthContext";
import { authContext } from "@/hooks/useAuthContext";

const PUBLIC_ROUTES = ["/", "/signup", "/signup/client-form", "/signup/form"];

export const AuthProvider = () => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const location = useLocation();
  if (!user && !PUBLIC_ROUTES.includes(location.pathname)) {
    // return <Navigate to="/signup" />;
  }
  return (
    <authContext.Provider value={{ user, setUser }}>
      <Outlet />
    </authContext.Provider>
  );
};
