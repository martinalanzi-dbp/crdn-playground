export type Deadline = "overdue" | "within-4h" | "between-4h-24h" | "over-24h";

export interface TipItem {
  id: string;
  job: string;
  assignment: string;
  program: string;
  nextStep: string;
  /** ISO date used only for ordering. Final Invoice has no due date. */
  dueAt: string | null;
  dueLabel: string;
  deadline: Deadline;
  carrier: string;
  franchise: string;
}

export const deadlineBadges: Record<
  Deadline,
  { label: string; className: string }
> = {
  overdue: { label: "Overdue", className: "bg-error-50 text-error-200" },
  "within-4h": {
    label: "Within 4 hours",
    className: "bg-orange-50 text-orange-200"
  },
  "between-4h-24h": {
    label: "Between 4 and 24 hours",
    className: "bg-warning-50 text-warning-200"
  },
  "over-24h": {
    label: "More than 24 hours",
    className: "bg-success-50 text-success-200"
  }
};

export const kpis = [
  {
    value: "24",
    title: "Past due date",
    subtitle: "Overdue",
    subtitleClassName: "text-error-100"
  },
  {
    value: "10000",
    title: "Urgent",
    subtitle: "Within 4 hours",
    subtitleClassName: "text-warning-200"
  },
  {
    value: "500",
    title: "Soon",
    subtitle: "Between 4 and 24 hours",
    subtitleClassName: "text-warning-100"
  },
  {
    value: "3100",
    title: "Upcoming",
    subtitle: "More than 24 hours",
    subtitleClassName: "text-success-100"
  }
];

export const tipItems: TipItem[] = [
  {
    id: "1",
    job: "Michael Schumacher",
    assignment: "Electronics",
    program: "Allstate (Contents)",
    nextStep: "Site Inspection",
    dueAt: "2025-01-15T10:34",
    dueLabel: "Jan. 15, 2025 10:34 AM",
    deadline: "overdue",
    carrier: "Allstate",
    franchise: "CRDN New Jersey"
  },
  {
    id: "2",
    job: "Michael Schumacher",
    assignment: "Textiles",
    program: "Accuserve TPA",
    nextStep: "Site Inspection",
    dueAt: "2025-01-15T10:34",
    dueLabel: "Jan. 15, 2025 10:34 AM",
    deadline: "overdue",
    carrier: "Alarcity Solutions",
    franchise: "CRDN Alabama"
  },
  {
    id: "3",
    job: "Michael Schumacher",
    assignment: "Contents",
    program: "Allstate (Alacrity) 2025",
    nextStep: "Site Inspection",
    dueAt: "2025-01-20T11:02",
    dueLabel: "Jan. 20, 2025 11:02 AM",
    deadline: "overdue",
    carrier: "Alarcity Solutions",
    franchise: "CRDN New Jersey"
  },
  {
    id: "4",
    job: "Diana Wolf",
    assignment: "Electronics",
    program: "Allstate (Inventory)",
    nextStep: "Rush Delivery",
    dueAt: "2025-01-20T11:02",
    dueLabel: "Jan. 20, 2025 11:02 AM",
    deadline: "within-4h",
    carrier: "Allstate",
    franchise: "CRDN Alabama"
  },
  {
    id: "5",
    job: "Ronald Mendez",
    assignment: "Contents",
    program: "Definity (XA)",
    nextStep: "Rush Delivery",
    dueAt: "2025-01-20T09:02",
    dueLabel: "Jan. 20, 2025 09:02 AM",
    deadline: "within-4h",
    carrier: "Allstate",
    franchise: "CRDN Alabama"
  },
  {
    id: "6",
    job: "Jackie Senna",
    assignment: "Electronics",
    program: "Farmers 2025",
    nextStep: "Rush Delivery",
    dueAt: "2025-01-24T14:04",
    dueLabel: "Jan. 24, 2025 02:04 PM",
    deadline: "between-4h-24h",
    carrier: "Goodman-Gable-Gould",
    franchise: "CRDN New Jersey"
  },
  {
    id: "7",
    job: "Melody Mohr",
    assignment: "Textiles",
    program: "Gallon / Symbility",
    nextStep: "Invoice Submitted",
    dueAt: "2025-01-24T14:04",
    dueLabel: "Jan. 24, 2025 02:04 PM",
    deadline: "between-4h-24h",
    carrier: "Bamboo Insurances",
    franchise: "CRDN New Jersey"
  },
  {
    id: "8",
    job: "Natalie Lucas",
    assignment: "Contents",
    program: "Liberty Mutual",
    nextStep: "Invoice Submitted",
    dueAt: "2025-01-24T14:04",
    dueLabel: "Jan. 24, 2025 02:04 PM",
    deadline: "between-4h-24h",
    carrier: "Amica",
    franchise: "CRDN Alabama"
  },
  {
    id: "9",
    job: "Kayla Jonas",
    assignment: "Contents",
    program: "Adjuster Referral",
    nextStep: "Invoice Submitted",
    dueAt: "2025-01-24T14:04",
    dueLabel: "Jan. 24, 2025 02:04 PM",
    deadline: "over-24h",
    carrier: "Amica",
    franchise: "CRDN New Jersey"
  },
  {
    id: "10",
    job: "Johnny Roberts",
    assignment: "Textiles",
    program: "Horace Mann (CCC)",
    nextStep: "Invoice Submitted",
    dueAt: "2025-01-24T14:04",
    dueLabel: "Jan. 24, 2025 02:04 PM",
    deadline: "over-24h",
    carrier: "Amica",
    franchise: "CRDN Alabama"
  },
  {
    id: "11",
    job: "Julian Gallagher",
    assignment: "Art",
    program: "Invoice Submitted",
    nextStep: "Invoice Submitted",
    dueAt: "2025-01-24T14:04",
    dueLabel: "Jan. 24, 2025 02:04 PM",
    deadline: "over-24h",
    carrier: "Goodman-Gable-Gould",
    franchise: "CRDN New Jersey"
  },
  /* Figma dev note, Final Invoice step: always green, no due date, so the date is "-". */
  {
    id: "12",
    job: "Frank Delgado",
    assignment: "Contents",
    program: "Liberty Mutual",
    nextStep: "Final Invoice",
    dueAt: null,
    dueLabel: "-",
    deadline: "over-24h",
    carrier: "Amica",
    franchise: "CRDN Alabama"
  }
];
