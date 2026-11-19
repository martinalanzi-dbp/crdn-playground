import type { TopNavItem, TopNavMenuItem } from "@/components/shared";

export const franchisesBase = "/prototype/franchises";

/* Menu and dropdown contents from the Figma "Desktop" navigation frames. */
export const franchisesNav: TopNavItem[] = [
  { label: "TIP", href: `${franchisesBase}/tip` },
  { label: "Jobs", href: `${franchisesBase}/jobs` },
  {
    label: "Management",
    menu: [
      { label: "Contacts", href: `${franchisesBase}/management/contacts` },
      { label: "Companies", href: `${franchisesBase}/management/companies` },
      {
        label: "Price Lists",
        href: `${franchisesBase}/management/price-lists`,
        upcoming: true
      },
      {
        label: "Reports",
        href: `${franchisesBase}/management/reports`,
        upcoming: true
      }
    ]
  },
  { label: "Users", href: `${franchisesBase}/users` },
  {
    label: "Warehouse",
    menu: [
      { label: "Layout", href: `${franchisesBase}/warehouse/layout` },
      { label: "Printers", href: `${franchisesBase}/warehouse/printers` },
      {
        label: "Print Warehouse Labels",
        href: `${franchisesBase}/warehouse/print-warehouse-labels`
      },
      {
        label: "Print Item / Box Labels",
        href: `${franchisesBase}/warehouse/print-item-box-labels`
      }
    ]
  },
  { label: "Reports", href: `${franchisesBase}/reports` }
];

export const franchisesAccountMenu: TopNavMenuItem[] = [
  {
    label: "Profile",
    href: `${franchisesBase}/account/profile`,
    upcoming: true
  },
  {
    label: "Settings",
    href: `${franchisesBase}/account/settings`,
    upcoming: true
  },
  { label: "Log Out", href: `${franchisesBase}/sign-in` }
];
