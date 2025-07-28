import { create } from "zustand";

import { onBackStep } from "./NewPaymentTermForm.helper";
import { onContinueStep } from "./NewPaymentTermForm.helper";

export const LAST_STEP = "review-and-submit";
export const FIRST_STEP = "upload-contract";

export type steps =
  | "upload-contract"
  | "customer-details"
  | "pyment-type"
  | "payment-details"
  | "review-and-submit"
  | "success"
  | "error"
  | "confirm-close";

export type PaymentMethod = "Credit Card" | "ACH" | "Client choose";

type NewPaymentTermState = {
  step: steps;
  isOpen: boolean;
  stepBeforeClose: steps;
  contractFile: File | undefined;
  customerDetails: {
    fullName: string;
    companyName: string;
    jobTitle: string;
    email: string;
    customerTag: string[];
  };
  paymentDetails: {
    paymentType: "Fixed" | "Variable";
    paymentAmount: number;
    allowVariablePaymentAdjustment: boolean;
    allowIntegrateDatabase: boolean;
    firstPaymentDate: Date | undefined;
    paymentFrequency: "Monthly" | "quarterly" | "yearly";
    paymentDuration: number;
    offerACHDiscount: boolean;
    ACHDiscountAmount: number;
    paymentMethod: PaymentMethod;
    lateFee?: number;
    daysBeforeLateFee?: number;
  };
};

type FormData = Partial<
  Pick<
    NewPaymentTermState,
    "contractFile" | "customerDetails" | "paymentDetails"
  >
>;

type NewPaymentTermActions = {
  setStep: (step: steps) => void;
  onContinueStep: (step: steps) => void;
  onBackStep: (step: steps) => void;
  setIsOpen: (isOpen: boolean) => void;
  setStepBeforeClose: (step: steps) => void;
  onOpenChange: (isOpen: boolean) => void;
  setFormData: (formData: FormData) => void;
  clearFormData: () => void;
};

type NewPaymentTermStore = {
  actions: NewPaymentTermActions;
} & NewPaymentTermState;

const initialState: NewPaymentTermState = {
  step: FIRST_STEP,
  stepBeforeClose: FIRST_STEP,
  isOpen: false,
  contractFile: undefined,
  customerDetails: {
    fullName: "",
    companyName: "",
    jobTitle: "",
    email: "",
    customerTag: [],
  },
  paymentDetails: {
    paymentType: "Fixed",
    paymentAmount: 0,
    allowVariablePaymentAdjustment: false,
    allowIntegrateDatabase: false,
    firstPaymentDate: undefined,
    paymentFrequency: "Monthly",
    paymentDuration: 0,
    offerACHDiscount: false,
    ACHDiscountAmount: 0,
    paymentMethod: "Credit Card",
  },
};

export const useNewPaymentTermStore = create<NewPaymentTermStore>(
  (set, get) => ({
    ...initialState,
    actions: {
      setStep: (step) => set({ step }),
      onContinueStep: (step) => set({ step: onContinueStep(step) }),
      onBackStep: (step) => set({ step: onBackStep(step) }),
      setIsOpen: (isOpen) => set({ isOpen }),
      setStepBeforeClose: (step) => set({ stepBeforeClose: step }),
      onOpenChange: (isOpen) => {
        if (isOpen) {
          set({ step: FIRST_STEP, isOpen });
          return;
        }
        if (get().step === "confirm-close") {
          set({ isOpen: false });
          get().actions.clearFormData();
          return;
        }
        if (get().step === "success") {
          set({ isOpen: false });
          return;
        }
        set({ stepBeforeClose: get().step, step: "confirm-close" });
      },
      setFormData: (formData) => set((state) => ({ ...state, ...formData })),
      clearFormData: () =>
        set((state) => ({
          ...state,
          ...initialState,
        })),
    },
  })
);

export const useNewPaymentTermStoreActions = () =>
  useNewPaymentTermStore((state) => state.actions);
