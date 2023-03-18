import create from "zustand/vanilla";

type Subscripton = {
  email: string;
  updateUserEmail: (email: string) => void;
};

export const createSubscriptionStore = () =>
  create<Subscripton>((set) => ({
    email: "",
    updateUserEmail: (email: string) => set({ email }),
  }));
