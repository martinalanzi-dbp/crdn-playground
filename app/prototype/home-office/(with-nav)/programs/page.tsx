"use client";

import { PageHeader, Pagination, StatusPill } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import { useProgramStatusOverrides } from "../../_data/program-status";
import { Program, ProgramStatus, programs } from "../../_data/programs";

const base = "/prototype/home-office/programs";
const PAGE_SIZE = 10;
const statusOrder: ProgramStatus[] = ["Draft", "Active", "Inactive"];
const filterOptions: ProgramStatus[] = ["Active", "Draft", "Inactive"];

/* Dev notes from Figma: Draft first, then Active, then Inactive; each group A-Z by name. */
const sortPrograms = (list: Program[]) =>
  [...list].sort(
    (a, b) =>
      statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status) ||
      a.name.localeCompare(b.name)
  );

const ProgramsPage = () => {
  const { overrides } = useProgramStatusOverrides();
  const [appliedStatuses, setAppliedStatuses] = useState<ProgramStatus[]>([
    "Active",
    "Draft"
  ]);
  const [draftStatuses, setDraftStatuses] =
    useState<ProgramStatus[]>(appliedStatuses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sortPrograms(
      programs
        .map((item) => ({
          ...item,
          status: overrides[item.slug] ?? item.status
        }))
        .filter(
          (item) =>
            appliedStatuses.includes(item.status) &&
            (!term ||
              item.name.toLowerCase().includes(term) ||
              item.carrier.toLowerCase().includes(term))
        )
    );
  }, [appliedStatuses, search, overrides]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const rows = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleDraftStatus = (status: ProgramStatus) =>
    setDraftStatuses((current) =>
      current.includes(status)
        ? current.filter((item) => item !== status)
        : [...current, status]
    );

  const handleFilterOpenChange = (open: boolean) => {
    // Reopening starts from the applied selection, so Cancel and outside click discard changes.
    if (open) setDraftStatuses(appliedStatuses);
    setIsFilterOpen(open);
  };

  const applyFilters = () => {
    setAppliedStatuses(draftStatuses);
    setPage(1);
    setIsFilterOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Programs"
        actions={
          <Button asChild>
            <NextLink href={`${base}/new`}>Add New Program</NextLink>
          </Button>
        }
      />

      <div className="p-4">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-4 inset-ring-1 inset-ring-border">
          <div className="flex w-full items-center justify-between">
            <Popover open={isFilterOpen} onOpenChange={handleFilterOpenChange}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="pr-3 pl-4">
                  <span>
                    <span className="text-neutral-500">Program Status:</span>{" "}
                    {appliedStatuses.length} Selected
                  </span>
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={4}
                className="w-fit min-w-(--radix-popover-trigger-width) gap-0 p-0"
              >
                {filterOptions.map((status) => (
                  <Label
                    key={status}
                    className="h-10 gap-2 border-b border-border px-3 text-sm font-normal"
                  >
                    <Checkbox
                      checked={draftStatuses.includes(status)}
                      onCheckedChange={() => toggleDraftStatus(status)}
                    />
                    {status}
                  </Label>
                ))}
                <div className="flex gap-2 px-2 py-3">
                  <Button
                    variant="outline"
                    onClick={() => handleFilterOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <div className="relative w-64">
              <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search"
                aria-label="Search programs by name or carrier"
                className="pl-9 shadow-none"
              />
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="flex w-full flex-col items-center gap-4 py-16 text-center">
              <h2 className="text-display-xs text-neutral-700">
                No Programs Listed
              </h2>
              <p className="text-sm text-neutral-500">
                Your programs list is empty. Add a new one below.
              </p>
              <Button asChild>
                <NextLink href={`${base}/new`}>Add New Program</NextLink>
              </Button>
            </div>
          ) : (
            <div className="inside-border w-full overflow-hidden rounded-md">
              {/* Figma column widths: name 280, carrier 209, the other four share the rest equally. */}
              <Table className="table-fixed">
                <colgroup>
                  <col className="w-70" />
                  <col className="w-52.25" />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-neutral-50">
                    {[
                      "Program Name",
                      "Carrier",
                      "Status",
                      "Pricing Type",
                      "Start Date",
                      "End Date"
                    ].map((heading) => (
                      <TableHead
                        key={heading}
                        className={cn("h-11.25 px-2 py-0 text-neutral-600", "")}
                      >
                        {heading}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        <NextLink
                          href={`${base}/${item.slug}`}
                          className="text-link underline"
                        >
                          {item.name}
                        </NextLink>
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.carrier}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <StatusPill status={item.status} />
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.pricingType}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.startDate}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.endDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {visible.length > 0 && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProgramsPage;
