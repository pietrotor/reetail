import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";
import FlowButtons from "./flow-buttons";
import { StepType } from "./steps.types";

import { TagInput } from "@/components/common";
import FormInput from "@/components/form-input";

export const CustomerDetailsStep = ({ onContinue, onBack }: StepType) => {
  const customerDetails = useNewPaymentTermStore(
    (state) => state.customerDetails
  );
  const { setFormData } = useNewPaymentTermStoreActions();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      customerDetails: { ...customerDetails, [e.target.name]: e.target.value },
    });
  };

  const onTagChange = (name: string, value: string[]) => {
    setFormData({
      customerDetails: { ...customerDetails, [name]: value },
    });
  };

  // TODO: Can be a formik form, we are not validating the form here so not for now

  return (
    <>
      <div className="flex flex-col h-[638px] py-[15px] gap-[34px]">
        <h1 className="text-[22px]">Now, add your customer details</h1>
        <FormInput
          label="Full name"
          placeholder="Jonathan Smith"
          name="fullName"
          value={customerDetails.fullName}
          onChange={onInputChange}
        />
        <div className="flex gap-[15px]">
          <FormInput
            label="Company Name"
            placeholder="SmithIndustries"
            name="companyName"
            value={customerDetails.companyName}
            onChange={onInputChange}
          />
          <FormInput
            label="Job Title"
            placeholder="Director"
            name="jobTitle"
            value={customerDetails.jobTitle}
            onChange={onInputChange}
          />
        </div>
        <FormInput
          label="Email"
          placeholder="jonathan@smith.com"
          name="email"
          value={customerDetails.email}
          onChange={onInputChange}
        />
        <TagInput
          label="Customer tag"
          name="customerTag"
          value={customerDetails.customerTag}
          onTagChange={onTagChange}
        />
      </div>
      <FlowButtons onBack={onBack} onContinue={onContinue} />
    </>
  );
};
