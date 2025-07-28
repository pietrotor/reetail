import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { SignUpFormContainer } from "./sign-up-form-container";

import {
  PaymentMethod,
  PaymentTermRead,
  useUpdatePaymentTermClientEndpointApiV1PaymentTermsPaymentTermIdClientPut,
  useUploadFileEndpointApiV1FilesUploadPost,
} from "@/api";
import { DatePicker, SignaturePad } from "@/components/common";
import FormInput from "@/components/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { dataURLtoFile } from "@/utils/dateToFile";

type SignatureFormProps = {
  paymentTerm: PaymentTermRead | undefined;
  updatedPaymentMethod: PaymentMethod | undefined;
};

type FormValues = {
  full_name: string;
  first_payment_date: any;
  signature: File;
};

export default function SignatureForm({
  paymentTerm,
  updatedPaymentMethod,
}: SignatureFormProps) {
  const navigate = useNavigate();
  const { control, reset, handleSubmit } = useForm<FormValues>();
  const [isConsent, setIsConsent] = useState(false);

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

  const updatePaymentTerm =
    useUpdatePaymentTermClientEndpointApiV1PaymentTermsPaymentTermIdClientPut({
      mutation: {
        onError: () => {
          toast.error("Error updating payment term");
        },
      },
    });

  useEffect(() => {
    if (paymentTerm) {
      reset({
        full_name: paymentTerm?.name,
        first_payment_date: paymentTerm?.first_payment_date,
      });
    }
  }, [paymentTerm]);

  const onSubmit = (values: FormValues, callback: () => void) => {
    if (!values.signature) {
      return;
    }
    uploadFile.mutateAsync(
      {
        data: {
          file: values.signature,
        },
      },
      {
        onSuccess(data: any) {
          const { filename } = data;
          updatePaymentTerm.mutateAsync(
            {
              data: {
                name: values.full_name,
                client_signature: filename,
                sign: true,
                ...(updatedPaymentMethod && {
                  payment_method: updatedPaymentMethod,
                }),
              },
              paymentTermId: paymentTerm?.id as any,
            },
            {
              onSuccess: () => {
                sessionStorage.removeItem("payment_term_id");
                toast.success("User reigster successfully");
                navigate("/signup/client-form/success");
                callback();
              },
            }
          );
        },
      }
    );
  };

  return (
    <SignUpFormContainer
      className="justify-between p-[25px] gap-[34px]"
      onValidStep={(callback) => {
        handleSubmit((data) => onSubmit(data, callback))();
      }}
      isLoading={uploadFile.isPending || updatePaymentTerm.isPending}
      isDisabledSubmit={!isConsent}
    >
      <div className="flex flex-col py-[15px] gap-[25px] text-sm">
        <Controller
          control={control}
          name="full_name"
          render={({ field }) => (
            <FormInput
              label="Full name"
              placeholder="Jonathan Smith"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="first_payment_date"
          render={({ field }) => (
            <DatePicker
              label="Agreement Date"
              {...field}
              value={new Date()}
              className="w-full"
              disabled
            />
          )}
        />
        <Controller
          control={control}
          name="first_payment_date"
          render={({ field }) => (
            <DatePicker
              label="First paymentDate"
              {...field}
              value={new Date()}
              disabled
            />
          )}
        />
        <div className="flex flex-col gap-[10px]">
          <span className="">Signature</span>
          <Controller
            control={control}
            name="signature"
            render={({ field: { onChange } }) => (
              <SignaturePad
                onSave={(signature) => {
                  onChange(dataURLtoFile(signature, "signature.png"));
                }}
              />
            )}
          />
        </div>
        <div className="flex items-center text-sm gap-[5px]">
          <Checkbox
            className="border-black"
            onCheckedChange={() => setIsConsent((state) => !state)}
            checked={isConsent}
          />
          {updatedPaymentMethod === PaymentMethod.ACH && (
            <span>I consent to ACH Auto Debit</span>
          )}
          {updatedPaymentMethod === PaymentMethod.Credit_Card && (
            <span>I consent to Credit Card Auto Debit</span>
          )}
        </div>
      </div>
    </SignUpFormContainer>
  );
}
