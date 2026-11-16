import type { TopNavItem, TopNavMenuItem } from "@/components/shared";

const base = "/prototype/home-office";

/*
 * Provisional menu content: only the items named in the brief (Programs,
 * Carriers, Fee Config) are confirmed. Replace the rest with the real lists
 * once the Figma frames for each dropdown are available.
 */
export const homeOfficeNav: TopNavItem[] = [
  { label: "TIP", href: `${base}/tip` },
  { label: "Jobs", href: `${base}/jobs` },
  {
    label: "Management",
    menu: [
      { label: "Carriers", href: `${base}/carriers` },
      { label: "Fee Config", href: `${base}/fee-config` }
    ]
  },
  { label: "Users", href: `${base}/contacts` },
  {
    label: "Operations",
    menu: [
      { label: "Programs", href: `${base}/programs` },
      { label: "Assignments", href: `${base}/assignments` },
      { label: "Warehouse", href: `${base}/warehouse` }
    ]
  },
  { label: "Reports", href: `${base}/reports` },
  { label: "Finance", href: `${base}/finance` },
  { label: "Legal", href: `${base}/legal` }
];

export const homeOfficeAccountMenu: TopNavMenuItem[] = [
  { label: "Profile", href: `${base}/account/profile` },
  { label: "Preferences", href: `${base}/account/preferences` },
  { label: "Sign out", href: "/prototype" }
];
