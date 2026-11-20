"use client";

import { PageHeader, SectionCard } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  HandRaisedIcon,
  MagnifyingGlassIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import DetailsPanel from "../../../_components/RoyaltyCollections/DetailsPanel";
import MultiSelectFilter from "../../../_components/MultiSelectFilter/MultiSelectFilter";
import {
  ActionModal,
  BulkApproveModal,
  RoyaltyAction
} from "../../../_components/RoyaltyCollections/RoyaltyModals";
import {
  HOLD_DAYS,
  Queue,
  RoyaltyEstimate,
  TerritoryStatus,
  addDays,
  daysLeft,
  defaultNotes,
  formatDate,
  formatMoney,
  franchiseOptions,
  holdStartDate,
  royaltyEstimates,
  todayIso,
  unpaid
} from "../../../_data/royalty-collections";

type Tab = "review" | "holds" | "writeoff";
type View = "pending" | "approved";
type SortKey = "openDays" | "unpaid" | "franchise" | "franchiseOwner";
type Sort = { key: SortKey; dir: "asc" | "desc" };

const base = "/prototype/home-office";

const tabs: { id: Tab; label: string }[] = [
  { id: "review", label: "Collection Review" },
  { id: "holds", label: "Holds" },
  { id: "writeoff", label: "Write-off Review" }
];

const sectionTitles: Record<Tab, string> = {
  review: "Collection Review",
  holds: "On Hold",
  writeoff: "Write-off Review"
};

/* Dev note: Collection Review sorts by Open Days descending; Holds and Write-off Review by Franchise Owner, A to Z. */
const defaultSorts: Record<Tab, Sort> = {
  review: { key: "openDays", dir: "desc" },
  holds: { key: "franchiseOwner", dir: "asc" },
  writeoff: { key: "franchiseOwner", dir: "asc" }
};

/* Territory badge colours: Active green, Sunsetting amber, Terminated red. */
const territoryBadges: Record<TerritoryStatus, string> = {
  Active: "bg-success-50 text-success-200",
  Sunsetting: "bg-warning-50 text-warning-200",
  Terminated: "bg-error-50 text-error-200"
};

/* Holds and Write-off Review empty states are not designed yet (TBD in Figma). */
const emptyMessages: Record<Queue, string> = {
  pending:
    "No estimates pending collection review. Approved estimates waiting for the next batch are in the Awaiting batch view.",
  approved:
    "Estimates you approve for collection appear here until they're included in the next royalty batch. You can undo an approval while it's listed.",
  holdRequest: "No hold requests are waiting for review.",
  hold: "No estimates are on hold.",
  writeoffRequest: "No write-off requests are waiting for review.",
  none: ""
};

interface RowMenuEntry {
  label: string;
  icon: typeof EyeIcon;
  action: RoyaltyAction | "details";
}

const rowMenus: Partial<Record<Queue, RowMenuEntry[]>> = {
  pending: [
    { label: "Details", icon: EyeIcon, action: "details" },
    { label: "Approve collections", icon: CheckCircleIcon, action: "approve" },
    { label: "Place on Hold", icon: HandRaisedIcon, action: "hold" },
    { label: "Write-off", icon: XCircleIcon, action: "writeoff" }
  ],
  holdRequest: [{ label: "Details", icon: EyeIcon, action: "details" }],
  hold: [
    { label: "Details", icon: EyeIcon, action: "details" },
    { label: "Extend hold", icon: ClockIcon, action: "extendHold" }
  ],
  writeoffRequest: [
    { label: "Approve Write-off", icon: CheckCircleIcon, action: "approveWriteoff" },
    { label: "Deny Write-off", icon: XCircleIcon, action: "denyWriteoff" }
  ]
};

/*
 * Details panel footer per grid; the last button is the primary one.
 * Dev note: there is no "Move to Collections" — HO can't end an active hold early.
 */
const detailsActions: Partial<Record<Queue, [string, RoyaltyAction][]>> = {
  pending: [
    ["Place on Hold", "hold"],
    ["Approve", "approve"]
  ],
  holdRequest: [
    ["Deny Hold Request", "denyHold"],
    ["Approve Hold Request", "approveHold"]
  ],
  hold: [["Extend Hold", "extendHold"]]
};

/* Holds and Write-off Review success toasts are not designed yet; these follow the Collection Review ones. */
const successMessages: Record<RoyaltyAction, string> = {
  approve: "Collection approved successfully",
  hold: "Estimate placed on hold successfully",
  writeoff: "Estimate written off successfully",
  undo: "Collection approval undone",
  extendHold: "Hold extended successfully",
  approveHold: "Hold request approved successfully",
  denyHold: "Hold request denied successfully",
  approveWriteoff: "Write-off approved successfully",
  denyWriteoff: "Write-off denied successfully"
};

