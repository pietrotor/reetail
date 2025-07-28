import { Loader } from "lucide-react";

import { steps, useNewPaymentTermStore } from "../NewPaymentTermForm.store";
import { ReviewAndSubmitStepType } from "./steps.types";

import { DocumentIcon, EditIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const ReviewAndSubmitStep = ({
  onSubmit,
  setStep,
  isLoading,
}: ReviewAndSubmitStepType) => {
  const onEditDetailsClick = (step: steps) => {
    setStep(step);
  };

  const paymentDetails = useNewPaymentTermStore(
    (state) => state.paymentDetails
  );

  const customerDetails = useNewPaymentTermStore(
    (state) => state.customerDetails
  );

  const contractFile = useNewPaymentTermStore((state) => state.contractFile);

  return (
    <section className="flex flex-col h-full gap-5">
      <div className="flex flex-col h-full gap-4">
        <h1 className="text-[22px] font-normal leading-[22px]">
          Review and submit
        </h1>
        <section className="flex flex-col gap-[10px]">
          <SubSectionHeader
            title="Uploaded Document"
            onEditClick={() => onEditDetailsClick("upload-contract")}
          />
          <div className="flex flex-row gap-2 items-center rounded-lg bg-gray-bg p-4">
            <DocumentIcon className="w-5 h-5 fill-black" />
            <span className="text-sm">
              {contractFile?.name || "No file uploaded"}
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-[10px]">
          <SubSectionHeader
            title="Customer details"
            onEditClick={() => onEditDetailsClick("customer-details")}
          />
          <div className="flex flex-col gap-2 justify-center rounded-lg bg-gray-bg p-4">
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Full Name</span>
              <span className="text-sm font-semibold">
                {customerDetails.fullName}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Company Name</span>
              <span className="text-sm font-semibold">
                {customerDetails.companyName}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Job Title</span>
              <span className="text-sm font-semibold">
                {customerDetails.jobTitle}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Email</span>
              <span className="text-sm font-semibold">
                {customerDetails.email}
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-[10px]">
          <SubSectionHeader
            title="Payment details"
            onEditClick={() => onEditDetailsClick("payment-details")}
          />
          <div className="flex flex-col gap-2 justify-center rounded-lg bg-gray-bg p-4">
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Amount</span>
              <span className="text-sm font-semibold">
                {paymentDetails.paymentAmount}
              </span>
            </div>
            {paymentDetails.paymentMethod === "ACH" && (
              <div className="flex flex-row gap-2 justify-between">
                <span className="text-sm">ACH Discount</span>
                <span className="text-sm font-semibold">{`${
                  paymentDetails.ACHDiscountAmount || 0
                }%`}</span>
              </div>
            )}
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Payment type</span>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-sm font-semibold">
                  {paymentDetails.paymentType}
                </span>
                {paymentDetails.paymentType === "Variable" &&
                  paymentDetails.allowVariablePaymentAdjustment && (
                    <span className="text-xs font-normal">
                      Allow payment amount to be adjusted up to 5 days after the
                      payment date.
                    </span>
                  )}
                {paymentDetails.paymentType === "Variable" &&
                  paymentDetails.allowIntegrateDatabase && (
                    <span className="text-xs font-normal">
                      Integrate with another database to pull usage and
                      calculate the payment
                    </span>
                  )}
              </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">First payment</span>
              <span className="text-sm font-semibold">
                {paymentDetails.firstPaymentDate?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Frecuency</span>
              <span className="text-sm font-semibold">
                {paymentDetails.paymentFrequency}
              </span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span className="text-sm">Duration</span>
              <span className="text-sm font-semibold">
                {paymentDetails.paymentDuration} months
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="flex items-center justify-center">
        <Button className="w-1/2" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin h-4 w-4" /> : "Submit"}
        </Button>
      </div>
    </section>
  );
};

const SubSectionHeader = ({
  title,
  onEditClick,
}: {
  title: string;
  onEditClick: () => void;
}) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <h2>{title}</h2>
      <Button variant="ghost" className="text-gray-300" onClick={onEditClick}>
        <EditIcon className="w-3 h-3 fill-gray-300" />
        Edit details
      </Button>
    </div>
  );
};
