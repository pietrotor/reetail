import { Trash2Icon } from "lucide-react";
import { useMemo } from "react";

import {
  useGetCreditCardAccountsEndpointApiV1IntegrationsCreditCardAccountsGet,
  useGetPlaidAccountsEndpointApiV1IntegrationsPlaidAccountsGet,
} from "@/api";
import { EditIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { Card, CardFooter } from "@/components/ui/card";

interface ICreditCardData {
  id: string;
  currency: string;
  expiration_month: number;
  expiration_year: number;
  last_four: string;
  issuer: string; // e.g: Visa
}

interface IPlaidIntegration {
  id: string;
  balance: number;
  currency: string;
  mask: string;
  name: string;
  type: string;
  subtype: string;
}

export const UserIntegrations = () => {
  const { data } =
    useGetCreditCardAccountsEndpointApiV1IntegrationsCreditCardAccountsGet();

  const { data: plaid } =
    useGetPlaidAccountsEndpointApiV1IntegrationsPlaidAccountsGet();

  const creditCards = useMemo(() => data as ICreditCardData[], [data]);
  const plaidAccounts = useMemo(() => plaid as IPlaidIntegration[], [plaid]);

  return (
    <div className="flex flex-col gap-4 mt-5">
      <h2 className="font-medium text-xl">Linked accounts</h2>
      {!data && !plaid && (
        <p className="font-normal text-gray-500 text-base">
          No accounts linked
        </p>
      )}
      <div className="flex gap-4 flex-wrap">
        {Boolean(data) && (
          <>
            {creditCards.map((creditCard) => (
              <Card
                className="min-w-[310px] max-w-fit gap-10 p-4 shadow-xl"
                key={creditCard.id}
              >
                <CardFooter className="flex flex-col gap-2 items-start">
                  <p className="font-medium w-fit text-left">
                    Credit Card{" "}
                    <span className="text-black/40 font-semibold">
                      ({creditCard.issuer})
                    </span>
                  </p>
                  <div className="flex justify-between w-full items-end">
                    <p className="text-black/40 font-semibold">
                      {creditCard.last_four}
                    </p>
                    <div className="flex gap-1">
                      <Button variant={"secondary"}>
                        <EditIcon className="!fill-black" />
                        Edit
                      </Button>
                      <Button variant={"secondary"} disabled>
                        <Trash2Icon />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </>
        )}

        {Boolean(plaid) && (
          <>
            {plaidAccounts.map((plaid) => (
              <Card
                className="min-w-[310px] max-w-fit gap-10 p-4 shadow-xl"
                key={plaid.id}
              >
                <CardFooter className="flex flex-col gap-2 items-start">
                  <p className="font-medium w-fit text-left">{plaid.name}</p>
                  <div className="flex justify-between w-full items-end">
                    <p className="text-black/40 font-semibold">{plaid.mask}</p>
                    <div className="flex gap-1">
                      <Button variant={"secondary"}>
                        <EditIcon className="!fill-black" />
                        Edit
                      </Button>
                      <Button variant={"secondary"} disabled>
                        <Trash2Icon />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