/*
 * Dev note: a denied request returns the estimate to its normal course: the review if it
 * is past day 270, no grid otherwise. Whether a write-off denied during an approved hold
 * goes back to that hold is TBD.
 */
const afterDenial = (item: RoyaltyEstimate): Queue =>
  item.openDays >= 270 ? "pending" : "none";

interface Column {
  key: string;
  header: string;
  /** Width in Tailwind spacing units (Figma column widths). Without one, the column takes the remaining space. */
  width?: string;
  sortKey?: SortKey;
  render: (item: RoyaltyEstimate) => ReactNode;
}

type ModalState =
  | { kind: "action"; action: RoyaltyAction; id: string }
  | { kind: "bulk" }
  | null;

const RoyaltyCollectionsPage = () => {
  const [items, setItems] = useState<RoyaltyEstimate[]>(royaltyEstimates);
  const [tab, setTab] = useState<Tab>("review");
  const [view, setView] = useState<View>("pending");
  const [franchises, setFranchises] = useState<string[] | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>(defaultSorts.review);
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const count = (queue: Queue) =>
    items.filter((item) => item.queue === queue).length;
  const tabCounts: Record<Tab, number> = {
    review: count("pending"),
    /* Dev note: TBD whether this counts active holds too; the Figma sample counts both grids. */
    holds: count("holdRequest") + count("hold"),
    writeoff: count("writeoffRequest")
  };

  /* Dev note: search covers the franchise owner and the job name or number only. */
  const rowsFor = (
    queue: Queue,
    { byFranchise = false, bySearch = false } = {}
  ) => {
    const term = bySearch ? search.trim().toLowerCase() : "";
    const value = (item: RoyaltyEstimate) =>
      sort.key === "unpaid" ? unpaid(item) : item[sort.key];

    return items
      .filter(
        (item) =>
          item.queue === queue &&
          (!byFranchise || !franchises || franchises.includes(item.franchise)) &&
          (!term ||
            item.franchiseOwner.toLowerCase().includes(term) ||
            item.jobName.toLowerCase().includes(term) ||
            item.jobNumber.toLowerCase().includes(term))
      )
      .sort((a, b) => {
        const left = value(a);
        const right = value(b);
        const order =
          typeof left === "number" && typeof right === "number"
            ? left - right
            : String(left).localeCompare(String(right));
        return (sort.dir === "asc" ? order : -order) || unpaid(b) - unpaid(a);
      });
  };

  const itemById = (id: string) => items.find((item) => item.id === id);
  const openAction = (action: RoyaltyAction, id: string) =>
    setModal({ kind: "action", action, id });

  const move = (ids: string[], changes: Partial<RoyaltyEstimate>) =>
    setItems((current) =>
      current.map((item) =>
        ids.includes(item.id) ? { ...item, ...changes } : item
      )
    );

  const closeAll = () => {
    setModal(null);
    setDetailsId(null);
  };

  /* Dev note: every reason entered in these dialogs is recorded in the estimate's Activity, not as an internal note. */
  const confirmAction = (action: RoyaltyAction, id: string, reason: string) => {
    const item = itemById(id);
    if (!item) return;

    const startHold = (requestedOn: string, holdReason?: string) => {
      const start = holdStartDate(item, requestedOn);
      return {
        queue: "hold" as const,
        holdStarted: start,
        holdExpires: addDays(start, HOLD_DAYS),
        reason: holdReason
      };
    };

    const changes: Partial<RoyaltyEstimate> = (() => {
      switch (action) {
        case "approve":
          return { queue: "approved" };
        case "undo":
          return { queue: "pending" };
        case "hold":
          return startHold(todayIso(), reason);
        case "approveHold":
          return startHold(item.requestedOn ?? todayIso(), item.reason);
        case "extendHold":
          /* Dev note: extending adds 30 days to the current expiry and keeps the start date. */
          return { holdExpires: addDays(item.holdExpires ?? todayIso(), HOLD_DAYS) };
        case "writeoff":
        case "approveWriteoff":
          return { queue: "none" };
        case "denyHold":
        case "denyWriteoff":
          return { queue: afterDenial(item) };
      }
    })();

    move([id], changes);
    toast.success(successMessages[action]);
    setSelected((current) => current.filter((value) => value !== id));
    closeAll();
  };

  const confirmBulk = () => {
    move(selected, { queue: "approved" });
    toast.success("Selected collections approved successfully");
    setSelected([]);
    setModal(null);
  };

  const toggleSort = (key: SortKey) =>
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "franchise" || key === "franchiseOwner" ? "asc" : "desc" }
    );

  const switchTab = (next: Tab) => {
    setTab(next);
    setSort(defaultSorts[next]);
    setSelected([]);
  };

  const job = (item: RoyaltyEstimate) => (
    <div className="flex min-w-0 flex-col">
      <a
        href={`${base}/jobs/${item.jobNumber}`}
        target="_blank"
        rel="noreferrer"
        className="truncate text-link underline"
      >
        {item.jobName}
      </a>
      <span>{item.jobNumber}</span>
    </div>
  );
  const estimateLink = (item: RoyaltyEstimate) => (
    <a
      href={`${base}/estimates/${item.id}`}
      target="_blank"
      rel="noreferrer"
      className="text-link underline"
    >
      {item.estimate}
    </a>
  );
  const date = (iso?: string | null) => (iso ? formatDate(iso) : "-");

  const columns: Record<string, Column> = {
    firstInvoice: {
      key: "firstInvoice",
      header: "First Invoice",
      width: "w-25",
      render: (item) => (
        <div className="flex flex-col items-start gap-1">
          {date(item.firstInvoice)}
          {item.queue === "approved" && (
            <Badge className="h-5 bg-success-50 px-2 font-normal text-success-200">
              Approved
            </Badge>
          )}
        </div>
      )
    },
    openDays: {
      key: "openDays",
      header: "Open Days",
      width: "w-27.5",
      sortKey: "openDays",
      render: (item) => `${item.openDays} days`
    },
    job: { key: "job", header: "Job", width: "w-30", render: job },
    estimate: {
      key: "estimate",
      header: "Estimate",
      width: "w-20",
      render: estimateLink
    },
    franchise: {
      key: "franchise",
      header: "Franchise",
      width: "w-30",
      sortKey: "franchise",
      render: (item) => item.franchise
    },
    territory: {
      key: "territory",
      header: "Territory",
      width: "w-40",
      render: (item) => (
        <div className="flex flex-col items-start gap-1">
          {item.territory}
          <Badge
            className={cn(
              "h-5 px-2 font-normal",
              territoryBadges[item.territoryStatus]
            )}
          >
            {item.territoryStatus}
          </Badge>
        </div>
      )
    },
    owner: {
      key: "owner",
      header: "Franchise Owner",
      width: "w-37.5",
      sortKey: "franchiseOwner",
      render: (item) => item.franchiseOwner
    },
    carrier: {
      key: "carrier",
      header: "Carrier",
      width: "w-30",
      render: (item) => item.carrier
    },
    total: {
      key: "total",
      header: "Total",
      width: "w-30",
      render: (item) => formatMoney(item.total)
    },
    paid: {
      key: "paid",
      header: "Paid",
      width: "w-30",
      render: (item) => formatMoney(item.paid)
    },
    unpaid: {
      key: "unpaid",
      header: "Unpaid",
      width: "w-30",
      sortKey: "unpaid",
      render: (item) => formatMoney(unpaid(item))
    },
    requestedOn: {
      key: "requestedOn",
      header: "Requested on",
      width: "w-27.5",
      render: (item) => date(item.requestedOn)
    },
    holdStarted: {
      key: "holdStarted",
      header: "Hold Started",
      width: "w-27.5",
      render: (item) => date(item.holdStarted)
    },
    holdExpires: {
      key: "holdExpires",
      header: "Hold Expires",
      width: "w-27.5",
      render: (item) => date(item.holdExpires)
    },
    daysRemaining: {
      key: "daysRemaining",
      header: "Days Remaining",
      width: "w-32.5",
      render: (item) =>
        item.holdExpires ? `${daysLeft(item.holdExpires)} days left` : "-"
    },
    /* Dev note: the reason is truncated in the grid and shown in full in the Approve and Deny dialogs. */
    reason: {
      key: "reason",
      header: "Reason",
      render: (item) => (
        <span className="block truncate" title={item.reason}>
          {item.reason ?? "-"}
        </span>
      )
    }
  };

  const reviewColumns = [
    columns.firstInvoice,
    columns.openDays,
    columns.job,
    columns.estimate,
    columns.franchise,
    columns.territory,
    columns.owner,
    columns.carrier,
    columns.total,
    columns.paid,
    columns.unpaid
  ];
  /* The Holds grids carry more columns, so they use Figma's narrower widths. */
  const narrow = (column: Column, width: string) => ({ ...column, width });
  /* Dev note: in both Holds grids, Franchise Owner and Franchise come before Job and Estimate. */
  const holdColumns = [
    narrow(columns.owner, "w-32.5"),
    columns.franchise,
    narrow(columns.territory, "w-37.5"),
    columns.job,
    columns.estimate,
    narrow(columns.total, "w-25"),
    narrow(columns.paid, "w-25"),
    narrow(columns.unpaid, "w-25")
  ];
  const columnSets: Partial<Record<Queue, Column[]>> = {
    pending: reviewColumns,
    approved: reviewColumns,
    holdRequest: [...holdColumns, columns.requestedOn, columns.reason],
    hold: [
      ...holdColumns,
      columns.holdStarted,
      columns.holdExpires,
      columns.daysRemaining,
      columns.reason
    ],
    writeoffRequest: [
      columns.job,
      columns.estimate,
      columns.franchise,
      columns.territory,
      columns.owner,
      columns.carrier,
      columns.total,
      columns.paid,
      columns.unpaid,
      columns.requestedOn,
      columns.reason
    ]
  };
  const actionColumnWidths: Partial<Record<Queue, string>> = {
    approved: "w-30",
    holdRequest: "w-55"
  };

  const toggleRow = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );

  const menuItemClasses =
    "gap-1 rounded-none border-b border-neutral-100 px-2 py-1 text-neutral-700 last:border-b-0 [&_svg]:size-4";

  const actionsFor = (item: RoyaltyEstimate) => {
    if (item.queue === "approved") {
      return (
        <button
          type="button"
          className="text-sm whitespace-nowrap text-link underline"
          onClick={() => openAction("undo", item.id)}
        >
          Undo approval
        </button>
      );
    }
    return (
      <div className="flex items-center justify-end gap-2">
        {/* Dev note: Deny and Approve sit on the row because they are the actions Finance uses most. */}
        {item.queue === "holdRequest" && (
          <>
            <Button variant="secondary" onClick={() => openAction("denyHold", item.id)}>
              Deny
            </Button>
            <Button onClick={() => openAction("approveHold", item.id)}>
              Approve
            </Button>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${item.jobName}`}
              className="size-8 shrink-0"
            >
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-auto min-w-45 rounded-lg border border-neutral-200 p-0 ring-0"
          >
            {(rowMenus[item.queue] ?? []).map(({ label, icon: Icon, action }) => (
              <DropdownMenuItem
                key={label}
                className={menuItemClasses}
                onSelect={() =>
                  action === "details"
                    ? setDetailsId(item.id)
                    : openAction(action, item.id)
                }
              >
                <Icon />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const renderGrid = (queue: Queue, rows: RoyaltyEstimate[]) => {
    if (rows.length === 0) {
      return (
        <p className="py-16 text-center text-sm text-neutral-500">
          {emptyMessages[queue]}
        </p>
      );
    }

    const gridColumns = columnSets[queue] ?? [];
    const selectable = queue === "pending";
    const allSelected = rows.every((item) => selected.includes(item.id));
    const toggleAll = () =>
      setSelected(allSelected ? [] : rows.map((item) => item.id));

    return (
      <div className="inside-border w-full overflow-x-auto rounded-md">
        <Table className="table-fixed">
          <colgroup>
            {selectable && <col className="w-10" />}
            {gridColumns.map((column) => (
              <col key={column.key} className={column.width} />
            ))}
            <col className={actionColumnWidths[queue] ?? "w-8"} />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-neutral-50">
              {selectable && (
                <TableHead className="h-11.25 px-2 py-0">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all estimates"
                  />
                </TableHead>
              )}
              {gridColumns.map((column) => (
                <TableHead
                  key={column.key}
                  className="h-11.25 px-2 py-0 text-neutral-600"
                >
                  {column.sortKey ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.sortKey!)}
                      className="flex items-center gap-1"
                    >
                      {column.header}
                      {/* Dev note: only the active sort column shows an arrow. */}
                      {sort.key === column.sortKey &&
                        (sort.dir === "desc" ? (
                          <ArrowDownIcon className="size-4" />
                        ) : (
                          <ArrowUpIcon className="size-4" />
                        ))}
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
              <TableHead className="px-2 py-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((item) => (
              <TableRow
                key={item.id}
                className={cn(selected.includes(item.id) && "bg-primary-25")}
              >
                {selectable && (
                  <TableCell className="h-16 px-2 py-0">
                    <Checkbox
                      checked={selected.includes(item.id)}
                      onCheckedChange={() => toggleRow(item.id)}
                      aria-label={`Select ${item.jobName} ${item.estimate}`}
                    />
                  </TableCell>
                )}
                {gridColumns.map((column) => (
                  <TableCell
                    key={column.key}
                    className="h-16 px-2 py-0 text-neutral-600"
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
                <TableCell className="h-16 px-2 py-0">
                  {actionsFor(item)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const searchField = (
    <div className="relative w-55">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search"
        aria-label="Search by franchise owner, job name or job number"
        className="pl-9 text-sm shadow-none"
      />
    </div>
  );

  const listQueue: Queue = tab === "review" ? view : "writeoffRequest";
  const modalItem = modal?.kind === "action" ? itemById(modal.id) : undefined;
  const detailsItem = detailsId ? itemById(detailsId) : undefined;
  const panelButtons = detailsItem ? (detailsActions[detailsItem.queue] ?? []) : [];

  return (
    <>
      <PageHeader
        title="Royalty Collections"
        actions={
          <nav aria-label="Royalty collection queues" className="flex gap-6">
            {tabs.map(({ id, label }) => {
              const isActive = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => switchTab(id)}
                  className={cn(
                    "flex items-center gap-2 border-b-2 pb-1 text-base",
                    isActive
                      ? "border-primary-100 text-primary-100"
                      : "border-transparent text-neutral-500"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs leading-5",
                      isActive
                        ? "bg-primary-100 text-white"
                        : "bg-neutral-50 text-neutral-500"
                    )}
                  >
                    {tabCounts[id]}
                  </span>
                </button>
              );
            })}
          </nav>
        }
      />

      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-base tracking-widest text-neutral-700 uppercase">
          {sectionTitles[tab]}
        </h2>

        {tab === "holds" ? (
          <>
            <SectionCard title="Pending Hold Requests by Franchises">
              {renderGrid("holdRequest", rowsFor("holdRequest"))}
            </SectionCard>
            <SectionCard title="On Active Hold" actions={searchField}>
              {renderGrid("hold", rowsFor("hold", { bySearch: true }))}
            </SectionCard>
          </>
        ) : (
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 inset-ring-1 inset-ring-border">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <MultiSelectFilter
                  label="Franchise"
                  options={franchiseOptions}
                  value={franchises}
                  onApply={setFranchises}
                  searchable
                />
                {tab === "review" && searchField}
              </div>
              {tab === "writeoff" && searchField}
              {tab === "review" && (
                <div
                  role="group"
                  aria-label="Collection Review view"
                  className="flex gap-0.5 rounded-md bg-neutral-50 p-0.5"
                >
                  {(
                    [
                      ["pending", "Pending Review"],
                      ["approved", "Awaiting Batch"]
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={view === id}
                      onClick={() => {
                        setView(id);
                        setSelected([]);
                      }}
                      className={cn(
                        "rounded-sm px-3 py-1.5 text-base",
                        view === id
                          ? "bg-primary-100 text-white"
                          : "text-neutral-500"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {renderGrid(
              listQueue,
              rowsFor(listQueue, { byFranchise: true, bySearch: true })
            )}
          </div>
        )}
      </div>

      {listQueue === "pending" && selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-md bg-white p-3 shadow-xl inset-ring-1 inset-ring-border">
          <span className="px-2 text-base text-neutral-600">
            {selected.length} {selected.length === 1 ? "estimate" : "estimates"} selected
          </span>
          <Button onClick={() => setModal({ kind: "bulk" })}>
            Approve collections
          </Button>
          <Button variant="ghost" onClick={() => setSelected([])}>
            Cancel
          </Button>
        </div>
      )}

      {modal?.kind === "action" && modalItem && (
        <ActionModal
          key={`${modal.action}-${modal.id}`}
          action={modal.action}
          item={modalItem}
          onClose={() => setModal(null)}
          onConfirm={(reason) => confirmAction(modal.action, modal.id, reason)}
        />
      )}
      {modal?.kind === "bulk" && (
        <BulkApproveModal
          items={items.filter((item) => selected.includes(item.id))}
          onClose={() => setModal(null)}
          onConfirm={confirmBulk}
        />
      )}
      {detailsItem && !modal && (
        <DetailsPanel
          key={detailsItem.id}
          item={detailsItem}
          notes={defaultNotes}
          onClose={() => setDetailsId(null)}
          actions={
            <div className="flex w-full gap-2">
              {panelButtons.map(([label, action], index) => (
                <Button
                  key={action}
                  variant={index < panelButtons.length - 1 ? "secondary" : "default"}
                  className="flex-1"
                  onClick={() => openAction(action, detailsItem.id)}
                >
                  {label}
                </Button>
              ))}
            </div>
          }
        />
      )}
    </>
  );
};

export default RoyaltyCollectionsPage;
