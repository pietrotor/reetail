import { useCallback, useEffect } from "react";
import { useContext } from "react";

import { Header } from "./Header";
import { Products } from "./Products";
import Context from "../../components/context/plaid.contex";
import { QuickstartProvider } from "../../components/context/plaid.contex";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Plaid = () => {
  return (
    <QuickstartProvider>
      <PlaidBody />
    </QuickstartProvider>
  );
};

export const PlaidBody = () => {
  const { linkSuccess, dispatch } = useContext(Context);

  const generateUserToken = useCallback(async () => {
    const createUserTokenUrl = `${BASE_URL}/create_user_token`;
    console.log(createUserTokenUrl);
    const response = await fetch(createUserTokenUrl, {
      method: "POST",
    });
    if (!response.ok) {
      dispatch({ type: "SET_STATE", state: { userToken: null } });
      return;
    }
    const data = await response.json();
    if (data) {
      if (data.error != null) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkToken: null,
            linkTokenError: data.error,
          },
        });
        return;
      }
      dispatch({ type: "SET_STATE", state: { userToken: data.user_token } });
      return data.user_token;
    }
  }, [dispatch]);

  const generateToken = useCallback(
    async (isPaymentInitiation: boolean) => {
      // Link tokens for 'payment_initiation' use a different creation flow in your backend.
      const path = isPaymentInitiation
        ? "/plaid/create-link-token-for-payment"
        : "/plaid/create-link-token/";
      const createLinkTokenUrl = `${BASE_URL}${path}?client_user_id=test`;
      console.log(createLinkTokenUrl);
      const response = await fetch(createLinkTokenUrl, {
        method: "POST",
      });
      if (!response.ok) {
        dispatch({ type: "SET_STATE", state: { linkToken: null } });
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          dispatch({
            type: "SET_STATE",
            state: {
              linkToken: null,
              backend: true,
              linkTokenError: data.error,
            },
          });
          return;
        }
        dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
      }
      // Save the link_token to be used later in the Oauth flow.
      localStorage.setItem("link_token", data.link_token);
    },
    [dispatch]
  );

  useEffect(() => {
    const init = async () => {
      const paymentInitiation = false;

      generateToken(paymentInitiation);
    };
    init();
  }, [dispatch, generateToken, generateUserToken]);

  return (
    <div>
      <div>
        <Header />
        {linkSuccess && (
          <>
            <Products />
            {/* {!isPaymentInitiation && itemId && <Items />} */}
          </>
        )}
      </div>
    </div>
  );
};
