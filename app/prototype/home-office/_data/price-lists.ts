export type PriceListStatus = "Active" | "Inactive";
export type PricingPartner = "Xactimate" | "Cotality";

export interface PriceList {
  slug: string;
  name: string;
  pricingPartner: PricingPartner;
  franchise: string;
  territory: string;
  zipCode: string;
  lastRefreshed: string;
  /** Only one price list per territory is the default. */
  isDefaultForTerritory: boolean;
  status: PriceListStatus;
}

/*
 * Figma dev note: the label changes with the deployed instance. US shows "ZIP Code",
 * CA (and UK franchises, which run on the CA instance) shows "Postal Code".
 */
export const zipCodeLabel = "ZIP Code";

export const franchiseOptions = [
  "CRDN of Michigan",
  "CRDN of Upstate NY",
  "CRDN Franchise 01",
  "CRDN Franchise 02",
  "CRDN Franchise 03",
  "CRDN Franchise 04",
  "CRDN Franchise 05",
  "CRDN Franchise 06"
];

export const pricingPartnerOptions: PricingPartner[] = [
  "Xactimate",
  "Cotality"
];

export const statusOptions: PriceListStatus[] = ["Active", "Inactive"];

/* First ten rows are the Figma default view; the rest repeat the pattern so pagination has pages. */
const base: Pick<
  PriceList,
  "pricingPartner" | "franchise" | "isDefaultForTerritory"
>[] = [
  { pricingPartner: "Xactimate", franchise: "CRDN Franchise 01", isDefaultForTerritory: true },
  { pricingPartner: "Xactimate", franchise: "CRDN Franchise 02", isDefaultForTerritory: true },
  { pricingPartner: "Xactimate", franchise: "CRDN Franchise 03", isDefaultForTerritory: true },
  { pricingPartner: "Cotality", franchise: "CRDN Franchise 04", isDefaultForTerritory: false },
  { pricingPartner: "Cotality", franchise: "CRDN Franchise 05", isDefaultForTerritory: false },
  { pricingPartner: "Xactimate", franchise: "CRDN Franchise 06", isDefaultForTerritory: true },
  { pricingPartner: "Cotality", franchise: "CRDN of Michigan", isDefaultForTerritory: true },
  { pricingPartner: "Xactimate", franchise: "CRDN of Michigan", isDefaultForTerritory: false },
  { pricingPartner: "Cotality", franchise: "CRDN of Michigan", isDefaultForTerritory: true },
  { pricingPartner: "Xactimate", franchise: "CRDN of Michigan", isDefaultForTerritory: true }
];

export const priceLists: PriceList[] = Array.from({ length: 30 }, (_, index) => ({
  ...base[index % base.length],
  slug: `a1c-2l5-xp${index}`,
  name: `A1C 2L5 - XP${index}`,
  territory: `CRDN Territory ${String(index + 1).padStart(2, "0")}`,
  zipCode: "98541",
  lastRefreshed: "Aug. 01, 2025",
  status: index >= 10 && index % 5 === 0 ? "Inactive" : "Active"
}));
