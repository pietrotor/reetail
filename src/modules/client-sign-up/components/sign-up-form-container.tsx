import { ChevronLeft, Loader } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useCallback } from "react";

import {
  useClientSignUpStore,
  useClientSignUpStoreActions,
} from "../ClientSignUp.store";
import { Link } from "./Link";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onValidStep: (callback: () => void) => void;
  isDisabledSubmit?: boolean;
  cta?: "plaid" | "finix";
};
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const SignUpFormContainer = ({
  className,
  children,
  isLoading,
  isDisabledSubmit,
  onValidStep,
  cta = "plaid",
}: Props) => {
  const step = useClientSignUpStore((state) => state.step);
  const setStep = useClientSignUpStore((state) => state.actions.setStep);
  const { setPlaidState } = useClientSignUpStoreActions();

  const showBackButton = useMemo(
    () => step === "payment-preference" || step === "profile",
    [step]
  );

  const generateUserToken = useCallback(async () => {
    const createUserTokenUrl = `${BASE_URL}/create_user_token`;
    const response = await fetch(createUserTokenUrl, {
      method: "POST",
    });
    if (!response.ok) {
      setPlaidState({ userToken: null });
      return;
    }
    const data = await response.json();
    if (data) {
      if (data.error != null) {
        setPlaidState({
          linkToken: null,
          linkTokenError: data.error,
        });
        return;
      }
      setPlaidState({ userToken: data.user_token });
      return data.user_token;
    }
  }, [setPlaidState]);

  const generateToken = useCallback(
    async (isPaymentInitiation: boolean) => {
      // Link tokens for 'payment_initiation' use a different creation flow in your backend.
      const path = isPaymentInitiation
        ? "/plaid/create-link-token-for-payment"
        : "/api/v1/integrations/plaid/token";
      const createLinkTokenUrl = `${BASE_URL}${path}`;
      console.log(createLinkTokenUrl);
      const response = await fetch(createLinkTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        setPlaidState({ linkToken: null });
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          setPlaidState({
            linkToken: null,

            backend: true,
            linkTokenError: data.error,
          });
          return;
        }
        setPlaidState({ linkToken: data.link_token });
      }
      // Save the link_token to be used later in the Oauth flow.
      localStorage.setItem("link_token", data.link_token);
    },
    [setPlaidState]
  );

  useEffect(() => {
    const init = async () => {
      const paymentInitiation = false;

      generateToken(paymentInitiation);
    };
    init();
  }, [generateToken, generateUserToken]);

  const onContinue = () => {
    if (step === "profile") {
      setStep("consent");
    }
    if (step === "consent") {
      setStep("plaid");
    }
    if (step === "plaid") {
      setStep("signature");
    }
    if (step === "consent") {
      setStep("signature");
    }
  };

  const onGoBack = () => {
    if (step === "profile") {
      setStep("payment-preference");
    }
    if (step === "consent") {
      setStep("profile");
    }
    if (step === "plaid") {
      setStep("consent");
    }
    if (step === "signature") {
      setStep("plaid");
    }
    if (step === "consent") {
      setStep("signature");
    }
  };

  const onSubmit = () => {
    onValidStep(onContinue);
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-[16px] w-[611px] ${className}`}
    >
      {children}
      <div
        className={cn(
          "flex w-full items-center",
          showBackButton ? "justify-between" : "justify-end"
        )}
      >
        {showBackButton && (
          <button
            className="flex bg-[#F7F5F4] w-[174px] justify-center items-center rounded-[7px] py-2 px-[17px] gap-[3px]"
            onClick={onGoBack}
          >
            <ChevronLeft strokeWidth={1.2} size={22} /> Go back
          </button>
        )}
        {step === "consent" ? (
          <Link cta={cta} onClick={onSubmit} isLoading={isLoading} />
        ) : (
          <button
            className="confirm-button w-[174px] disabled:pointer-events-none disabled:opacity-50"
            onClick={onSubmit}
            disabled={isLoading || isDisabledSubmit}
          >
            {isLoading ? (
              <Loader className="animate-spin h-4 w-4 mx-auto" />
            ) : (
              "Continue"
            )}
          </button>
        )}
      </div>
    </div>
  );
};
