import { createBrowserRouter, Outlet } from "react-router";

import App from "./App";

import { AuthRoute } from "@/components/auth";
import { AuthProvider } from "@/components/layouts/AuthProvider";
import { ErrorBoundary } from "@/components/layouts/ErrorBoundary";
import { ClientSignUp } from "@/modules/client-sign-up/ClientSignUp";
import { Success } from "@/modules/client-sign-up/components/Success";
import { Dashboard } from "@/modules/dashboard/Dashboard";
import { PaymentDetail } from "@/modules/payment-detail";
import { PaymentTerms } from "@/modules/payment-terms";
import { Plaid } from "@/modules/plaid/Plaid";
import { SettingsPage } from "@/modules/settings/routes/SettingsPage";
import Signup from "@/modules/sign-up/Signup";
import SignUpForm from "@/modules/sign-up/SignUpForm";
import VerifyEmailPage from "@/modules/sign-up/VerifyEmailPage";
import { SignIn } from "@/modules/signIn/SignIn";
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
        path: "/payment",
        children: [
          {
            path: ":paymentId",
            element: <PaymentDetail />,
          },
        ],
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
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signup/form",
        element: <SignUpForm />,
      },
      {
        path: "/signup/client-form",
        element: <ClientSignUp />,
      },
      {
        path: "/signup/client-form/success",
        element: <Success />,
      },
      {
        path: "/signup/verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "/plaid",
        element: <Plaid />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);
