import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { Loader, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "sonner";

import SignUpHeader from "./components/sign-up-header";
import SignupLayout from "./components/sign-up-layout";
import { formSchema } from "./SignUpForm.form";
import { FormSchema } from "./SignUpForm.form";

import {
  useCreateUserEndpointApiV1UsersPost,
  useGetMeEndpointApiV1UsersMeGet,
  useUpdateUserEndpointApiV1UsersUserIdPut,
  useUploadFileEndpointApiV1FilesUploadPost,
} from "@/api";
import { useLogin } from "@/api/custom";
import { DropZone } from "@/components/common";
import { FormInput } from "@/components/common/FormInput";
import { FormSelectInput } from "@/components/common/FormSelectInput";
import { FormError } from "@/components/form-error";
import Input from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { fieldError } from "@/lib/get-field-error";
import {
  useCurrentUserStore,
  useCurrentUserStoreActions,
} from "@/store/use-current-user";

type JWT_Payload = {
  email: string;
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentUserId = searchParams.get("id");
  const token = searchParams.get("token");
  const email = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<JWT_Payload>(token);

      return decoded.email;
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }, [token]);

  const [openAddressForm, setOpenAddressForm] = useState<boolean>(false);
  const [step, setStep] = useState<"password" | "profile">("password");

  const passwordForm = useForm<{ password: string; confirmPassword: string }>({
    mode: "onTouched",
  });

  const { id } = useCurrentUserStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      jobTitle: "",
      companyName: "",
      address: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
      logo: undefined,
    },
  });

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

  const updateUserMutation = useUpdateUserEndpointApiV1UsersUserIdPut({
    mutation: {
      onSuccess: () => {
        toast.success("User reigster successfully");
        navigate("/dashboard");
      },
    },
  });
  const uploadFile = useUploadFileEndpointApiV1FilesUploadPost({
    mutation: {
      onError: (error) => {
        console.log("🚀 ~ SignatureForm ~ error:", error);
        toast.error("Error uploading file");
      },
    },
    request: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const onSubmit = (values: FormSchema) => {
    const data = {
      job_title: values.jobTitle,
      company_name: values.companyName,
      address: values.address || "",
      logo: values.logo,
    };

    const uplaodFile = values.logo
      ? (callback: (fileUrl: string | null) => void) =>
          uploadFile.mutate(
            {
              data: {
                file: values.logo as File,
              },
            },
            {
              onSuccess: (response: any) => {
                const { filename } = response;
                callback(filename);
              },
            }
          )
      : (callback: (fileUrl: string | null) => void) =>
          Promise.resolve().then(() => callback(null));

    uplaodFile((filename) => {
      updateUserMutation.mutate({
        data: {
          address: data.address,
          company_name: data.company_name,
          job_title: data.job_title,
          logo: filename,
          full_name: values.fullName,
        },
        userId: id,
      });
    });
  };

  const onSubmitPassword = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    mutate(
      {
        data: {
          password: values.password,
          email: email as string,
        },
        params: {
          verification_token: token as string,
        },
      },
      {
        onSuccess() {
          onFetch({
            body: {
              username: email as string,
              password: values.password,
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
              setStep("profile");
            },
          });
        },
      }
    );
  };

  const onFileUpload = (file: File | undefined) => {
    form.setValue("logo", file);
  };

  if (!currentUserId) {
    // return <Navigate to="/signup" />;
  }

  return (
    <SignupLayout className="flex flex-col justify-between h-full center px-1 gap-10">
      <SignUpHeader />
      {step === "password" ? (
        <>
          <div>
            <p className="text-xl font-medium mb-4 text-center">
              Welcome to Recurrent
            </p>
            <p className="text-lg text-center">
              Finish setting up your account
            </p>
          </div>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
            className="flex flex-col bg-white p-[25px] rounded-[16px] md:w-[349px] w-full justify-between gap-[34px] h-full"
          >
            <Controller
              control={passwordForm.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <div className="flex flex-col col-span-2">
                  <Input
                    label="Password"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                  <FormError
                    error={fieldError(
                      passwordForm.formState.errors,
                      "password"
                    )}
                  />
                </div>
              )}
            />
            <Controller
              control={passwordForm.control}
              name="confirmPassword"
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === passwordForm.getValues("password")
                    ? true
                    : "Passwords do not match",
              }}
              render={({ field }) => (
                <div className="flex flex-col col-span-2">
                  <Input
                    label="Repeat Password"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                  <FormError
                    error={fieldError(
                      passwordForm.formState.errors,
                      field.name
                    )}
                  />
                </div>
              )}
            />
            <Button type="submit" className="w-full" size={"lg"}>
              {isCreating || isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </>
      ) : (
        <></>
      )}
      {step === "profile" ? (
        <div className="flex flex-col bg-white p-[25px] rounded-[16px] md:w-[611px] w-full  justify-between gap-[34px] h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col py-[15px] gap-[25px]">
                <div className="grid grid-cols-2 w-full gap-[34px]">
                  <FormInput
                    form={form}
                    name="fullName"
                    label="Full name"
                    placeholder="Jonathan Smith"
                  />
                  <FormInput
                    form={form}
                    name="jobTitle"
                    label="Job title"
                    placeholder="Director"
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <FormInput
                    form={form}
                    name="companyName"
                    label="Company name"
                    placeholder="SmithIndustries"
                  />
                  {!openAddressForm && (
                    <button
                      className="self-start flex center gap-0.5"
                      onClick={() => setOpenAddressForm(true)}
                    >
                      <Plus width={14} height={14} />
                      Add address
                    </button>
                  )}

                  {openAddressForm && (
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex gap-[10px]">
                        <FormInput
                          form={form}
                          name="address"
                          label="Address"
                          placeholder="123 Street, Suite 1"
                          containerClassName="w-full"
                        />
                        <FormInput
                          form={form}
                          name="zipCode"
                          label="Zip Code"
                          placeholder="00000"
                          containerClassName="w-[131px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-[10px]">
                        <FormInput
                          form={form}
                          name="city"
                          label="City"
                          placeholder="San Francisco"
                        />
                        <FormSelectInput
                          form={form}
                          name="state"
                          label="State"
                          placeholder="Select"
                          options={[
                            {
                              label: "Alabama",
                              value: "AL",
                            },
                          ]}
                        />
                      </div>
                      <FormSelectInput
                        form={form}
                        name="country"
                        label="Country"
                        placeholder="Select"
                        options={[
                          {
                            label: "United States",
                            value: "US",
                          },
                        ]}
                      />
                    </div>
                  )}
                </div>
              </div>
              <p className="pb-2">
                Add logo <span className="text-black/50">(optional)</span>
              </p>
              <DropZone
                fileUploaded={form.watch("logo")}
                setFileUploaded={onFileUpload}
                className="md:w-[551px] w-full h-[165x] p-5"
                accept={{
                  "image/png": [],
                  "image/jpeg": [],
                  "image/jpg": [],
                }}
              />
              <div className="flex flex-col justify-end gap-[10px] pt-5">
                <Button
                  type="submit"
                  className="self-end confirm-button w-[174px]"
                >
                  {uploadFile.isPending || updateUserMutation.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <></>
      )}
    </SignupLayout>
  );
}
