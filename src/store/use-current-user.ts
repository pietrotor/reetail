import { create } from "zustand";

type CurrentUser = {
  id: string;
  email: string;
  full_name?: string;
  job_title?: string;
  company_name?: string;
  address?: string;
  logo?: string;
  isClient: boolean;
};

const initialState: CurrentUser = {
  id: "",
  email: "",
  full_name: undefined,
  job_title: undefined,
  company_name: undefined,
  address: undefined,
  logo: undefined,
  isClient: false,
};

type CurrentUserActions = {
  setCurrentUser: (user: CurrentUser) => void;
  changeIsClient: () => void;
};

type CurrentUserStore = {
  actions: CurrentUserActions;
} & CurrentUser;

export const useCurrentUserStore = create<CurrentUserStore>((set, _get) => ({
  ...initialState,
  actions: {
    setCurrentUser: (user) => set(user),
    changeIsClient: () =>
      set((state) => ({ ...state, isClient: !state.isClient })),
  },
}));

export const useCurrentUserStoreActions = () =>
  useCurrentUserStore((state) => state.actions);
