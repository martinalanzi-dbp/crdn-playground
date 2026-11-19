"use client";

import { PageHeader, Pagination, StatusPill } from "@/components/shared";
import { Button } from "@/components/ui/button";
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
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import MultiSelectFilter from "../../_components/MultiSelectFilter/MultiSelectFilter";
import {
  PriceList,
  franchiseOptions,
  priceLists as initialPriceLists,
  pricingPartnerOptions,
  statusOptions,
  zipCodeLabel
} from "../../_data/price-lists";

const base = "/prototype/home-office/price-lists";
const PAGE_SIZE = 10;

const menuItemClasses =
  "gap-1 rounded-none border-b border-neutral-100 px-2 py-1 text-neutral-700 last:border-b-0 [&_svg]:size-4";

const PriceListsPage = () => {
  const [priceLists, setPriceLists] = useState<PriceList[]>(initialPriceLists);
  const [franchises, setFranchises] = useState<string[] | null>(null);
  const [territories, setTerritories] = useState<string[] | null>(null);
  /* Dev note: by default show only the active price lists. */
  const [statuses, setStatuses] = useState<string[] | null>(["Active"]);
  const [partners, setPartners] = useState<string[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* Territory only offers values from the selected franchises. */
  const territoryOptions = useMemo(
    () =>
      priceLists
        .filter((item) => !franchises || franchises.includes(item.franchise))
        .map((item) => item.territory),
    [priceLists, franchises]
  );

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return priceLists.filter(
      (item) =>
        (!franchises || franchises.includes(item.franchise)) &&
        (!territories || territories.includes(item.territory)) &&
        (!statuses || statuses.includes(item.status)) &&
        (!partners || partners.includes(item.pricingPartner)) &&
        /* Dev note: search by ZIP code or price list name. */
        (!term ||
          item.name.toLowerCase().includes(term) ||
          item.zipCode.includes(term))
    );
  }, [priceLists, franchises, territories, statuses, partners, search]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const rows = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* Every filter change goes back to the first page. */
  const applyFilter =
    (setter: (next: string[] | null) => void) => (next: string[] | null) => {
      setter(next);
      setPage(1);
    };

  const markInactive = (slug: string) =>
    setPriceLists((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, status: "Inactive" } : item
      )
    );

  return (
    <>
      <PageHeader
        title="Price List Management"
        actions={
          <Button asChild>
            <NextLink href={`${base}/new`}>Add New Price List</NextLink>
          </Button>
        }
      />

      <div className="p-4">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-4 inset-ring-1 inset-ring-border">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <MultiSelectFilter
                label="Franchise"
                options={franchiseOptions}
                value={franchises}
                onApply={(next) => {
                  applyFilter(setFranchises)(next);
                  setTerritories(null);
                }}
                searchable
              />
              <MultiSelectFilter
                label="Territory"
                options={territoryOptions}
                value={territories}
                onApply={applyFilter(setTerritories)}
                searchable
              />
              <MultiSelectFilter
                label="Price List Status"
                options={statusOptions}
                value={statuses}
                onApply={applyFilter(setStatuses)}
              />
              <MultiSelectFilter
                label="Pricing Partner"
                options={pricingPartnerOptions}
                value={partners}
                onApply={applyFilter(setPartners)}
              />
            </div>

            <div className="relative w-64">
              <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search"
                aria-label={`Search price lists by name or ${zipCodeLabel}`}
                className="pl-9 text-sm shadow-none"
              />
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="flex w-full flex-col items-center gap-4 py-16 text-center">
              <h2 className="text-display-xs text-neutral-700">
                No Price Lists Found
              </h2>
              <p className="text-sm text-neutral-500">
                Try changing the filters or the search.
              </p>
            </div>
          ) : (
            <div className="inside-border w-full overflow-hidden rounded-md">
              {/* Figma: eight equal columns, then a 32px column for the actions menu. */}
              <Table className="table-fixed">
                <colgroup>
                  {Array.from({ length: 8 }, (_, index) => (
                    <col key={index} />
                  ))}
                  <col className="w-8" />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-neutral-50">
                    {[
                      "Price List Name",
                      "Pricing Partner",
                      "Franchise",
                      "Territory",
                      zipCodeLabel,
                      "Last Refreshed",
                      "Default for Territory",
                      "Status"
                    ].map((heading) => (
                      <TableHead
                        key={heading}
                        className="h-11.25 px-2 py-0 text-neutral-600"
                      >
                        {heading}
                      </TableHead>
                    ))}
                    <TableHead className="px-0 py-0">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell className="h-16 px-2 py-0">
                        <NextLink
                          href={`${base}/${item.slug}`}
                          className="text-link underline"
                        >
                          {item.name}
                        </NextLink>
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.pricingPartner}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.franchise}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.territory}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.zipCode}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.lastRefreshed}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.isDefaultForTerritory ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <StatusPill status={item.status} />
                      </TableCell>
                      <TableCell className="h-16 px-0 py-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Actions for ${item.name}`}
                              className="size-8"
                            >
                              <EllipsisVerticalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-37.5 rounded-lg border border-neutral-200 p-0 ring-0"
                          >
                            <DropdownMenuItem asChild className={menuItemClasses}>
                              <NextLink href={`${base}/${item.slug}/edit`}>
                                <PencilIcon />
                                Edit
                              </NextLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className={menuItemClasses}>
                              <NextLink href={`${base}/${item.slug}/copy`}>
                                <DocumentDuplicateIcon />
                                Copy Price List
                              </NextLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className={menuItemClasses}>
                              <NextLink href={`${base}/${item.slug}/bulk-update`}>
                                <ArrowPathIcon />
                                Bulk update
                              </NextLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={menuItemClasses}
                              disabled={item.status === "Inactive"}
                              onSelect={() => markInactive(item.slug)}
                            >
                              <XCircleIcon />
                              Mark as Inactive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default PriceListsPage;
