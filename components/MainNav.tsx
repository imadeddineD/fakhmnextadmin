"use client"

import { useParams, usePathname } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const routes = [
        {
            href: `/dashboard`,
            label: '',
            active: pathname === `/dashboard`
        },
        {
            href: `/dashboard`,
            label: 'اللوحة',
            active: pathname === `/dashboard`
        },
        {
            href: `/dashboard/home`,
            label: "الرئيسية",
            active: pathname === `/dashboard/home`
        },
        {
            href: `/dashboard/about`,
            label: 'من نحن',
            active: pathname === `/dashboard/about`
        },
        {
            href: `/dashboard/categories`,
            label: 'الفئات',
            active: pathname === `/dashboard/categories`
        },
        {
            href: `/dashboard/products`,
            label: 'المنتجات',
            active: pathname === `/dashboard/products`
        }
    ];

    return (
        <>
            {isMobile
                ? (
                    <div className="flex items-center justify-center ml-2 visible md:invisible">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Menu className="h-8 w-8 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <nav>
                                    {routes.map((route) => (
                                        <DropdownMenuItem key={route.href} asChild>
                                            <Link
                                                href={route.href}
                                                className={cn(
                                                    "text-[18px] font-medium transition-colors hover:text-primary px-1",
                                                    route.active ? "text-black dark:text-white" : "text-black/90"
                                                )}
                                            >
                                                {route.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </nav>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
                : (
                    <nav
                        className={cn("flex items-center space-x-4 lg:space-x-6 invisible md:visible", className)}
                    >
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-[16px] transition-colors hover:text-primary font-semibold ",
                                    route.active ? "text-black dark:text-white text-[18px] " : " text-gray-700"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                )
            }
        </>
    );
}