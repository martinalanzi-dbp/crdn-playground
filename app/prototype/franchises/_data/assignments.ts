import type { StatusPillType } from "@/components/shared";

export type AssignmentLink = "XactAnalysis" | "Cotality Workspace";
export type TipStatus = "due-later" | "due-soon";

export interface Assignment {
  slug: string;
  name: string;
  type: string;
  internalId: string;
  /** When a Carrier ID exists it is the one shown in the table (Figma dev note). */
  carrierId?: string;
  status: StatusPillType;
  nextTip: string;
  tipStatus: TipStatus;
  received: string;
  restorableItems: { restored: number; total: number };
  /** External system the assignment is linked to. Unlinked assignments have no kebab. */
  link?: AssignmentLink;
}

export const job = {
  slug: "schumacher-michael",
  name: "Schumacher, Michael",
  claimNumber: "831H34F",
  lossReportedDate: "Jan. 9, 2020",
  status: "Active" as StatusPillType
};

export const assignments: Assignment[] = [
  {
    slug: "electronics",
    name: "Electronics",
    type: "Electronics",
    internalId: "INT-4471",
    carrierId: "ABCD1234",
    status: "Active",
    nextTip: "Site Inspection",
    tipStatus: "due-later",
    received: "Aug. 02, 2024 09:45 AM",
    restorableItems: { restored: 24, total: 30 },
    link: "XactAnalysis"
  },
  {
    slug: "textiles",
    name: "Textiles",
    type: "Contents, Textiles",
    internalId: "ABCD1234",
    status: "Active",
    nextTip: "Final Invoice",
    tipStatus: "due-soon",
    received: "Jul. 12, 2024 08:00 AM",
    restorableItems: { restored: 29, total: 30 }
  }
];
