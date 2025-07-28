import { useState } from "react";
import { toast } from "sonner";

import { PaymentTypStep } from "./components/PaymentTypStep";
import { Stepper } from "./components/Stepper";
import {
  CustomerDetailsStep,
  PaymentDetailsStep,
  ReviewAndSubmitStep,
  UploadContractStep,
  SuccessStep,
  ErrorStep,
  ConfirmCloseStep,
} from "./components/steps";
import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "./NewPaymentTermForm.store";

import {
  PaymentTermCreate,
  PaymentTermFrequency,
  PaymentTermType,
  useCreatePaymentTermEndpointApiV1PaymentTermsPost,
  useUploadFileEndpointApiV1FilesUploadPost,
} from "@/api";
import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { dateToString } from "@/utils/formatters";

export const NewPaymentTermForm = () => {
  const [paymentTermId, setPaymentTermId] = useState("");
  const { step, contractFile, customerDetails, paymentDetails } =
    useNewPaymentTermStore();

  const { onContinueStep, onBackStep, setStep, clearFormData } =
    useNewPaymentTermStoreActions();
  const createPaymentTerm = useCreatePaymentTermEndpointApiV1PaymentTermsPost({
    mutation: {
      onError: () => {
        toast.error("We coudn't create the payment term");
      },
    },
  });
  const uploadFiles = useUploadFileEndpointApiV1FilesUploadPost({
    mutation: {
      onError: () => {
        toast.error("Error uploading file");
      },
    },
    request: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const onSubmit = () => {
    uploadFiles.mutate(
      {
        data: {
          file: contractFile as Blob,
        },
      },
      {
        onSuccess(data: any) {
          const { filename } = data;

          const payload: PaymentTermCreate = {
            name: customerDetails.fullName,
            company_name: customerDetails.companyName,
            job_title: customerDetails.jobTitle,
            email: customerDetails.email,
            payment_amount: +paymentDetails.paymentAmount,
            allow_variable_payment_adjustment:
              paymentDetails.allowVariablePaymentAdjustment,
            allow_integrate_database: paymentDetails.allowIntegrateDatabase,
            payment_duration: +paymentDetails.paymentDuration,
            has_ach_discount: paymentDetails.ACHDiscountAmount,
            payment_method: paymentDetails.paymentMethod,
            first_payment_date: dateToString(
              paymentDetails.firstPaymentDate || new Date()
            ),
            payment_frequency:
              paymentDetails.paymentFrequency as PaymentTermFrequency,
            payment_type: paymentDetails.paymentType as PaymentTermType,
            contract_file: filename || "",
            customer_tag: customerDetails.customerTag || ["tags"],
            late_fee: paymentDetails.lateFee
              ? +paymentDetails.lateFee
              : undefined,
            days_before_late_fee: paymentDetails.daysBeforeLateFee
              ? +paymentDetails.daysBeforeLateFee
              : undefined,
          };

          Object.keys(payload).forEach(
            (key) =>
              payload[key as keyof PaymentTermCreate] === undefined &&
              delete payload[key as keyof PaymentTermCreate]
          );

          createPaymentTerm.mutate(
            {
              data: payload,
            },
            {
              onSuccess: (data: any) => {
                setPaymentTermId(data.id);
                setStep("success");
                clearFormData();
              },
            }
          );
        },
      }
    );
  };

  return (
    <>
      <DialogContent
        // container={container}
        className={cn(
          "min-w-[611px] max-h-[800px] flex flex-col justify-between",
          step === "success" && "h-[400px] p-16",
          step === "error" && "h-[400px] p-16",
          step === "confirm-close" && "h-[400px] p-16",
          step === "upload-contract" && "h-fit"
        )}
      >
        {/* Header / Stepper */}
        <Stepper currentStep={step} />
        {step === "upload-contract" && (
          <UploadContractStep
            onContinue={() => onContinueStep(step)}
            onBack={() => onBackStep(step)}
          />
        )}
        {step === "customer-details" && (
          <CustomerDetailsStep
            onContinue={() => onContinueStep(step)}
            onBack={() => onBackStep(step)}
          />
        )}
        {step === "pyment-type" && (
          <PaymentTypStep
            onContinue={() => onContinueStep(step)}
            onBack={() => onBackStep(step)}
          />
        )}
        {step === "payment-details" && (
          <PaymentDetailsStep
            onContinue={() => onContinueStep(step)}
            onBack={() => onBackStep(step)}
          />
        )}
        {step === "review-and-submit" && (
          <ReviewAndSubmitStep
            onSubmit={onSubmit}
            setStep={setStep}
            isLoading={createPaymentTerm.isPending || uploadFiles.isPending}
          />
        )}
        {step === "success" && <SuccessStep paymentTermId={paymentTermId} />}
        {step === "error" && <ErrorStep />}
        {step === "confirm-close" && <ConfirmCloseStep />}
      </DialogContent>
    </>
  );
};
