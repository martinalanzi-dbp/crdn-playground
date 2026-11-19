"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import { deadlineBadges, kpis, tipItems } from "../../_data/tip";

const headings = [
  "Job",
  "Assignment",
  "Program",
  "Next Step",
  "Due Date",
  "Deadline",
  "Carrier",
  "Franchise"
];

/* Only the sample job has an Assignments screen, so every assignment link opens it. */
const assignmentsPath =
  "/prototype/franchises/jobs/schumacher-michael/assignments";

const TipDashboard = () => {
  const [items, setItems] = useState(tipItems);
  const [search, setSearch] = useState("");
  const [showCrdnFilter, setShowCrdnFilter] = useState(true);

  /* Dev notes from Figma: ordered by Due Date ascending; the dashboard shows only open assignments. */
  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items
      .filter(
        (item) =>
          !term ||
          [item.job, item.assignment, item.program, item.carrier, item.franchise]
            .join(" ")
            .toLowerCase()
            .includes(term)
      )
      .sort((a, b) => {
        if (a.dueAt === b.dueAt) return 0;
        if (a.dueAt === null) return 1;
        if (b.dueAt === null) return -1;
        return a.dueAt.localeCompare(b.dueAt);
      });
  }, [items, search]);

  const markCompleted = (id: string) =>
    setItems((current) => current.filter((item) => item.id !== id));

  return (
    <div className="p-4">
      <section className="overflow-hidden rounded-3xl bg-white inset-ring-1 inset-ring-border">
        <div className="flex items-center justify-between p-4 inside-border-b">
          <div className="flex items-center">
            {showCrdnFilter && (
              <Badge
                variant="secondary"
                className="h-auto gap-1 rounded-md bg-neutral-50 px-2 py-1 text-sm font-medium text-neutral-500"
              >
                CRDN Jobs Excluded
                <button
                  type="button"
                  aria-label="Remove CRDN Jobs Excluded filter"
                  onClick={() => setShowCrdnFilter(false)}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <XMarkIcon className="size-3" />
                </button>
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                aria-label="Search TIP items"
                className="pl-9 text-sm shadow-none"
              />
            </div>
            <Button
              variant="secondary"
              className="pr-4 pl-3"
              onClick={() => setItems(tipItems)}
            >
              <ArrowPathIcon />
              Refresh
            </Button>
            <Button variant="secondary" size="icon-sm" aria-label="Filters">
              <FunnelIcon />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4">
          <div className="grid grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.title}
                className="flex items-center gap-4 rounded-3xl bg-white p-4 text-center inset-ring-1 inset-ring-border"
              >
                <p className="w-25 text-display-md text-neutral-700">
                  {kpi.value}
                </p>
                <div className="flex flex-col gap-1.5 text-left text-xs leading-[1.4] tracking-widest whitespace-nowrap uppercase">
                  <p className="text-neutral-400">{kpi.title}</p>
                  <p className={`font-bold ${kpi.subtitleClassName}`}>
                    {kpi.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="inside-border w-full overflow-hidden rounded-md">
            {/* Figma column widths: the action column is 196, the rest follow the design proportions. */}
            <Table className="table-fixed">
              <colgroup>
                <col className="w-38" />
                <col className="w-23.25" />
                <col className="w-41.625" />
                <col className="w-34.75" />
                <col className="w-41.625" />
                <col className="w-41.625" />
                <col className="w-41.625" />
                <col className="w-32.5" />
                <col className="w-49" />
              </colgroup>
              <TableHeader>
                <TableRow className="hover:bg-neutral-50">
                  {headings.map((heading) => (
                    <TableHead
                      key={heading}
                      className="h-11.25 px-2 py-0 text-neutral-600"
                    >
                      {heading}
                    </TableHead>
                  ))}
                  <TableHead className="px-2 py-0">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((item) => {
                  const badge = deadlineBadges[item.deadline];
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.job}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <NextLink
                          href={assignmentsPath}
                          className="text-link underline"
                        >
                          {item.assignment}
                        </NextLink>
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.program}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.nextStep}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.dueLabel}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <Badge
                          className={`h-6 px-2 py-1 font-normal ${badge.className}`}
                        >
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.carrier}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.franchise}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <Button
                          variant="secondary"
                          className="w-full"
                          onClick={() => markCompleted(item.id)}
                        >
                          Mark as Completed
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TipDashboard;
