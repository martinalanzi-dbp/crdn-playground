"use client";

import { Pagination, StatusPill } from "@/components/shared";
import type { StatusPillType } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
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
  ChevronDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import DateRangeCalendar, {
  DateRange
} from "../../_components/JobsList/DateRangeCalendar";
import JobsEmptyState from "../../_components/JobsList/JobsEmptyState";
import JobsFiltersPanel, {
  JobFilters,
  emptyFilters,
  hasFilters
} from "../../_components/JobsList/JobsFiltersPanel";
import {
  JobListItem,
  formatDateTime,
  jobStatusOptions,
  jobs
} from "../../_data/jobs";

const PAGE_SIZE = 10;
/* Only the sample job has detail screens, so every row opens it. */
const jobPath = "/prototype/franchises/jobs/schumacher-michael/assignments";

type StatusFilter = "All" | StatusPillType;
type DatePreset = "All" | "Last 3 months" | "Last 6 months" | "Custom Range";
type SearchMode = "Contains" | "Starts with";
type SortKey = "homeowner" | "lossReported" | "status" | "carrier" | "contractor";

const statusOptions: StatusFilter[] = ["All", ...jobStatusOptions];
const datePresets: DatePreset[] = ["All", "Last 3 months", "Last 6 months", "Custom Range"];

const columns: { key: SortKey | "assignments"; header: string }[] = [
  { key: "homeowner", header: "Homeowner" },
  { key: "lossReported", header: "Loss Reported" },
  { key: "status", header: "Job Status" },
  { key: "carrier", header: "Carrier Name" },
  { key: "contractor", header: "Contractor" },
  { key: "assignments", header: "Assignments" }
];

