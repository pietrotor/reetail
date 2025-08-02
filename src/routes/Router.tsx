import { createBrowserRouter, Outlet } from "react-router";

import App from "./App";

import { AuthProvider } from "@/components/layouts/AuthProvider";
import { ErrorBoundary } from "@/components/layouts/ErrorBoundary";
import { Dashboard } from "@/modules/dashboard/Dashboard";
import { PaymentTerms } from "@/modules/payment-terms";
import { DistribucionPage } from "@/modules/payment-terms/routes/DistribucionPage";
import { ProductsPage } from "@/modules/payment-terms/routes/ProductsPage";

export const Router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <App />,
      },

      {
        path: "/dashboard",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/pedidos",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PaymentTerms />,
          },
        ],
      },
      {
        path: "/productos",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
        ],
      },
      {
        path: "/distribucion",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <DistribucionPage />,
          },
        ],
      },
    ],
  },
]);
