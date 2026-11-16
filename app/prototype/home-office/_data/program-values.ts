import type { Program } from "./programs";

/** Everything the Add / Update / Copy form can hold. Dates are ISO (yyyy-mm-dd) for date inputs. */
export interface ProgramFormValues {
  name: string;
  carrier: string;
  startDate: string;
  endDate: string;
  notes: string;
  customerContacted: string;
  siteInspected: string;
  rushDelivery: string;
  rushDate: string;
  invoiceSubmittedHours: string;
  invoiceSubmittedType: string;
  invoiceSubmittedDate: string;
  assignmentHours: string;
  assignmentType: string;
  jobCompletedDate: string;
  invoiceType: string;
  pricingType: string;
  categories: string[];
  freeStorageMonths: string;
  sendClaimUpdate: boolean;
  sendPartnerUpdate: boolean;
  requireF9: boolean;
  discountsAvailable: string;
  discountPercent: string;
  discountCap: string;
  discountType: string;
  indirectAvailable: string;
  indirectPercent: string;
  uploadCustomerContacted: string;
  uploadSiteInspected: string;
  uploadJobStarted: string;
  uploadJobCompleted: string;
  timestampsIn: string;
  externalQa: string;
}

export const allCategories = ["Art", "Contents", "Electronic", "Textile"];

/** A new program: nothing chosen, every category selected, toggles off (dev notes). */
export const emptyProgramValues: ProgramFormValues = {
  name: "",
  carrier: "",
  startDate: "",
  endDate: "",
  notes: "",
  customerContacted: "",
  siteInspected: "",
  rushDelivery: "",
  rushDate: "",
  invoiceSubmittedHours: "",
  invoiceSubmittedType: "",
  invoiceSubmittedDate: "",
  assignmentHours: "",
  assignmentType: "",
  jobCompletedDate: "",
  invoiceType: "",
  pricingType: "",
  categories: allCategories,
  freeStorageMonths: "0",
  sendClaimUpdate: false,
  sendPartnerUpdate: false,
  requireF9: false,
  discountsAvailable: "",
  discountPercent: "",
  discountCap: "",
  discountType: "",
  indirectAvailable: "",
  indirectPercent: "",
  uploadCustomerContacted: "",
  uploadSiteInspected: "",
  uploadJobStarted: "",
  uploadJobCompleted: "",
  timestampsIn: "",
  externalQa: ""
};

/** "Aug. 10, 2024" -> "2024-08-10". Returns "" for "-" or anything unparsable. */
export const toIsoDate = (label: string) => {
  const date = new Date(label.replace(".", ""));
  if (Number.isNaN(date.getTime())) return "";
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/*
 * Every existing program shares the same sample settings (the Horace Mann values
 * from Figma); only identity, dates and carrier come from the program itself.
 */
export const valuesFromProgram = (program: Program): ProgramFormValues => ({
  ...emptyProgramValues,
  name: program.name,
  carrier: program.carrier === "-" ? "" : program.carrier,
  startDate: toIsoDate(program.startDate),
  endDate: toIsoDate(program.endDate),
  notes:
    program.carrier === "-"
      ? "Internal program, not tied to a carrier contract."
      : `For ${program.carrier} losses assigned through CCC.`,
  customerContacted: "4",
  siteInspected: "24",
  rushDelivery: "48",
  rushDate: "SiteInspected Date",
  invoiceSubmittedHours: "72",
  invoiceSubmittedType: "Calendar",
  invoiceSubmittedDate: "ReceivedDate",
  assignmentHours: "504",
  assignmentType: "Calendar",
  jobCompletedDate: "ReceivedDate",
  invoiceType: "RestorNet",
  pricingType: program.pricingType,
  categories: ["Electronic", "Textile"],
  sendClaimUpdate: true,
  discountsAvailable: "Yes",
  discountPercent: "5%",
  discountType: "RN Only",
  indirectAvailable: "Yes",
  indirectPercent: "5%",
  uploadCustomerContacted: "Yes",
  uploadSiteInspected: "Yes",
  uploadJobStarted: "Yes",
  uploadJobCompleted: "Yes",
  timestampsIn: "XactAnalysis",
  externalQa: "Yes"
});
