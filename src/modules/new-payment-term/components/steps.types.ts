import { steps } from "../NewPaymentTermForm.store";

export type StepType = {
  onContinue: () => void;
  onBack: () => void;
};
export type ReviewAndSubmitStepType = {
  onSubmit: () => void;
  setStep: (step: steps) => void;
  isLoading?: boolean;
};
