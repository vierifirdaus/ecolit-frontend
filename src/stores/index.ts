// state management
import { create } from "zustand";

type StoreType = {
    isSidebarOpen: boolean,
    actions: {
        setIsSidebarOpen: (val: boolean) => void
    }
}

export const useStore = create<StoreType>((set) => ({
    isSidebarOpen: false,

    actions: {
        setIsSidebarOpen(isSidebarOpen){
            set({isSidebarOpen})
        }
    }
})) 