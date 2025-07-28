import { useContext } from "react";
import { Link as LinkComponent } from "react-router";

import { Link } from "./Link";
import Context from "../../components/context/plaid.contex";

import { Button } from "@/components/ui";

export const Header = () => {
  const {
    itemId,
    accessToken,
    userToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
    isPaymentInitiation,
  } = useContext(Context);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-2xl font-bold">Plaid Quickstart</h3>

      {!linkSuccess ? (
        <>
          <h4 className="text-lg">
            A sample end-to-end integration with Plaid
          </h4>
          <p className="text-sm">
            The Plaid flow begins when your user wants to connect their bank
            account to your app. Simulate this by clicking the button below to
            launch Link - the client-side component that your users will
            interact with in order to link their accounts to Plaid and allow you
            to access their accounts via the Plaid API.
          </p>
          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <section className="text-sm">
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your{" "}
              <code className="text-sm">PLAID_CLIENT_ID</code> and{" "}
              <code className="text-sm">PLAID_SECRET</code>.
            </section>
          ) : /* message if backend is running and there is no link token */
          linkToken == null && backend ? (
            <section className="text-sm">
              <div>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured
                correctly.
              </div>
              <div className="text-sm">
                If you are on a Windows machine, please ensure that you have
                cloned the repo with{" "}
                <LinkComponent to="https://github.com/plaid/quickstart#special-instructions-for-windows">
                  symlinks turned on.
                </LinkComponent>{" "}
                You can also try checking your{" "}
                <LinkComponent to="https://dashboard.plaid.com/activity/logs">
                  activity log
                </LinkComponent>{" "}
                on your Plaid dashboard.
              </div>
              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{" "}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </section>
          ) : linkToken === "" ? (
            <div>
              <Button disabled>Loading...</Button>
            </div>
          ) : (
            <div>
              <Link />
            </div>
          )}
        </>
      ) : (
        <>
          {isPaymentInitiation ? (
            <>
              <h4>
                Congrats! Your payment is now confirmed.
                <p />
                <section>
                  You can see information of all your payments in the{" "}
                  <LinkComponent to="https://dashboard.plaid.com/activity/payments">
                    Payments Dashboard
                  </LinkComponent>
                  .
                </section>
              </h4>
              <p>
                Now that the 'payment_id' stored in your server, you can use it
                to access the payment information:
              </p>
            </>
          ) : (
            /* If not using the payment_initiation product, show the item_id and access_token information */ <>
              {isItemAccess ? (
                <h4>
                  Congrats! By linking an account, you have created an{" "}
                  <LinkComponent to="http://plaid.com/docs/quickstart/glossary/#item">
                    Item
                  </LinkComponent>
                  .
                </h4>
              ) : userToken ? (
                <h4>Congrats! You have successfully linked data to a User.</h4>
              ) : (
                <h4>
                  <section>
                    Unable to create an item. Please check your backend server
                  </section>
                </h4>
              )}
              <div>
                {itemId && (
                  <p>
                    <span>item_id</span>
                    <span>{itemId}</span>
                  </p>
                )}

                {accessToken && (
                  <p>
                    <span>access_token</span>
                    <span>{accessToken}</span>
                  </p>
                )}

                {userToken && (
                  <p>
                    <span>user_token</span>
                    <span>{userToken}</span>
                  </p>
                )}
              </div>
              {(isItemAccess || userToken) && (
                <p>
                  Now that you have {accessToken && "an access_token"}
                  {accessToken && userToken && " and "}
                  {userToken && "a user_token"}, you can make all of the
                  following requests:
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