const dateLabel = (preset: DatePreset, range: DateRange | null) => {
  if (preset !== "Custom Range" || !range) return preset;
  const format = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${format(range.from)} – ${format(range.to)}`;
};

/** Filter button that opens a short list of options (Figma "Dropdown Menu"). */
const OptionMenu = <T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="pr-3 pl-4">
        <span>
          <span className="text-neutral-500">{label}:</span> {value}
        </span>
        <ChevronDownIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      className="w-auto min-w-45 rounded-lg border border-neutral-200 p-0 ring-0"
    >
      {options.map((option) => (
        <DropdownMenuItem
          key={option}
          onSelect={() => onChange(option)}
          className={cn(
            "rounded-none border-b border-neutral-100 px-2 py-1 text-neutral-700 last:border-b-0",
            option === value && "bg-neutral-50"
          )}
        >
          {option}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

/* Shows the first two types; the rest collapse into a "+N" chip. */
const AssignmentsCell = ({ job }: { job: JobListItem }) => {
  const extra = job.assignments.length - 2;
  return (
    <span className="flex items-center gap-2">
      <span className="truncate">{job.assignments.slice(0, 2).join(", ")}</span>
      {extra > 0 && (
        <Badge className="h-6 bg-neutral-50 px-2 font-normal text-neutral-500">
          +{extra}
        </Badge>
      )}
    </span>
  );
};

const JobsPage = () => {
  const [status, setStatus] = useState<StatusFilter>("Active");
  const [datePreset, setDatePreset] = useState<DatePreset>("Last 6 months");
  const [range, setRange] = useState<DateRange | null>(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateView, setDateView] = useState<"menu" | "calendar">("menu");
  const [searchMode, setSearchMode] = useState<SearchMode>("Contains");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<JobFilters>(emptyFilters);
  const [panelOpen, setPanelOpen] = useState(false);
  /* Dev notes: all columns sort except Assignments, and only one sort arrow shows at a time. */
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "homeowner",
    dir: "asc"
  });
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const now = new Date();
    const since = (months: number) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - months);
      return date;
    };
    const term = search.trim().toLowerCase();
    const matches = (text: string) =>
      searchMode === "Contains"
        ? text.toLowerCase().includes(term)
        : text.toLowerCase().startsWith(term);

    return jobs
      .filter((job) => {
        const lossDate = new Date(job.lossReported);
        if (status !== "All" && job.status !== status) return false;
        if (datePreset === "Last 3 months" && lossDate < since(3)) return false;
        if (datePreset === "Last 6 months" && lossDate < since(6)) return false;
        if (datePreset === "Custom Range" && range) {
          const end = new Date(range.to);
          end.setHours(23, 59, 59, 999);
          if (lossDate < range.from || lossDate > end) return false;
        }
        /* Dev notes: with a Region applied, Franchise and Territory do not affect the results. */
        if (filters.carrier && job.carrier !== filters.carrier) return false;
        if (filters.region) {
          if (job.region !== filters.region) return false;
        } else {
          if (filters.franchises.length && !filters.franchises.includes(job.franchise)) return false;
          if (filters.territory && job.territory !== filters.territory) return false;
        }
        if (filters.adjuster && !job.adjuster.toLowerCase().includes(filters.adjuster.toLowerCase())) return false;
        if (filters.contractor && !job.contractor.toLowerCase().includes(filters.contractor.toLowerCase())) return false;
        return !term || matches(job.homeowner) || matches(job.carrier) || matches(job.contractor);
      })
      .sort((a, b) => {
        const order = String(a[sort.key]).localeCompare(String(b[sort.key]));
        return sort.dir === "asc" ? order : -order;
      });
  }, [status, datePreset, range, searchMode, search, filters, sort]);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => setPage(1);
  const toggleSort = (key: SortKey) => {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
    reset();
  };

  /* Applied filters show as removable chips above the table. */
  const chips: { label: string; clear: () => void }[] = [];
  const addChip = (label: string, clear: Partial<JobFilters>) =>
    chips.push({ label, clear: () => { setFilters({ ...filters, ...clear }); reset(); } });
  if (filters.carrier) addChip(`Carrier: ${filters.carrier}`, { carrier: undefined });
  if (filters.region) addChip(`Region: ${filters.region}`, { region: undefined });
  if (filters.franchises.length) addChip(`Franchise: ${filters.franchises.join(", ")}`, { franchises: [], territory: undefined });
  if (filters.territory) addChip(`Territory: ${filters.territory}`, { territory: undefined });
  if (filters.adjuster) addChip(`Adjuster: ${filters.adjuster}`, { adjuster: undefined });
  if (filters.contractor) addChip(`Contractor: ${filters.contractor}`, { contractor: undefined });

  return (
    <>
      <div className="flex items-center justify-between p-4 full-bleed-bar">
        <div>
          <h1 className="text-display-sm text-neutral-700">Jobs</h1>
          <p className="text-base text-neutral-500">
            Find below the details of all existing jobs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Item and Container Search</Button>
          <Button>New Job</Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 inset-ring-1 inset-ring-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <OptionMenu
                label="Job Status"
                value={status}
                options={statusOptions}
                onChange={(next) => {
                  setStatus(next);
                  reset();
                }}
              />
              <Popover
                open={dateOpen}
                onOpenChange={(open) => {
                  setDateOpen(open);
                  if (open) setDateView("menu");
                }}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="pr-3 pl-4">
                    <span>
                      <span className="text-neutral-500">Date:</span>{" "}
                      {dateLabel(datePreset, range)}
                    </span>
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={4}
                  className={cn(
                    "gap-0 rounded-lg border border-neutral-200 p-0",
                    dateView === "menu" ? "w-auto min-w-45" : "w-auto"
                  )}
                >
                  {dateView === "menu" ? (
                    datePresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          if (preset === "Custom Range") {
                            setDateView("calendar");
                            return;
                          }
                          setDatePreset(preset);
                          setDateOpen(false);
                          reset();
                        }}
                        className={cn(
                          "border-b border-neutral-100 px-2 py-1 text-left text-sm text-neutral-700 last:border-b-0 hover:bg-neutral-50",
                          preset === datePreset && "bg-neutral-50"
                        )}
                      >
                        {preset}
                      </button>
                    ))
                  ) : (
                    <DateRangeCalendar
                      value={range}
                      onCancel={() => setDateOpen(false)}
                      onApply={(next) => {
                        setRange(next);
                        setDatePreset("Custom Range");
                        setDateOpen(false);
                        reset();
                      }}
                    />
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-r-none pr-3 pl-4 text-sm">
                      {searchMode}
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-auto min-w-35 rounded-lg border border-neutral-200 p-0 ring-0"
                  >
                    {(["Contains", "Starts with"] as SearchMode[]).map((mode) => (
                      <DropdownMenuItem
                        key={mode}
                        onSelect={() => setSearchMode(mode)}
                        className="rounded-none border-b border-neutral-100 px-2 py-1 text-neutral-700 last:border-b-0"
                      >
                        {mode}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-56">
                  <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      reset();
                    }}
                    placeholder="Search"
                    aria-label="Search jobs by homeowner, carrier or contractor"
                    className="rounded-l-none pl-9 text-sm shadow-none"
                  />
                </div>
              </div>
              <Button
                variant="secondary"
                size="icon-sm"
                aria-label="Filters"
                onClick={() => setPanelOpen(true)}
              >
                <FunnelIcon />
              </Button>
            </div>
          </div>

          {hasFilters(filters) && (
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <Badge
                  key={chip.label}
                  variant="secondary"
                  className="h-auto gap-1 rounded-md bg-neutral-50 px-2 py-1 text-sm font-medium text-neutral-500"
                >
                  {chip.label}
                  <button
                    type="button"
                    aria-label={`Remove filter ${chip.label}`}
                    onClick={chip.clear}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <XMarkIcon className="size-3" />
                  </button>
                </Badge>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFilters(emptyFilters);
                  reset();
                }}
                className="text-sm text-link underline"
              >
                Clear all
              </button>
            </div>
          )}

          {rows.length === 0 ? (
            <div className="inside-border rounded-md">
              <JobsEmptyState
                title="No jobs match your filters"
                description="There are no jobs for the current filters. Change or clear them to see results."
              />
            </div>
          ) : (
            <div className="inside-border w-full overflow-hidden rounded-md">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow className="hover:bg-neutral-50">
                    {columns.map(({ key, header }) => (
                      <TableHead key={key} className="h-11.25 px-2 py-0 text-neutral-600">
                        {key === "assignments" ? (
                          header
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleSort(key)}
                            className="flex items-center gap-1"
                          >
                            {header}
                            {sort.key === key &&
                              (sort.dir === "asc" ? (
                                <ArrowDownIcon className="size-4" />
                              ) : (
                                <ArrowUpIcon className="size-4" />
                              ))}
                          </button>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        <NextLink href={jobPath} className="text-link underline">
                          {job.homeowner}
                        </NextLink>
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {formatDateTime(job.lossReported)}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <StatusPill status={job.status} />
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">{job.carrier}</TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">{job.contractor}</TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        <AssignmentsCell job={job} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {rows.length > 0 && (
            <div className="flex justify-center">
              <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
            </div>
          )}
        </div>
      </div>

      {panelOpen && (
        <JobsFiltersPanel
          value={filters}
          onClose={() => setPanelOpen(false)}
          onApply={(next) => {
            setFilters(next);
            setPanelOpen(false);
            reset();
          }}
        />
      )}
    </>
  );
};

export default JobsPage;
