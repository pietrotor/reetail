import { FIRST_STEP, LAST_STEP, steps } from "./NewPaymentTermForm.store";

export const onContinueStep = (step: steps): steps => {
  if (step === LAST_STEP) {
    return step;
  }
  if (step === "upload-contract") {
    return "customer-details";
  }
  if (step === "customer-details") {
    return "pyment-type";
  }
  if (step === "pyment-type") {
    return "payment-details";
  }
  if (step === "payment-details") {
    return "review-and-submit";
  }

  return step;
};

export const onBackStep = (step: steps): steps => {
  if (step === FIRST_STEP) {
    return step;
  }

  if (step === "customer-details") {
    return "upload-contract";
  }
  if (step === "pyment-type") {
    return "customer-details";
  }
  if (step === "payment-details") {
    return "pyment-type";
  }
  if (step === "review-and-submit") {
    return "payment-details";
  }
  return step;
};
