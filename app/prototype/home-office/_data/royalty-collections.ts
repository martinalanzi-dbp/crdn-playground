export type TerritoryStatus = "Active" | "Sunsetting" | "Terminated";
/**
 * Which grid of the Royalty Collections page shows the estimate. `none` means no grid:
 * closed by a write-off, or under 270 days after a denied request.
 */
export type Queue =
  | "pending"
  | "approved"
  | "holdRequest"
  | "hold"
  | "writeoffRequest"
  | "none";

export interface InternalNote {
  /** ISO date. */
  date: string;
  author: string;
  text: string;
}

export interface RoyaltyEstimate {
  id: string;
  /** ISO date of the first invoice. `null` when the estimate was never invoiced. */
  firstInvoice: string | null;
  openDays: number;
  jobName: string;
  jobNumber: string;
  estimate: string;
  franchise: string;
  territory: string;
  territoryStatus: TerritoryStatus;
  franchiseOwner: string;
  carrier: string;
  total: number;
  paid: number;
  queue: Queue;
  /** ISO date the franchise sent its hold or write-off request. */
  requestedOn?: string;
  /** The franchise's reason for a pending request, or the reason an active hold was given. */
  reason?: string;
  /** ISO dates of an active hold. */
  holdStarted?: string;
  holdExpires?: string;
}

export const HOLD_DAYS = 30;

export const unpaid = (item: RoyaltyEstimate) => item.total - item.paid;

export const formatMoney = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-11-01" -> "Nov 1, 2024" (the royalty screens use this format, without periods). */
export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
};

export const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const reached270Date = (item: RoyaltyEstimate) =>
  item.firstInvoice ? addDays(item.firstInvoice, 270) : null;

/*
 * Dev note: a hold starts on day 270, or on the request date if that is later,
 * and lasts 30 days. Franchises can request a hold before day 270.
 */
export const holdStartDate = (item: RoyaltyEstimate, requestedOn: string) => {
  const reached = reached270Date(item);
  return reached && reached > requestedOn ? reached : requestedOn;
};

export const daysLeft = (expiresIso: string) =>
  Math.max(
    0,
    Math.round((Date.parse(expiresIso) - Date.parse(todayIso())) / 86_400_000)
  );

/* Internal notes are the same ones that live under Franchise > Communications. */
export const defaultNotes: InternalNote[] = [
  {
    date: "2025-03-15",
    author: "Smith, Patric",
    text: "Called franchise. Confirmed client is disputing the invoice amount. Franchise to follow up."
  },
  {
    date: "2025-01-18",
    author: "Smith, Patric",
    text: "Emailed franchise requesting update on outstanding balance. No response received."
  },
  {
    date: "2024-12-02",
    author: "Smith, Patric",
    text: "Franchise requested additional time to collect. Client's insurance claim still under review."
  },
  {
    date: "2024-11-10",
    author: "Smith, Patric",
    text: "Franchise reported the client has not responded to payment requests in over 60 days. Advised franchise to escalate with the carrier."
  },
  {
    date: "2024-10-21",
    author: "Smith, Patric",
    text: "Sent first reminder to franchise about the outstanding balance. Franchise confirmed they are following up with the client."
  }
];

export const franchiseOptions = [
  "CRDN of Dallas",
  "CRDN of Atlanta",
  "CRDN of Boston",
  "CRDN of Chicago"
];

const base = {
  franchise: "CRDN of Dallas",
  franchiseOwner: "Brown, Michael",
  territoryStatus: "Active" as TerritoryStatus,
  paid: 0
};

