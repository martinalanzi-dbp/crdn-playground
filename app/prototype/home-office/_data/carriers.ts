export type CarrierStatus = "Active" | "Inactive";
export type PricingSystem = "Xactimate" | "Cotality";

export interface Carrier {
  id: string;
  name: string;
  status: CarrierStatus;
  /** ISO date (yyyy-mm-dd). Set automatically to the current day when a carrier is created. */
  createdAt: string;
  defaultPricingSystem?: PricingSystem;
}

export const carrierStatusOptions: CarrierStatus[] = ["Active", "Inactive"];
export const pricingSystemOptions: PricingSystem[] = ["Xactimate", "Cotality"];

export const carriers: Carrier[] = [
  {
    id: "allstate-crdn",
    name: "Allstate CRDN",
    status: "Active",
    createdAt: "2025-06-21",
    defaultPricingSystem: "Xactimate"
  },
  {
    id: "auto-club-group",
    name: "Auto Club Group",
    status: "Active",
    createdAt: "2025-06-18",
    defaultPricingSystem: "Cotality"
  },
  {
    id: "encompass-crdn",
    name: "Encompass CRDN",
    status: "Active",
    createdAt: "2025-01-28"
  },
  {
    id: "farmers-insurance",
    name: "Farmers Insurance",
    status: "Inactive",
    createdAt: "2024-11-05",
    defaultPricingSystem: "Xactimate"
  },
  {
    id: "liberty-mutual",
    name: "Liberty Mutual",
    status: "Inactive",
    createdAt: "2024-03-14"
  }
];

const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec."
];

/** "2025-06-21" -> "Jun. 21, 2025" (date format used across the prototype). */
export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  return `${months[Number(month) - 1]} ${day}, ${year}`;
};

export const todayIso = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};
