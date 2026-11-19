"use client";

import { PageHeader, StatusPill } from "@/components/shared";
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
  CheckCircleIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CarrierPanel, {
  CarrierFormValues
} from "../../_components/CarrierPanel/CarrierPanel";
import MultiSelectFilter from "../../_components/MultiSelectFilter/MultiSelectFilter";
import {
  Carrier,
  CarrierStatus,
  carrierStatusOptions,
  carriers as initialCarriers,
  formatDate,
  todayIso
} from "../../_data/carriers";

/* Which side panel is open: adding a new carrier, or editing an existing one. */
type PanelState = { mode: "add" } | { mode: "edit"; carrier: Carrier } | null;

const menuItemClasses =
  "gap-1 rounded-none border-b border-neutral-100 px-2 py-1 text-neutral-700 last:border-b-0 [&_svg]:size-4";

const CarriersPage = () => {
  const [carriers, setCarriers] = useState<Carrier[]>(initialCarriers);
  /* Dev note: by default only active carriers are shown. */
  const [statuses, setStatuses] = useState<string[] | null>(["Active"]);
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState<PanelState>(null);

  /* Dev note: carriers are ordered alphabetically by name. */
  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return carriers
      .filter(
        (item) =>
          (!statuses || statuses.includes(item.status)) &&
          (!term || item.name.toLowerCase().includes(term))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [carriers, statuses, search]);

  const setStatus = (id: string, status: CarrierStatus, name: string) => {
    setCarriers((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
    toast.success(
      `${name} successfully ${status === "Active" ? "activated" : "deactivated"}!`
    );
  };

  const handleSubmit = (values: CarrierFormValues) => {
    if (panel?.mode === "edit") {
      const { id } = panel.carrier;
      setCarriers((current) =>
        current.map((item) => (item.id === id ? { ...item, ...values } : item))
      );
      toast.success("Carrier successfully edited!");
    } else {
      /* Dev note: a new carrier is created as Active, dated today. */
      setCarriers((current) => [
        ...current,
        {
          id: `${values.name.toLowerCase().replace(/\s+/g, "-")}-${current.length}`,
          name: values.name,
          status: "Active",
          createdAt: todayIso(),
          defaultPricingSystem: values.defaultPricingSystem
        }
      ]);
      toast.success(`${values.name} successfully added`);
    }
    setPanel(null);
  };

  return (
    <>
      <PageHeader
        title="Carriers"
        actions={
          <Button onClick={() => setPanel({ mode: "add" })}>
            Add New Carrier
          </Button>
        }
      />

      <div className="p-4">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 inset-ring-1 inset-ring-border">
          <div className="flex w-full items-center justify-between">
            <MultiSelectFilter
              label="Carrier Status"
              options={carrierStatusOptions}
              value={statuses}
              onApply={setStatuses}
            />
            <div className="relative w-64">
              <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                aria-label="Search carriers by name"
                className="pl-9 text-sm shadow-none"
              />
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="flex w-full flex-col items-center gap-2 py-16 text-center">
              <h2 className="text-display-xs text-neutral-700">
                No Carriers Found
              </h2>
              <p className="text-sm text-neutral-500">
                Try changing the status filter or the search.
              </p>
            </div>
          ) : (
            <div className="inside-border w-full overflow-hidden rounded-md">
              {/* Figma: three equal columns plus a narrow one for the actions menu. */}
              <Table className="table-fixed">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col className="w-12" />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-neutral-50">
                    {["Carrier Name", "Status", "Creation Date"].map(
                      (heading) => (
                        <TableHead
                          key={heading}
                          className="h-11.25 px-2 py-0 text-neutral-600"
                        >
                          {heading}
                        </TableHead>
                      )
                    )}
                    <TableHead className="px-2 py-0">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {item.name}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
                        <StatusPill status={item.status} />
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0 text-neutral-600">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell className="h-16 px-2 py-0">
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
                            className="w-auto min-w-37.5 rounded-lg border border-neutral-200 p-0 ring-0"
                          >
                            {/* Dev note: an inactive carrier cannot be edited; the only action is to reactivate it. */}
                            {item.status === "Active" ? (
                              <>
                                <DropdownMenuItem
                                  className={menuItemClasses}
                                  onSelect={() =>
                                    setPanel({ mode: "edit", carrier: item })
                                  }
                                >
                                  <PencilIcon />
                                  Edit Carrier
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={menuItemClasses}
                                  onSelect={() =>
                                    setStatus(item.id, "Inactive", item.name)
                                  }
                                >
                                  <XCircleIcon />
                                  Mark as Inactive
                                </DropdownMenuItem>
                              </>
                            ) : (
                              <DropdownMenuItem
                                className={menuItemClasses}
                                onSelect={() =>
                                  setStatus(item.id, "Active", item.name)
                                }
                              >
                                <CheckCircleIcon />
                                Activate Carrier
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {panel && (
        <CarrierPanel
          key={panel.mode === "edit" ? panel.carrier.id : "add"}
          carrier={panel.mode === "edit" ? panel.carrier : null}
          allCarriers={carriers}
          onSubmit={handleSubmit}
          onClose={() => setPanel(null)}
        />
      )}
    </>
  );
};

export default CarriersPage;
