"use client";

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
  EllipsisVerticalIcon,
  EyeIcon,
  HandRaisedIcon,
  MagnifyingGlassIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import DetailsPanel from "../../../_components/RoyaltyCollections/DetailsPanel";
import MultiSelectFilter from "../../../_components/MultiSelectFilter/MultiSelectFilter";
import {
  ActionModal,
  BulkApproveModal,
  RoyaltyAction
} from "../../../_components/RoyaltyCollections/RoyaltyModals";
import {
  InternalNote,
  RoyaltyEstimate,
  TerritoryStatus,
  addDays,
  currentUser,
  defaultNotes,
  formatDate,
  formatMoney,
  franchiseOptions,
  reached270Date,
  royaltyEstimates,
  todayIso,
  unpaid
} from "../../../_data/royalty-collections";

type Tab = "review" | "holds" | "writeoff";
type View = "pending" | "approved";
type SortKey = "openDays" | "unpaid" | "franchise" | "franchiseOwner";

const base = "/prototype/home-office";

const tabs: { id: Tab; label: string }[] = [
  { id: "review", label: "Collection Review" },
  { id: "holds", label: "Holds" },
  { id: "writeoff", label: "Write-off Review" }
];

const sectionTitles: Record<Tab, string> = {
  review: "Collection Review",
  holds: "Holds",
  writeoff: "Write-off Review"
};

/* Territory badge colours: Active green, Sunsetting amber, Terminated red. */
const territoryBadges: Record<TerritoryStatus, string> = {
  Active: "bg-success-50 text-success-200",
  Sunsetting: "bg-warning-50 text-warning-200",
  Terminated: "bg-error-50 text-error-200"
};

const emptyMessages = {
  pending:
    "No estimates pending collection review. Approved estimates waiting for the next batch are in the Awaiting batch view.",
  approved:
    "Estimates you approve for collection appear here until they're included in the next royalty batch. You can undo an approval while it's listed.",
  holds: "No estimates are on hold.",
  writeoff: "No estimates are waiting for write-off review."
};

interface Column {
  key: string;
  header: string;
  /** Width in Tailwind spacing units (Figma column widths). */
  width: string;
  sortKey?: SortKey;
  render: (item: RoyaltyEstimate) => ReactNode;
}

type ModalState =
  | { kind: "action"; action: RoyaltyAction; id: string }
  | { kind: "bulk" }
  | null;