export const royaltyEstimates: RoyaltyEstimate[] = [
  {
    ...base,
    id: "1",
    firstInvoice: "2024-11-01",
    openDays: 619,
    jobName: "Edwards, Robert",
    jobNumber: "CRDN-372H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 00",
    carrier: "Allstate CRDN",
    total: 4100,
    paid: 2100,
    queue: "pending"
  },
  {
    ...base,
    id: "2",
    firstInvoice: "2025-02-01",
    openDays: 522,
    jobName: "Edwards, Robert",
    jobNumber: "CRDN-781H34F",
    estimate: "Cleaning",
    territory: "CRDN of Territory 01",
    carrier: "Auto Club Group",
    total: 1000,
    queue: "pending"
  },
  {
    ...base,
    id: "3",
    firstInvoice: "2025-02-20",
    openDays: 502,
    jobName: "Bennett, Sarah",
    jobNumber: "CRDN-881H34F",
    estimate: "Storage",
    territory: "CRDN of Territory 02",
    carrier: "Encompass CRDN",
    total: 18400,
    queue: "pending"
  },
  {
    /* Dev note: never invoiced, so First Invoice is blank and Open Days counts from the estimate creation date. */
    ...base,
    id: "4",
    firstInvoice: null,
    openDays: 448,
    jobName: "Davidson, Patricia",
    jobNumber: "CRDN-431H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 03",
    carrier: "UPC Alacrity",
    total: 15600,
    queue: "pending"
  },
  {
    ...base,
    id: "5",
    firstInvoice: "2025-05-15",
    openDays: 417,
    jobName: "Bennett, Sarah",
    jobNumber: "CRDN-321H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 04",
    carrier: "UPC Alacrity",
    total: 3700,
    queue: "pending"
  },
  {
    ...base,
    id: "6",
    firstInvoice: "2025-05-20",
    openDays: 412,
    jobName: "Abrahams, Lawrence",
    jobNumber: "CRDN-361H34F",
    estimate: "Packout",
    franchise: "CRDN of Atlanta",
    territory: "CRDN of Territory 05",
    territoryStatus: "Sunsetting",
    franchiseOwner: "Johnson, Emily",
    carrier: "Encompass CRDN",
    total: 127358.66,
    queue: "pending"
  },
  {
    ...base,
    id: "7",
    firstInvoice: "2025-08-23",
    openDays: 318,
    jobName: "Anderson, Michael",
    jobNumber: "CRDN-331H34F",
    estimate: "Cleaning",
    franchise: "CRDN of Boston",
    territory: "CRDN of Territory 06",
    territoryStatus: "Terminated",
    franchiseOwner: "Smith, Jane",
    carrier: "Auto Club Group",
    total: 8240,
    paid: 3000,
    queue: "pending"
  },
  {
    ...base,
    id: "8",
    firstInvoice: "2025-10-10",
    openDays: 270,
    jobName: "Carroll, James",
    jobNumber: "CRDN-332H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 07",
    territoryStatus: "Terminated",
    carrier: "Allstate CRDN",
    total: 4500,
    paid: 800,
    queue: "pending"
  },
  /* Holds and write-off requests below are sample rows, modeled on the Figma grids. */
  {
    ...base,
    id: "9",
    firstInvoice: "2025-01-12",
    openDays: 381,
    jobName: "Walker, Thomas",
    jobNumber: "CRDN-518H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 08",
    carrier: "Allstate CRDN",
    total: 6200,
    paid: 1200,
    queue: "hold",
    holdStarted: "2026-10-31",
    holdExpires: "2026-11-30",
    reason: "Client is disputing the invoice amount with the carrier."
  },
  {
    ...base,
    id: "10",
    firstInvoice: "2025-02-03",
    openDays: 359,
    jobName: "Nguyen, Linda",
    jobNumber: "CRDN-640H34F",
    estimate: "Cleaning",
    franchise: "CRDN of Atlanta",
    territory: "CRDN of Territory 09",
    franchiseOwner: "Johnson, Emily",
    carrier: "Encompass CRDN",
    total: 2300,
    queue: "hold",
    holdStarted: "2026-11-04",
    holdExpires: "2026-12-04",
    reason: "Franchisee expects the final insurance payment this month."
  },
  {
    ...base,
    id: "11",
    firstInvoice: "2025-02-27",
    openDays: 335,
    jobName: "Foster, Daniel",
    jobNumber: "CRDN-702H34F",
    estimate: "Storage",
    franchise: "CRDN of Boston",
    territory: "CRDN of Territory 10",
    franchiseOwner: "Smith, Jane",
    carrier: "Auto Club Group",
    total: 9800,
    paid: 4000,
    queue: "hold",
    holdStarted: "2026-11-12",
    holdExpires: "2026-12-12",
    reason: "Active litigation with the client over the remaining balance."
  },
  {
    ...base,
    id: "12",
    firstInvoice: "2025-03-14",
    openDays: 320,
    jobName: "Reyes, Maria",
    jobNumber: "CRDN-455H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 11",
    carrier: "UPC Alacrity",
    total: 3100,
    queue: "writeoffRequest",
    requestedOn: "2026-11-03",
    reason: "Client declared bankruptcy; balance is uncollectable."
  },
  {
    ...base,
    id: "13",
    firstInvoice: "2025-03-29",
    openDays: 305,
    jobName: "Turner, Kevin",
    jobNumber: "CRDN-566H34F",
    estimate: "Cleaning",
    franchise: "CRDN of Atlanta",
    territory: "CRDN of Territory 12",
    franchiseOwner: "Johnson, Emily",
    carrier: "Allstate CRDN",
    total: 1450,
    queue: "writeoffRequest",
    requestedOn: "2026-11-10",
    reason: "Client stopped responding after the work was completed."
  },
  {
    ...base,
    id: "14",
    firstInvoice: "2025-04-08",
    openDays: 295,
    jobName: "Ortiz, Carmen",
    jobNumber: "CRDN-619H34F",
    estimate: "Storage",
    franchise: "CRDN of Boston",
    territory: "CRDN of Territory 13",
    franchiseOwner: "Smith, Jane",
    carrier: "Encompass CRDN",
    total: 5300,
    paid: 300,
    queue: "writeoffRequest",
    requestedOn: "2026-11-14",
    reason: "Carrier denied the claim after the loss was reviewed."
  },
  {
    ...base,
    id: "15",
    firstInvoice: "2025-06-12",
    openDays: 525,
    jobName: "Bennett, Sarah",
    jobNumber: "CRDN-847H34F",
    estimate: "Storage",
    territory: "CRDN of Territory 00",
    carrier: "UPC Alacrity",
    total: 18400,
    queue: "holdRequest",
    requestedOn: "2026-11-12",
    reason: "Client confirmed a payment plan starting next month."
  },
  {
    /* Dev note: requested before day 270, so an approved hold starts on day 270, not on the request date. */
    ...base,
    id: "16",
    firstInvoice: "2026-03-09",
    openDays: 255,
    jobName: "Davidson, Patricia",
    jobNumber: "CRDN-845H34F",
    estimate: "Packout",
    territory: "CRDN of Territory 01",
    carrier: "Allstate CRDN",
    total: 21200,
    paid: 5600,
    queue: "holdRequest",
    requestedOn: "2026-11-16",
    reason: "Insurance claim is still under review by the carrier."
  }
];
