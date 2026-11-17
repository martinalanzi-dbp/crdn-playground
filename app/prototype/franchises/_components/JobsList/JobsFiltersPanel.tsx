"use client";

import { FormField, SidePanel } from "@/components/shared";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  carrierOptions,
  franchiseOptions,
  franchises,
  jobs,
  regionOptions
} from "../../_data/jobs";

export interface JobFilters {
  carrier?: string;
  region?: string;
  franchises: string[];
  territory?: string;
  adjuster?: string;
  contractor?: string;
}

export const emptyFilters: JobFilters = { franchises: [] };

export const hasFilters = (filters: JobFilters) =>
  Boolean(
    filters.carrier ||
      filters.region ||
      filters.franchises.length ||
      filters.territory ||
      filters.adjuster ||
      filters.contractor
  );

/** Select that can be reset, since Radix Select cannot hold an empty value once chosen. */
const FilterSelect = ({
  id,
  value,
  placeholder,
  options,
  disabled,
  onChange
}: {
  id: string;
  value?: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) => (
  <Select value={value ?? ""} onValueChange={onChange} disabled={disabled}>
    <SelectTrigger id={id}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

/** Multi-select with a search box (dev note: the Franchise filter supports multi-selection and search). */
const FranchiseSelect = ({
  value,
  disabled,
  onChange
}: {
  value: string[];
  disabled: boolean;
  onChange: (value: string[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const visible = franchiseOptions.filter((option) =>
    option.toLowerCase().includes(search.trim().toLowerCase())
  );
  const toggle = (option: string) =>
    onChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option]
    );

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          id="jobs-filter-franchise"
          type="button"
          disabled={disabled}
          className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-white px-3 text-sm text-neutral-900 shadow-xs outline-none hover:border-neutral-300 focus-visible:border-primary-100 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-neutral-100"
        >
          <span className={value.length ? "truncate" : "text-neutral-500"}>
            {value.length ? value.join(", ") : "Select franchise"}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) gap-0 rounded-2xl border border-neutral-200 p-0"
      >
        <div className="relative bg-neutral-50/50 p-2 inside-border-b">
          <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            aria-label="Search franchises"
            className="pl-9 text-sm shadow-none"
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {visible.map((option) => (
            <Label
              key={option}
              className="h-10 gap-2 border-b border-border px-2 text-sm font-normal"
            >
              <Checkbox
                checked={value.includes(option)}
                onCheckedChange={() => toggle(option)}
              />
              {option}
            </Label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface JobsFiltersPanelProps {
  value: JobFilters;
  onApply: (filters: JobFilters) => void;
  onClose: () => void;
}

/** "Filters" side panel of the Jobs list. Mount it with a `key` so each open starts from the applied filters. */
const JobsFiltersPanel = ({ value, onApply, onClose }: JobsFiltersPanelProps) => {
  const [draft, setDraft] = useState<JobFilters>(value);
  const set = (changes: Partial<JobFilters>) =>
    setDraft((current) => ({ ...current, ...changes }));

  /* Dev notes: selecting a Region clears and disables Franchise and Territory. */
  const regionActive = Boolean(draft.region);
  /* Dev notes: with several franchises selected the Territory filter is disabled. */
  const multipleFranchises = draft.franchises.length > 1;
  const territoryOptions =
    draft.franchises.length === 1
      ? franchises[draft.franchises[0]].territories
      : Object.values(franchises).flatMap((franchise) => franchise.territories);
  const territoryDisabled = regionActive || multipleFranchises;

  const isUnchanged = JSON.stringify(draft) === JSON.stringify(value);

  const names = (field: "adjuster" | "contractor") =>
    Array.from(new Set(jobs.map((job) => job[field])));

  return (
    <SidePanel
      open
      onOpenChange={(open) => !open && onClose()}
      title="Filters"
      description="Filter the jobs list by carrier, region, franchise, territory, adjuster or contractor."
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isUnchanged} onClick={() => onApply(draft)}>
            Apply Filters
          </Button>
        </>
      }
    >
      <FormField label="Carrier" htmlFor="jobs-filter-carrier">
        <FilterSelect
          id="jobs-filter-carrier"
          value={draft.carrier}
          placeholder="Select carrier"
          options={carrierOptions}
          onChange={(carrier) => set({ carrier })}
        />
      </FormField>

      {/* Dev notes: the Region filter is a single-select, visible only to Home Office users. */}
      <FormField label="Region" htmlFor="jobs-filter-region">
        <FilterSelect
          id="jobs-filter-region"
          value={draft.region}
          placeholder="Select region"
          options={regionOptions}
          onChange={(region) => set({ region, franchises: [], territory: undefined })}
        />
      </FormField>

      <FormField label="Franchise" htmlFor="jobs-filter-franchise">
        <FranchiseSelect
          value={draft.franchises}
          disabled={regionActive}
          onChange={(selected) =>
            set({
              franchises: selected,
              territory: selected.length === 1 ? draft.territory : undefined
            })
          }
        />
      </FormField>

      <FormField label="Territory" htmlFor="jobs-filter-territory">
        <FilterSelect
          id="jobs-filter-territory"
          value={draft.territory}
          placeholder="Select territory"
          options={territoryOptions}
          disabled={territoryDisabled}
          onChange={(territory) => set({ territory })}
        />
        {multipleFranchises && (
          <p className="text-xs text-neutral-500">
            Territory is disabled when multiple franchises are selected.
          </p>
        )}
      </FormField>

      {/* Dev notes: Adjuster and Contractor are typeahead fields (both are Contacts). */}
      <FormField label="Adjuster" htmlFor="jobs-filter-adjuster">
        <Input
          id="jobs-filter-adjuster"
          list="jobs-adjusters"
          value={draft.adjuster ?? ""}
          onChange={(event) => set({ adjuster: event.target.value })}
          placeholder="Enter adjuster name"
          className="text-sm"
        />
        <datalist id="jobs-adjusters">
          {names("adjuster").map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </FormField>

      <FormField label="Contractor" htmlFor="jobs-filter-contractor">
        <Input
          id="jobs-filter-contractor"
          list="jobs-contractors"
          value={draft.contractor ?? ""}
          onChange={(event) => set({ contractor: event.target.value })}
          placeholder="Enter contractor name"
          className="text-sm"
        />
        <datalist id="jobs-contractors">
          {names("contractor").map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </FormField>
    </SidePanel>
  );
};

export default JobsFiltersPanel;
