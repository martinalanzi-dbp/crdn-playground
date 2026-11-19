import type { StatusPillType } from "@/components/shared";

export type AssignmentType = "Electronics" | "Textiles" | "Contents" | "Art";

export interface JobListItem {
  id: string;
  /** "Last, First" as shown in the table. */
  homeowner: string;
  /** ISO date-time of the loss. */
  lossReported: string;
  status: StatusPillType;
  carrier: string;
  contractor: string;
  adjuster: string;
  assignments: AssignmentType[];
  region: string;
  franchise: string;
  territory: string;
}

export const jobStatusOptions: StatusPillType[] = ["Active", "Canceled", "Closed"];
export const carrierOptions = [
  "Marvin and Sons",
  "Casper-Nitzsche",
  "Rosenbaum LLC",
  "Swift-Ziemann",
  "Runte, Flatley and Miller",
  "Ritchie LLC"
];
export const regionOptions = ["East", "Central", "West"];

/* Franchise -> region and its territories (the Territory filter depends on the franchise). */
export const franchises: Record<string, { region: string; territories: string[] }> = {
  "CRDN of Michigan": { region: "Central", territories: ["Detroit", "Ann Arbor"] },
  "CRDN of Dallas": { region: "Central", territories: ["Dallas North", "Dallas South"] },
  "CRDN of Boston": { region: "East", territories: ["Boston", "Cambridge"] },
  "CRDN of Atlanta": { region: "East", territories: ["Atlanta"] },
  "CRDN of Seattle": { region: "West", territories: ["Seattle", "Tacoma"] }
};
export const franchiseOptions = Object.keys(franchises);

const firstNames = ["Darrell", "Dianne", "Courtney", "Kristin", "Darlene", "Jerome", "Albert", "Esther", "Devon", "Kathryn"];
const lastNames = ["Steward", "Russell", "Henry", "Watson", "Robertson", "Bell", "Flores", "Howard", "Lane", "Murphy", "Cooper", "Ellis"];
const contractors = ["Ellison Carroll", "Darcy King", "Shelley Clifford", "Misty Evans", "Tracy Gate", "Grace Carey", "Elaine Cramer", "Charlene Haig", "Nicole Brooks", "Scarlett Gilbert"];
const adjusters = ["Morgan Ellis", "Casey Reed", "Taylor Quinn", "Jamie Fox"];
const assignmentSets: AssignmentType[][] = [
  ["Art", "Textiles"],
  ["Textiles", "Contents", "Art"],
  ["Electronics"],
  ["Textiles", "Contents", "Electronics"],
  ["Art", "Textiles", "Electronics", "Contents"],
  ["Textiles", "Contents"]
];

const daysAgo = (days: number, hour: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 30, 0, 0);
  return date.toISOString();
};

/* Realistic fixtures, 60 jobs spread over the last ~year so the Date filter has something to do. */
export const jobs: JobListItem[] = Array.from({ length: 60 }, (_, index) => {
  const franchise = franchiseOptions[index % franchiseOptions.length];
  const { region, territories } = franchises[franchise];
  return {
    id: String(index + 1),
    homeowner: `${lastNames[index % lastNames.length]}, ${firstNames[(index * 3) % firstNames.length]}`,
    lossReported: daysAgo(index * 6 + 2, 9 + (index % 8)),
    status: index % 9 === 4 ? "Canceled" : index % 7 === 6 ? "Closed" : "Active",
    carrier: carrierOptions[index % carrierOptions.length],
    contractor: contractors[(index * 7) % contractors.length],
    adjuster: adjusters[index % adjusters.length],
    assignments: assignmentSets[index % assignmentSets.length],
    region,
    franchise,
    territory: territories[index % territories.length]
  };
});

const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

/** "Feb. 24, 2024 04:30 PM" */
export const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  const hours = date.getHours();
  const hour12 = String(hours % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${months[date.getMonth()]} ${day}, ${date.getFullYear()} ${hour12}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
};
