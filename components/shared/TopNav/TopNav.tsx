"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export interface TopNavMenuItem {
  label: string;
  href: string;
}

export interface TopNavItem {
  label: string;
  /** Direct link. Omit when the item opens a dropdown. */
  href?: string;
  menu?: TopNavMenuItem[];
}

interface TopNavProps {
  homeHref: string;
  items: TopNavItem[];
  /** Account dropdown, anchored to the user name on the right. */
  user: { name: string; menu: TopNavMenuItem[] };
}

const linkClasses =
  "flex h-16 items-center gap-2 px-6 text-sm text-neutral-200 outline-none transition-colors hover:bg-alpha-light-200 focus-visible:bg-alpha-light-200 data-[state=open]:bg-alpha-light-200 data-[state=open]:text-white";

const TopNav = ({ homeHref, items, user }: TopNavProps) => {
  const pathname = usePathname();
  const isActive = (item: TopNavItem) =>
    item.href
      ? pathname.startsWith(item.href)
      : item.menu?.some((entry) => pathname.startsWith(entry.href));

  return (
    <header className="h-16 w-full bg-primary-300">
      <nav className="mx-auto flex h-16 max-w-360 items-center">
        <NextLink
          href={homeHref}
          className="flex h-16 items-center px-6 inside-border-r [--inside-border-color:var(--color-alpha-light-200)]"
        >
          <Image
            src="/assets/images/crdn-logo.svg"
            alt="CRDN"
            width={91.514}
            height={24}
            priority
          />
        </NextLink>

        {items.map((item) =>
          item.menu ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger
                className={cn(
                  linkClasses,
                  isActive(item) &&
                    "text-white shadow-[inset_0_-3px_0_0_var(--color-primary-50)]"
                )}
              >
                {item.label}
                <ChevronDownIcon className="size-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={0}
                className="w-60 border border-border p-2 shadow-md"
              >
                {item.menu.map((entry) => (
                  <DropdownMenuItem key={entry.href} asChild>
                    <NextLink href={entry.href} className="h-7 px-2 text-sm">
                      {entry.label}
                    </NextLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NextLink
              key={item.label}
              href={item.href ?? homeHref}
              className={cn(
                linkClasses,
                isActive(item) &&
                  "text-white shadow-[inset_0_-3px_0_0_var(--color-primary-50)]"
              )}
            >
              {item.label}
            </NextLink>
          )
        )}

        <div className="ml-auto flex h-16 items-center">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-16 items-center justify-center px-6 text-white inside-border-l outline-none [--inside-border-color:var(--color-alpha-light-200)] hover:bg-alpha-light-200"
          >
            <BellIcon className="size-4" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                linkClasses,
                "text-white inside-border-l [--inside-border-color:var(--color-alpha-light-200)]"
              )}
            >
              {user.name}
              <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={0}
              className="w-60 border border-border p-2 shadow-md"
            >
              {user.menu.map((entry) => (
                <DropdownMenuItem key={entry.href} asChild>
                  <NextLink href={entry.href} className="h-7 px-2 text-sm">
                    {entry.label}
                  </NextLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
