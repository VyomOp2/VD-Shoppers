import { create } from "zustand"
import { persist , createJSONStorage } from "zustand/middleware";

import { Product } from "@/types"
import toast from "react-hot-toast";

interface CartStoreProps {
    items : Product[];
    addItem : (data : Product) => void;
    removeItem : (id : string) => void;
    removeAll : () => void;
};

const useCart = create(
    persist<CartStoreProps>(( set , get ) => ({
        items : [],
        addItem : ( data : Product ) => {
            const currentItems = get().items;
            const existingItems = currentItems.find((item) => item.id === data.id );

            if (existingItems) {
                return toast("Item Already in Cart.");
            }

            set({ items : [...get().items , data ] });
            toast.success("Item Added to Cart.");
        },
        removeItem : ( id : string ) => {
            set({ items : [...get().items.filter((item) => item.id !== id )]  });
            toast.success("Item Removed from the Cart.")
        },
        removeAll : () => set({ items : [] }),
    }) , {
        name : "cart-storage",
        storage : createJSONStorage(() => localStorage)
    })
);

export default useCart;
