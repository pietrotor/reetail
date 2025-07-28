import { jwtDecode } from "jwt-decode";
import { Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { useClientSignUpStore } from "./ClientSignUp.store";
import ChooseAch from "./components/choose-ach";
import { FinixNotice } from "./components/FinixNotice";
import FlowStepper from "./components/flow-stepper";
import { PlaidNotice } from "./components/PlaidNotice";
import { ProfileForm } from "./components/ProfileForm";
import SignatureForm from "./components/SignatureForm";
import { Success } from "./components/Success";
import { useClientSignUpForm } from "./hooks";
import SignupLayout from "../sign-up/components/sign-up-layout";
import { SignUpForm } from "../sign-up/components/SignUpForm";

import {
  PaymentMethod,
  useGetMeEndpointApiV1UsersMeGet,
  useGetPaymentTermEndpointApiV1PaymentTermsPaymentTermIdGet,
} from "@/api";
import conduitCommerceLogo from "@/assets/images/conduitCommerceLogo.png";
import {
  useCurrentUserStore,
  useCurrentUserStoreActions,
} from "@/store/use-current-user";

export const ClientSignUp = () => {
  const step = useClientSignUpStore((state) => state.step);
  const setStep = useClientSignUpStore((state) => state.actions.setStep);
  const [searchParams] = useSearchParams();
  const paymentId = sessionStorage.getItem("payment_term_id");
  const verificationToken = searchParams.get("token");
  const email = useMemo(() => {
    if (!verificationToken) return "";
    try {
      const decoded = jwtDecode<{ email: string }>(verificationToken);
      return decoded.email;
    } catch (err) {
      console.error("Token inválido:", err);
      return "";
    }
  }, [verificationToken]);
  const [isLoadingCurrentUser, setIsLoadingCurrentUser] = useState(true);
  const { data, isPending } =
    useGetPaymentTermEndpointApiV1PaymentTermsPaymentTermIdGet(paymentId || "");

  const currentUserGet = useGetMeEndpointApiV1UsersMeGet({
    query: {
      enabled: false,
      retry: false,
    },
  });

  const { setCurrentUser } = useCurrentUserStoreActions();
  const { id } = useCurrentUserStore();

  const { form } = useClientSignUpForm({
    data: data
      ? {
          full_name: data?.name,
          company_name: data?.company_name,
          job_title: data?.job_title,
          email: email,
          paymentMethod: data?.payment_method,
        }
      : null,
  });

  const selectedPaymentMethod = useMemo(() => {
    if (data?.payment_method == PaymentMethod.Client_choose) {
      return form.watch("paymentMethod");
    }
    return data?.payment_method || form.watch("paymentMethod");
  }, [data?.payment_method, form.watch("paymentMethod"), data, email]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await currentUserGet.refetch();
      if (data && email) {
        setCurrentUser({
          email: email,
          id: data.id,
          full_name: data.full_name || "",
          job_title: data.job_title || "",
          address: data.address || "",
          company_name: data.company_name || "",
          logo: data.logo || "",
          isClient: true,
        });
        setIsLoadingCurrentUser(false);
      }
    };
    if (localStorage.getItem("token")) {
      getUser();
    } else setIsLoadingCurrentUser(false);
  }, [email]);

  useEffect(() => {
    if (form.watch("paymentMethod")) {
      if (form.watch("paymentMethod") === "Client choose") {
        setStep("payment-preference");
      } else if (id) {
        setStep("consent");
      }
    }
  }, [form.watch("paymentMethod"), setStep, id]);

  if (!verificationToken) {
    return (
      <SignupLayout className="flex flex-col center">
        <SignUpForm />
      </SignupLayout>
    );
  }

  if ((isPending && paymentId) || isLoadingCurrentUser) {
    return (
      <SignupLayout className="flex flex-col center">
        <Loader className="animate-spin" />
      </SignupLayout>
    );
  }

  return (
    <SignupLayout className="flex flex-col center">
      <img src={conduitCommerceLogo} className=" max-w-[140px]" />
      <div className="flex flex-col gap-[50px]">
        <FlowStepper
          isPaymentMethodSelected={
            data ? data.payment_method !== PaymentMethod.Client_choose : true
          }
        />
        {step === "payment-preference" && (
          <ChooseAch form={form} isUserLoggedIn={!!id} />
        )}
        {step === "profile" && (
          <ProfileForm
            form={form}
            paymentTermId={paymentId!}
            verificationToken={verificationToken}
            paymentTerm={data}
          />
        )}
        {step === "consent" && selectedPaymentMethod == PaymentMethod.ACH && (
          <PlaidNotice />
        )}
        {step === "consent" &&
          selectedPaymentMethod == PaymentMethod.Credit_Card && <FinixNotice />}
        {step === "signature" && (
          <SignatureForm
            paymentTerm={data}
            updatedPaymentMethod={
              data
                ? data.payment_method === PaymentMethod.Client_choose
                  ? form.getValues("paymentMethod")!
                  : undefined
                : undefined
            }
          />
        )}
        {step === "success" && <Success />}
      </div>
    </SignupLayout>
  );
};
