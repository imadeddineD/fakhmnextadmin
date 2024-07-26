"use client";


import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>



export default function StoreSwitcher() {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = [
        {
            label: "home",
            value: "1" , 
            redirect : "/dashboard"
        },
        {
            label: "about",
            value: "2" , 
            redirect : "/dashboard/about"
        },
        {
            label: "categories",
            value: "3" ,
            redirect : "/dashboard/categories"
        },
        {
            label: "products",
            value: "4",
            redirect : "/dashboard/products"
        },
        {
            label: "settings",
            value: "5",
            redirect : "/dashboard/settings"
        },
    ]

    const currentStore = formattedItems[0];

    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false);
        router.push(`{store.redirect}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                size="sm"
                role="combobox"
                aria-expanded={open}
                aria-label="Select Store"
                className="sm:w-[200px] w-[150px]"
            >
                <div className="flex justify-between items-center w-full">
                    <StoreIcon className=" flex-shrink-0" />
                    <div className="flex-grow text-center">{currentStore?.label}</div>
                    <ChevronsUpDown className="flex-shrink-0" />
                </div>
            </Button>
            </PopoverTrigger>
            <PopoverContent className="sm:w-[200px] w-[150px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No store Found.</CommandEmpty>
                        <CommandGroup heading="" >
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-[16px] cursor-pointer "
                                >
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "mx-[10px] h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    {/* <CommandSeparator /> */}
                    {/* <CommandList>
                        <CommandGroup>
                            <CommandItem
                                className="cursor-pointer"
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList> */}
                </Command>
            </PopoverContent>
        </Popover>
    );
}