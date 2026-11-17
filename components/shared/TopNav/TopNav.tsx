"use client";

import { Badge } from "@/components/ui/badge";
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
  /** Feature not built yet: shown greyed out with an "Upcoming" badge and not clickable. */
  upcoming?: boolean;
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
  /** Keep the notifications bell out of the bar while the feature is under development. */
  hideNotifications?: boolean;
}

const linkClasses =
  "flex h-16 items-center gap-2 px-6 text-sm text-neutral-200 outline-none transition-colors hover:bg-alpha-light-200 focus-visible:bg-alpha-light-200 data-[state=open]:bg-alpha-light-200 data-[state=open]:text-white";

/* Figma "User Dropdown": full-width rows, 12px padding, a divider under each, no rounding. */
const dropdownContentClasses =
  "w-50 rounded-none border border-neutral-100 bg-white p-0 shadow-md ring-0";
const dropdownRowClasses = "border-b border-neutral-100 p-3 text-sm";

const MenuEntry = ({ entry }: { entry: TopNavMenuItem }) =>
  entry.upcoming ? (
    <DropdownMenuItem
      disabled
      className={cn(
        dropdownRowClasses,
        "justify-between gap-2 rounded-none bg-neutral-50 text-neutral-500 data-disabled:opacity-100"
      )}
    >
      {entry.label}
      <Badge className="h-auto bg-warning-50 px-2 py-1 font-normal text-warning-200">
        Upcoming
      </Badge>
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem
      asChild
      className="rounded-none p-0 focus:bg-neutral-50"
    >
      <NextLink
        href={entry.href}
        className={cn(dropdownRowClasses, "w-full text-neutral-700")}
      >
        {entry.label}
      </NextLink>
    </DropdownMenuItem>
  );

const TopNav = ({
  homeHref,
  items,
  user,
  hideNotifications
}: TopNavProps) => {
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
                className={dropdownContentClasses}
              >
                {item.menu.map((entry) => (
                  <MenuEntry key={entry.href} entry={entry} />
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
          {!hideNotifications && (
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-16 items-center justify-center px-6 text-white inside-border-l outline-none [--inside-border-color:var(--color-alpha-light-200)] hover:bg-alpha-light-200"
            >
              <BellIcon className="size-4" />
            </button>
          )}
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
              className={dropdownContentClasses}
            >
              {user.menu.map((entry) => (
                <MenuEntry key={entry.href} entry={entry} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
