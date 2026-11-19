"use client";

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
  ChevronDownIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface MultiSelectFilterProps {
  label: string;
  options: string[];
  /** Applied selection. `null` means every option (shown as "All"). */
  value: string[] | null;
  onApply: (next: string[] | null) => void;
  /** Adds the search box and Select All / Clear links (Franchise, Territory). */
  searchable?: boolean;
}

const summarize = (value: string[] | null) => {
  if (value === null) return "All";
  return value.length === 1 ? value[0] : `${value.length} Selected`;
};

/** Filter button with a checkbox popover and Cancel / Apply Filters (Figma "Filters" dropdown). */
const MultiSelectFilter = ({
  label,
  options,
  value,
  onApply,
  searchable
}: MultiSelectFilterProps) => {
  const applied = value ?? options;
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(applied);
  const [search, setSearch] = useState("");

  const handleOpenChange = (open: boolean) => {
    // Reopening starts from the applied selection, so Cancel and outside click discard changes.
    if (open) {
      setDraft(applied);
      setSearch("");
    }
    setIsOpen(open);
  };

  const visible = options.filter((option) =>
    option.toLowerCase().includes(search.trim().toLowerCase())
  );
  const isUnchanged =
    draft.length === applied.length &&
    draft.every((option) => applied.includes(option));

  const toggle = (option: string) =>
    setDraft((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );

  const apply = () => {
    onApply(draft.length === options.length ? null : draft);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="pr-3 pl-4">
          <span>
            <span className="text-neutral-500">{label}:</span>{" "}
            {summarize(value)}
          </span>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-fit min-w-55 gap-0 rounded-2xl border border-neutral-200 p-0"
      >
        {searchable && (
          <>
            <div className="bg-neutral-50/50 px-2 py-3 inside-border-b">
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search"
                  aria-label={`Search ${label}`}
                  className="pl-9 text-sm shadow-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-sm font-medium tracking-widest text-primary-50 uppercase inside-border-b">
              <button type="button" onClick={() => setDraft(options)}>
                Select All
              </button>
              <button type="button" onClick={() => setDraft([])}>
                Clear
              </button>
            </div>
          </>
        )}
        <div className="max-h-80 overflow-y-auto">
          {visible.map((option) => (
            <Label
              key={option}
              className="h-10 gap-2 border-b border-border px-2 text-sm font-normal"
            >
              <Checkbox
                checked={draft.includes(option)}
                onCheckedChange={() => toggle(option)}
              />
              {option}
            </Label>
          ))}
        </div>
        <div className="flex gap-2 bg-neutral-50/50 px-2 py-3">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            disabled={isUnchanged || draft.length === 0}
            onClick={apply}
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectFilter;
