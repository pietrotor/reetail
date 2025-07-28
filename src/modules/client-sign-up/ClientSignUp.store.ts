import { create } from "zustand";

export const FIRST_STEP = "profile";

export type steps =
  | "payment-preference"
  | "profile"
  | "signature"
  | "consent"
  | "plaid"
  | "success";

type PlaidState = {
  linkSuccess: boolean;
  isItemAccess: boolean;
  isPaymentInitiation: boolean;
  isUserTokenFlow: boolean;
  isCraProductsExclusively: boolean;
  linkToken: string | null;
  accessToken: string | null;
  userToken: string | null;
  itemId: string | null;
  isError: boolean;
  backend: boolean;
  products: string[];
  linkTokenError: {
    error_message: string;
    error_code: string;
    error_type: string;
  };
};
type ClientSignUpState = {
  step: steps;
  plaidState: PlaidState;
};

const initialState: ClientSignUpState = {
  step: FIRST_STEP,
  plaidState: {
    linkSuccess: false,
    isItemAccess: true,
    isPaymentInitiation: false,
    isCraProductsExclusively: false,
    isUserTokenFlow: false,
    linkToken: "", // Don't set to null or error message will show up briefly when site loads
    userToken: null,
    accessToken: null,
    itemId: null,
    isError: false,
    backend: true,
    products: ["transactions"],
    linkTokenError: {
      error_type: "",
      error_code: "",
      error_message: "",
    },
  },
};

type ClientSignUpActions = {
  setStep: (step: steps) => void;
  setPlaidState: (plaidState: Partial<PlaidState>) => void;
};

type ClientSignUpStore = {
  actions: ClientSignUpActions;
} & ClientSignUpState;

export const useClientSignUpStore = create<ClientSignUpStore>((set, _get) => ({
  ...initialState,
  actions: {
    setStep: (step) => set({ step }),
    setPlaidState: (plaidState: Partial<PlaidState>) =>
      set((state) => ({
        ...state,
        plaidState: { ...state.plaidState, ...plaidState },
      })),
  },
}));

export const useClientSignUpStoreActions = () =>
  useClientSignUpStore((state) => state.actions);
