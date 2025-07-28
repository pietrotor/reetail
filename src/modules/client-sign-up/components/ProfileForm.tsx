import { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { SignUpFormContainer } from "./sign-up-form-container";
import { ClientSignUpForm } from "../types";

import {
  PaymentTermRead,
  useCreateUserEndpointApiV1UsersPost,
  useGetMeEndpointApiV1UsersMeGet,
} from "@/api";
import { useLogin } from "@/api/custom";
import { FormError } from "@/components/form-error";
import FormInput from "@/components/form-input";
import { fieldError } from "@/lib/get-field-error";
import { useCurrentUserStoreActions } from "@/store/use-current-user";

type ProfileFormProps = {
  form: UseFormReturn<ClientSignUpForm>;
  paymentTermId: string;
  verificationToken: string;
  paymentTerm: PaymentTermRead | undefined;
};

export const ProfileForm = ({
  form,
  verificationToken,
  paymentTerm,
}: ProfileFormProps) => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
    }
  }, [email, form]);

  const { mutate, isPending: isCreating } = useCreateUserEndpointApiV1UsersPost(
    {
      mutation: {
        onError(error) {
          toast.error(String(error) || "Error creating user");
        },
      },
    }
  );

  const { onFetch, isLoading } = useLogin();

  const currentUser = useGetMeEndpointApiV1UsersMeGet({
    query: {
      enabled: false,
    },
  });

  const { setCurrentUser } = useCurrentUserStoreActions();

  const { control, handleSubmit } = form;

  const onSubmit = async (data: ClientSignUpForm, callback: () => void) => {
    mutate(
      {
        params: {
          verification_token: verificationToken,
        },
        data: {
          email: data.email,
          full_name: data.full_name,
          password: data.password,
          address: data.address,
          company_name: data.company_name,
          job_title: data.job_title,
        },
      },
      {
        onSuccess: () => {
          onFetch({
            body: {
              username: data.email,
              password: data.password,
            },
            onSuccess: async () => {
              const { data } = await currentUser.refetch();
              if (data) {
                setCurrentUser({
                  email: data.email,
                  id: data.id,
                  full_name: data.full_name || "",
                  job_title: data.job_title || "",
                  address: data.address || "",
                  company_name: data.company_name || "",
                  logo: data.logo || "",
                  isClient: true,
                });
              }
              callback();
            },
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-[15px] w-[611px]">
      {paymentTerm && (
        <div className="flex bg-white rounded-[16px] justify-between p-[25px]">
          {[
            {
              label: "Amount",
              value: paymentTerm?.payment_amount + "$",
            },
            {
              label: "Frequency",
              value: paymentTerm?.payment_frequency,
            },
          ].map(({ label, value }, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm opacity-50">{label}</label>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
      <SignUpFormContainer
        className="overflow-y-auto justify-between p-[25px]"
        onValidStep={(callback) => {
          handleSubmit((data) => onSubmit(data, callback))();
        }}
        isLoading={isLoading || isCreating || currentUser.isFetching}
      >
        <div className="grid grid-cols-2 py-[15px] gap-y-[34px] gap-x-[15px]">
          <Controller
            name="full_name"
            control={control}
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <div className="flex flex-col col-span-2">
                <FormInput
                  label="Full name"
                  placeholder="Jonathan Smith"
                  {...field}
                />
                <FormError
                  error={fieldError(form.formState.errors, "full_name")}
                />
              </div>
            )}
          />

          {[
            {
              name: "email",
              label: "Email",
              placeholder: "jonathan@smith.com",
              type: "email",
              disabeld: !!email,
              rules: {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              },
            },
            {
              name: "password",
              label: "Password",
              placeholder: "********",
              type: "password",
              rules: {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              },
            },
            {
              name: "address",
              label: "Address",
              placeholder: "123 Main St",
              rules: {
                required: "Address is required",
              },
            },
            {
              name: "company_name",
              label: "Company name",
              placeholder: "SmithIndustries",
              rules: {
                required: "Company name is required",
              },
            },
            {
              name: "ein",
              label: "EIN",
              placeholder: "000000000",
              rules: {
                required: "EIN is required",
              },
            },
          ].map((item, i) => (
            <Controller
              control={control}
              name={item.name as keyof ClientSignUpForm}
              key={i}
              rules={{
                ...item.rules,
              }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormInput
                    label={item.label}
                    placeholder={item.placeholder}
                    type={item.type}
                    disabled={item.disabeld}
                    {...(field as any)}
                  />
                  <FormError
                    error={fieldError(form.formState.errors, item.name)}
                  />
                </div>
              )}
            />
          ))}
        </div>
      </SignUpFormContainer>
    </div>
  );
};