const RoyaltyCollectionsPage = () => {
  const [items, setItems] = useState<RoyaltyEstimate[]>(royaltyEstimates);
  const [notes, setNotes] = useState<Record<string, InternalNote[]>>({});
  const [tab, setTab] = useState<Tab>("review");
  const [view, setView] = useState<View>("pending");
  const [franchises, setFranchises] = useState<string[] | null>(null);
  const [search, setSearch] = useState("");
  /* Dev note: default sort is Open Days descending, ties broken by Unpaid descending. */
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "openDays",
    dir: "desc"
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const count = (queue: RoyaltyEstimate["queue"]) =>
    items.filter((item) => item.queue === queue).length;
  const tabCounts: Record<Tab, number> = {
    review: count("pending"),
    holds: count("hold"),
    writeoff: count("writeoff")
  };

  const activeQueue =
    tab === "review" ? view : tab === "holds" ? "hold" : "writeoff";

  const rows = useMemo(() => {
    /* Dev note: search covers the franchise owner and the job name or number only. */
    const term = search.trim().toLowerCase();
    const value = (item: RoyaltyEstimate) =>
      sort.key === "unpaid" ? unpaid(item) : item[sort.key];

    return items
      .filter(
        (item) =>
          item.queue === activeQueue &&
          (!franchises || franchises.includes(item.franchise)) &&
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
  }, [items, activeQueue, franchises, search, sort]);

  const itemById = (id: string) => items.find((item) => item.id === id);
  const noteList = (id: string) => notes[id] ?? defaultNotes;

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

  const confirmAction = (action: RoyaltyAction, id: string, reason: string) => {
    const item = itemById(id);
    if (!item) return;

    if (action === "approve") {
      move([id], { queue: "approved" });
      toast.success("Collection approved successfully");
    } else if (action === "hold") {
      /* Dev note: the hold lasts 30 days after the original 270-day date, not from today. */
      move([id], {
        queue: "hold",
        holdEnds: addDays(reached270Date(item) ?? todayIso(), 30)
      });
      /* Dev note: the reason is saved as an internal note by the Home Office user. */
      setNotes((current) => ({
        ...current,
        [id]: [
          { date: todayIso(), author: currentUser, text: reason },
          ...(current[id] ?? defaultNotes)
        ]
      }));
      toast.success("Estimate placed on hold successfully");
    } else if (action === "writeoff") {
      move([id], { queue: "writeoff", writeOffReason: reason });
      toast.success("Estimate written off successfully");
    } else {
      move([id], { queue: "pending" });
      toast.success("Collection approval undone");
    }
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

  const columns: Record<string, Column> = {
    firstInvoice: {
      key: "firstInvoice",
      header: "First Invoice",
      width: "w-25",
      render: (item) => (
        <div className="flex flex-col items-start gap-1">
          {item.firstInvoice ? formatDate(item.firstInvoice) : "-"}
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
    holdEnds: {
      key: "holdEnds",
      header: "Hold Ends",
      width: "w-30",
      render: (item) => (item.holdEnds ? formatDate(item.holdEnds) : "-")
    },
    reason: {
      key: "reason",
      header: "Reason",
      width: "w-60",
      render: (item) => item.writeOffReason ?? "-"
    }
  };

  const columnSets: Record<string, Column[]> = {
    pending: [
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
    ],
    hold: [
      columns.job,
      columns.estimate,
      columns.franchise,
      columns.owner,
      columns.carrier,
      columns.unpaid,
      columns.holdEnds
    ],
    writeoff: [
      columns.job,
      columns.estimate,
      columns.franchise,
      columns.owner,
      columns.unpaid,
      columns.reason
    ]
  };
  columnSets.approved = columnSets.pending;
  const activeColumns = columnSets[activeQueue];
  const selectable = activeQueue === "pending";

  const allSelected = rows.length > 0 && rows.every((item) => selected.includes(item.id));
  const toggleAll = () =>
    setSelected(allSelected ? [] : rows.map((item) => item.id));
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
          onClick={() => setModal({ kind: "action", action: "undo", id: item.id })}
        >
          Undo approval
        </button>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Actions for ${item.jobName}`}
            className="size-8"
          >
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-auto min-w-45 rounded-lg border border-neutral-200 p-0 ring-0"
        >
          <DropdownMenuItem
            className={menuItemClasses}
            onSelect={() => setDetailsId(item.id)}
          >
            <EyeIcon />
            Details
          </DropdownMenuItem>
          {item.queue === "pending" && (
            <>
              <DropdownMenuItem
                className={menuItemClasses}
                onSelect={() => setModal({ kind: "action", action: "approve", id: item.id })}
              >
                <CheckCircleIcon />
                Approve collections
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItemClasses}
                onSelect={() => setModal({ kind: "action", action: "hold", id: item.id })}
              >
                <HandRaisedIcon />
                Place on Hold
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItemClasses}
                onSelect={() => setModal({ kind: "action", action: "writeoff", id: item.id })}
              >
                <XCircleIcon />
                Write-off
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const modalItem = modal?.kind === "action" ? itemById(modal.id) : undefined;
  const detailsItem = detailsId ? itemById(detailsId) : undefined;

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 inside-border-b">
        <h1 className="py-1 text-display-sm text-neutral-700">
          Royalty Collections
        </h1>
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
      </div>

      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-base tracking-widest text-neutral-700 uppercase">
          {sectionTitles[tab]}
        </h2>

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
            </div>
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

          {rows.length === 0 ? (
            <p className="py-16 text-center text-sm text-neutral-500">
              {tab === "review" ? emptyMessages[view] : emptyMessages[tab]}
            </p>
          ) : (
            <div className="inside-border w-full overflow-x-auto rounded-md">
              <Table className="table-fixed">
                <colgroup>
                  {selectable && <col className="w-10" />}
                  {activeColumns.map((column) => (
                    <col key={column.key} className={column.width} />
                  ))}
                  <col className={activeQueue === "approved" ? "w-30" : "w-8"} />
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
                    {activeColumns.map((column) => (
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
                      {activeColumns.map((column) => (
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
          )}
        </div>
      </div>

      {selectable && selected.length > 0 && (
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
          notes={noteList(detailsItem.id)}
          onClose={() => setDetailsId(null)}
          onApprove={() =>
            setModal({ kind: "action", action: "approve", id: detailsItem.id })
          }
          onMoveToLegal={() => {
            toast.success("Estimate moved to legal");
            setDetailsId(null);
          }}
        />
      )}
    </>
  );
};

export default RoyaltyCollectionsPage;
