import { Loader } from "lucide-react";
import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

import {
  useClientSignUpStore,
  useClientSignUpStoreActions,
} from "../ClientSignUp.store";

import { Button } from "@/components/ui";
import { useCurrentUserStore } from "@/store/use-current-user";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
  cta?: "plaid" | "finix";
  onClick?: (callback?: (d?: any) => void) => void;
  isLoading?: boolean;
};

export const Link = ({ cta = "plaid", onClick, isLoading }: Props) => {
  const [searchParams] = useSearchParams();
  const existsCurrentPayemntId = searchParams.get("payment_term_id");
  const { plaidState } = useClientSignUpStore();
  const { setPlaidState, setStep } = useClientSignUpStoreActions();
  const { id } = useCurrentUserStore();
  const navigate = useNavigate();

  const { linkToken, isPaymentInitiation, isCraProductsExclusively } =
    plaidState;

  const onSuccess = React.useCallback(
    (_: string, metadata: any) => {
      // If the access_token is needed, send public_token to server
      const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/integrations/plaid`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              integration_data: metadata,
              type: "plaid",
              user_id: id || "",
            }),
          }
        );
        if (!response.ok) {
          setPlaidState({
            itemId: `no item_id retrieved`,
            accessToken: `no access_token retrieved`,
            isItemAccess: false,
          });
          return;
        }
        const data = await response.json();
        setPlaidState({
          itemId: data.item_id,
          accessToken: data.access_token,
          isItemAccess: true,
        });
      };

      // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
      if (isPaymentInitiation) {
        setPlaidState({ isItemAccess: false });
      } else if (isCraProductsExclusively) {
        // When only CRA products are enabled, only user_token is needed. access_token/public_token exchange is not needed.
        setPlaidState({ isItemAccess: false });
      } else {
        exchangePublicTokenForAccessToken();
      }

      setPlaidState({ linkSuccess: true });
      if (existsCurrentPayemntId) setStep("signature");
      else {
        toast.success("User reigster successfully");
        navigate("/dashboard");
      }
    },
    [isCraProductsExclusively, isPaymentInitiation, setPlaidState]
  );

  // let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    // isOauth = true;
  }

  const { open } = usePlaidLink(config);

  const handleOnClick = () => {
    console.log("Link button clicked", cta);
    if (cta === "plaid") {
      open();
      return;
    } else if (cta === "finix") {
      console.log("called onClick:", onClick);
      onClick?.();
      // We cannot call finix logic from here directly ase the component would be dismounted
      // and the Finix form would not be available., we shall refactor this later
      // for now we would call Backend API from FinixNotice component
    }
  };

  return (
    <Button
      type="button"
      onClick={handleOnClick}
      disabled={isLoading}
      className="min-w-[174px]"
    >
      {isLoading ? (
        <Loader className="animate-spin h-4 w-4 mx-auto" />
      ) : (
        "Continue"
      )}
    </Button>
  );
};
