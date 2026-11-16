import type { StatusPillType } from "@/components/shared";

export type ProgramStatus = Extract<
  StatusPillType,
  "Draft" | "Active" | "Inactive"
>;

export interface Program {
  slug: string;
  name: string;
  carrier: string;
  status: ProgramStatus;
  pricingType: string;
  startDate: string;
  endDate: string;
}

const program = (
  name: string,
  carrier: string,
  status: ProgramStatus,
  startDate: string,
  endDate = "-"
): Program => ({
  slug: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  name,
  carrier,
  status,
  pricingType: "Xactimate",
  startDate,
  endDate
});

/* Hardcoded fixtures. The first ten rows come from the Figma Program List frame. */
export const programs: Program[] = [
  program("Allstate (Alacrity) 2025", "Allstate", "Draft", "Mar. 18, 2025"),
  program("Accuserve TPA", "-", "Active", "Jan. 01, 2024"),
  program(
    "Adjuster Referral (CoreLogic w Contents)",
    "-",
    "Active",
    "Jan. 01, 2025"
  ),
  program(
    "Allstate (Contents)",
    "Allstate",
    "Active",
    "Jan. 01, 2025",
    "Mar. 01, 2026"
  ),
  program(
    "Allstate (Inventory)",
    "Allstate",
    "Active",
    "Apr. 09, 2025",
    "Sep. 09, 2025"
  ),
  program(
    "American Family / Homesite ‘24",
    "American Family",
    "Active",
    "Aug. 10, 2024",
    "Aug. 10, 2025"
  ),
  program("Definity (XA)", "American Family", "Active", "Feb. 27, 2025"),
  program(
    "Farmers 2025",
    "Economical Mutual Insurance",
    "Active",
    "May 01, 2024",
    "May 01, 2027"
  ),
  program(
    "Gallon / Symbility",
    "Farmers Insurance",
    "Active",
    "Feb. 27, 2025",
    "Apr. 01, 2026"
  ),
  program("Liberty Mutual/Safeco ‘24", "-", "Active", "Dec. 18, 2023"),
  program(
    "Horace Mann (CCC)",
    "Horace Mann",
    "Draft",
    "Jun. 02, 2025",
    "Jul. 20, 2028"
  ),
  program("Nationwide (Contents)", "Nationwide", "Active", "Jun. 02, 2025"),
  program("Progressive Home 2025", "Progressive", "Active", "Feb. 03, 2025"),
  program(
    "State Farm (Inventory)",
    "State Farm",
    "Active",
    "Jul. 15, 2024",
    "Jul. 15, 2026"
  ),
  program("Travelers Preferred", "Travelers", "Active", "Mar. 01, 2024"),
  program("USAA Contents", "USAA", "Active", "Oct. 21, 2024"),
  program(
    "The Hartford (XA)",
    "The Hartford",
    "Active",
    "Sep. 30, 2024",
    "Sep. 30, 2026"
  ),
  program(
    "Pacific Specialty Home",
    "Pacific Specialty",
    "Active",
    "Mar. 17, 2025"
  ),
  program(
    "Sentry Insurance (XA)",
    "Sentry Insurance",
    "Active",
    "Aug. 04, 2024",
    "Aug. 04, 2026"
  ),
  program("Wawanesa Contents", "Wawanesa", "Active", "Nov. 12, 2024"),
  program("Zurich North America", "Zurich", "Active", "Jan. 06, 2025"),
  program(
    "CoreLogic Direct",
    "-",
    "Inactive",
    "Jan. 01, 2022",
    "Dec. 31, 2023"
  ),
  program(
    "Safeco 2023",
    "Liberty Mutual",
    "Inactive",
    "Jan. 01, 2023",
    "Dec. 31, 2023"
  ),
  program(
    "Erie Insurance Pilot",
    "Erie Insurance",
    "Inactive",
    "Apr. 01, 2023",
    "Oct. 01, 2024"
  )
];
