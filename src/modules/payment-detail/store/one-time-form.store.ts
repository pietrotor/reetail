import { create } from "zustand";

type OneTimeInvoiceState = {
  isOpen: boolean;
  dueDate: Date | undefined;

  invoiceDetail: {
    feeName: string;
    amount: number;
    isConfirmed: boolean;
  }[];
  accountId: string;
};

type FormData = Partial<OneTimeInvoiceState>;

type OneTimeInvoiceActions = {
  setIsOpen: (isOpen: boolean) => void;
  onOpenChange: (isOpen: boolean) => void;
  setFormData: (formData: FormData) => void;
  clearForm: () => void;
};

type OneTimeInvoiceStore = {
  actions: OneTimeInvoiceActions;
} & OneTimeInvoiceState;

const initialState: Omit<OneTimeInvoiceState, "isOpen"> = {
  dueDate: undefined,
  invoiceDetail: [
    {
      amount: 0,
      feeName: "",
      isConfirmed: false,
    },
  ],
  accountId: "",
};

export const useOneTimeInvoiceStore = create<OneTimeInvoiceStore>((set, _) => ({
  isOpen: false,
  ...initialState,
  actions: {
    setIsOpen: (isOpen) => set({ isOpen }),
    onOpenChange: (isOpen) => {
      if (isOpen) {
        set({ isOpen });
        return;
      }
      set({ isOpen: false });
    },
    setFormData: (formData) => set((state) => ({ ...state, ...formData })),
    clearForm: () => set({ ...initialState }),
  },
}));

export const useOneTimeInvoiceStoreActions = () =>
  useOneTimeInvoiceStore((state) => state.actions);
