import { create } from "zustand"

interface StoreModalInterface {
    isOpen : boolean , 
    onOpen : () => void , 
    onClose : () => void
} 

export const useStoreModal = create<StoreModalInterface>((set) => ({
    isOpen : false , 
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}))