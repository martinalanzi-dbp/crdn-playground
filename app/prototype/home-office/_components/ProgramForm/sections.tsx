"use client";

import { FormField, Pagination, SectionCard } from "@/components/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { ReactNode, useId, useMemo, useState } from "react";
import { allCategories, ProgramFormValues } from "../../_data/program-values";
import { territories } from "../../_data/territories";

/*
 * Option lists are not specified in Figma (the selects are shown empty on Add),
 * so they are built from the values that appear on the Update and Copy screens.
 */
const yesNo = ["Yes", "No"];
const calculationDates = ["ReceivedDate", "SiteInspected Date"];
const calculationTypes = ["Calendar", "Business"];
const invoiceTypes = ["RestorNet", "Xactimate"];
const pricingTypes = ["Xactimate", "Cotality"];
const discountTypes = ["Depreciation", "Credit Item", "RN Only", "Rebate"];
const timestampSources = ["XactAnalysis", "RestorNet"];
const carriers = [
  "Allstate",
  "American Family",
  "Farmers Insurance",
  "Horace Mann",
  "Nationwide",
  "State Farm"
];

interface SelectFieldProps {
  label: string;
  options: string[];
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectField = ({
  label,
  options,
  required,
  disabled,
  defaultValue,
  value,
  onValueChange
}: SelectFieldProps) => {
  const id = useId();
  return (
    <FormField label={label} htmlFor={id} required={required}>
      <Select
        defaultValue={
          value === undefined ? defaultValue || undefined : undefined
        }
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
};

interface InputFieldProps {
  label: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  defaultValue?: string;
  className?: string;
}

const InputField = ({
  label,
  required,
  disabled,
  type,
  defaultValue,
  className
}: InputFieldProps) => {
  const id = useId();
  const [isEmpty, setIsEmpty] = useState(!defaultValue);
  return (
    <FormField
      label={label}
      htmlFor={id}
      required={required}
      className={className}
    >
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(event) => setIsEmpty(!event.target.value)}
        className={cn(
          type === "date" &&
            isEmpty &&
            "text-transparent focus:text-neutral-900"
        )}
      />
    </FormField>
  );
};

const SubSection = ({
  title,
  spacing = "md",
  children
}: {
  title: string;
  /** Figma spaces Discounts groups by 24px and the other sections by 16px. */
  spacing?: "md" | "lg";
  children: ReactNode;
}) => (
  <div
    className={cn(
      "flex flex-col inside-border-top first:pt-0 first:shadow-none",
      spacing === "md" ? "gap-4 pt-4" : "gap-6 pt-6"
    )}
  >
    <h3 className="text-base text-neutral-700">{title}</h3>
    {children}
  </div>
);

interface ToggleRowProps {
  label: string;
  description: string;
  defaultChecked: boolean;
  disabled?: boolean;
}

const ToggleRow = ({
  label,
  description,
  defaultChecked,
  disabled
}: ToggleRowProps) => {
  const id = useId();
  return (
    <div className="flex items-start gap-2">
      <Switch
        id={id}
        className="mt-0.5"
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <div className="flex flex-col">
        <Label htmlFor={id} className="text-sm font-normal text-neutral-900">
          {label}
        </Label>
        <p className="text-justify text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
};

interface ProgramDetailsSectionProps {
  isCarrier: boolean;
  values: ProgramFormValues;
  defaultProgram: "yes" | "no";
  onDefaultProgramChange: (value: "yes" | "no") => void;
}

export const ProgramDetailsSection = ({
  isCarrier,
  values,
  defaultProgram,
  onDefaultProgramChange
}: ProgramDetailsSectionProps) => (
  <SectionCard title="Program Details" className="flex flex-col gap-4">
    <div className="grid grid-cols-2 gap-4">
      <InputField
        label="Name"
        required
        defaultValue={values.name}
        className={isCarrier ? undefined : "col-span-2"}
      />
      {isCarrier && (
        <SelectField
          label="Carrier"
          required
          options={carriers}
          defaultValue={values.carrier}
        />
      )}
      <InputField
        label="Start Date"
        required
        type="date"
        defaultValue={values.startDate}
      />
      <InputField label="End Date" type="date" defaultValue={values.endDate} />
    </div>
    <FormField label="Program Notes" required htmlFor="program-notes">
      <Textarea
        id="program-notes"
        className="min-h-30.25"
        defaultValue={values.notes}
      />
    </FormField>
    {!isCarrier && (
      <div className="mt-2 flex flex-col gap-4 pt-6 inside-border-top">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base text-neutral-700">Set as Default Program</h3>
          <p className="text-sm text-neutral-500">
            Do you want to make this the default program for future use?
          </p>
        </div>
        <RadioGroup
          value={defaultProgram}
          onValueChange={(value) =>
            onDefaultProgramChange(value as "yes" | "no")
          }
          className="flex w-auto gap-10"
        >
          {(["yes", "no"] as const).map((value) => (
            <Label
              key={value}
              className="h-6 gap-2 text-sm font-normal text-neutral-900"
            >
              <RadioGroupItem value={value} className="m-1" />
              {value === "yes" ? "Yes" : "No"}
            </Label>
          ))}
        </RadioGroup>
      </div>
    )}
  </SectionCard>
);

interface ProgramSettingsSectionProps {
  isCarrier: boolean;
  values: ProgramFormValues;
  /** Active programs cannot change Pricing & Invoicing, Import Settings or Repricing Rules. */
  locked: boolean;
}

export const ProgramSettingsSection = ({
  isCarrier,
  values,
  locked
}: ProgramSettingsSectionProps) => (
  <SectionCard title="Program Settings" className="flex flex-col gap-4">
    <SubSection title="TIP Settings">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Customer Contacted Within (Hours)"
          required
          defaultValue={values.customerContacted}
        />
        <InputField
          label="Site Inspected Within (Hours)"
          required
          defaultValue={values.siteInspected}
        />
        <InputField
          label="Rush Delivery (Hours)"
          required
          defaultValue={values.rushDelivery}
        />
        <SelectField
          label="Rush Hours Calculation Date"
          required
          options={calculationDates}
          defaultValue={values.rushDate}
        />
        <InputField
          label="Invoice Submitted (Hours)"
          required
          defaultValue={values.invoiceSubmittedHours}
        />
        <SelectField
          label="Invoice Submitted Calculation Type"
          required
          options={calculationTypes}
          defaultValue={values.invoiceSubmittedType}
        />
        <SelectField
          label="Invoice Submitted Calculation Date"
          required
          options={calculationDates}
          defaultValue={values.invoiceSubmittedDate}
        />
        <InputField
          label="Assignment Completed (Hours)"
          required
          defaultValue={values.assignmentHours}
        />
        <SelectField
          label="Assignment Completed Calculation Type"
          required
          options={calculationTypes}
          defaultValue={values.assignmentType}
        />
        <SelectField
          label="Job Completed Calculation Date"
          required
          options={calculationDates}
          defaultValue={values.jobCompletedDate}
        />
      </div>
    </SubSection>

    <SubSection title="Pricing & Invoicing">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Invoice Type"
          required
          options={invoiceTypes}
          defaultValue={values.invoiceType}
          disabled={locked}
        />
        <SelectField
          label="Pricing Type"
          required
          options={pricingTypes}
          defaultValue={values.pricingType}
          disabled={locked}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-700">
          Select which product categories should be included in the reprice
        </p>
        <div className="inside-border overflow-hidden rounded-md bg-neutral-50">
          {allCategories.map((category) => (
            <Label
              key={category}
              className="h-12 gap-6 px-2 text-sm font-normal text-neutral-700 inside-border-b last:shadow-none"
            >
              <Checkbox
                className="m-1"
                defaultChecked={values.categories.includes(category)}
                disabled={locked}
              />
              {category}
            </Label>
          ))}
        </div>
      </div>
      <InputField
        label="Free Storage Months"
        type="number"
        defaultValue={values.freeStorageMonths}
        disabled={locked}
        className="w-1/2 pr-2"
      />
    </SubSection>

    {isCarrier && (
      <>
        <SubSection title="Import Settings">
          {/* Dev notes: both toggles are OFF by default on a new program. */}
          <ToggleRow
            label="Send Adjuster Update on Claim Assignment"
            description="Automatically send a note to XactAnalysis/Cotality Workspace when a claim is received by the system and assigned to a program and partner."
            defaultChecked={values.sendClaimUpdate}
            disabled={locked}
          />
          <ToggleRow
            label="Send Adjuster Update on Partner Acknowledgement"
            description="Automatically send a note to XactAnalysis/Cotality Workspace when the assigned partner acknowledges receipt of the job notification."
            defaultChecked={values.sendPartnerUpdate}
            disabled={locked}
          />
        </SubSection>
        <SubSection title="Repricing Rules">
          <ToggleRow
            label="Require F9 Note on $0 Products"
            description="When enabled, products priced at $0 (BID/MISC) must have an F9 note before the Repricing process can run."
            defaultChecked={values.requireF9}
            disabled={locked}
          />
        </SubSection>
      </>
    )}
  </SectionCard>
);

export const DiscountsSection = ({
  values,
  locked
}: {
  values: ProgramFormValues;
  locked: boolean;
}) => {
  const [discounts, setDiscounts] = useState(values.discountsAvailable);
  const [indirect, setIndirect] = useState(values.indirectAvailable);

  return (
    <SectionCard title="Discounts" className="flex flex-col gap-6">
      <SubSection title="Discount Availability" spacing="lg">
        {/* Dev notes: the extra fields only show when discounts are available. */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Are discounts available for this Program?"
            required
            options={yesNo}
            value={discounts}
            onValueChange={setDiscounts}
            disabled={locked}
          />
          {discounts === "Yes" && (
            <>
              <InputField
                label="Discount %"
                defaultValue={values.discountPercent}
                disabled={locked}
              />
              <InputField
                label="Discount Cap %"
                defaultValue={values.discountCap}
                disabled={locked}
              />
              <SelectField
                label="Discount Type"
                options={discountTypes}
                defaultValue={values.discountType}
                disabled={locked}
              />
            </>
          )}
        </div>
      </SubSection>
      <SubSection title="Indirect Discount" spacing="lg">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Are indirect discounts available for this Program?"
            required
            options={yesNo}
            value={indirect}
            onValueChange={setIndirect}
            disabled={locked}
          />
          {indirect === "Yes" && (
            <InputField
              label="Indirect Discount %"
              defaultValue={values.indirectPercent}
              disabled={locked}
            />
          )}
        </div>
      </SubSection>
    </SectionCard>
  );
};

const PAGE_SIZE = 10;

export const TerritorySection = () => {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(territories.map((item) => item.id))
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return territories.filter(
      (item) =>
        !term ||
        [item.franchise, item.owner, item.territory].some((value) =>
          value.toLowerCase().includes(term)
        )
    );
  }, [search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allSelected = selected.size === territories.length;

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected(
      allSelected ? new Set() : new Set(territories.map((item) => item.id))
    );

  return (
    <SectionCard
      title="Territory Eligibility"
      description="Select the territories that should have access to this Program."
      className="flex flex-col gap-4"
    >
      <div className="inside-border rounded-md bg-neutral-50 p-3">
        <div className="relative w-64">
          <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search"
            aria-label="Search territories"
            className="pl-9"
          />
        </div>
      </div>

      <div className="inside-border overflow-hidden rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-neutral-50">
              <TableHead className="h-12 w-12 px-4">
                <Checkbox
                  checked={
                    allSelected
                      ? true
                      : selected.size === 0
                        ? false
                        : "indeterminate"
                  }
                  onCheckedChange={toggleAll}
                  aria-label="Select all territories"
                />
              </TableHead>
              {["Country", "Franchise", "Owner", "Territory"].map((heading) => (
                <TableHead key={heading} className="h-12 px-2 text-neutral-600">
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="h-12 w-12 px-4">
                  <Checkbox
                    checked={selected.has(item.id)}
                    onCheckedChange={() => toggle(item.id)}
                    aria-label={`Select ${item.franchise} ${item.territory}`}
                  />
                </TableCell>
                <TableCell className="h-12 px-2 text-neutral-600">
                  {item.country}
                </TableCell>
                <TableCell className="h-12 px-2 text-neutral-600">
                  {item.franchise}
                </TableCell>
                <TableCell className="h-12 px-2 text-neutral-600">
                  {item.owner}
                </TableCell>
                <TableCell className="h-12 px-2 text-neutral-600">
                  {item.territory}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center">
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </SectionCard>
  );
};

export const UploadSettingsSection = ({
  values
}: {
  values: ProgramFormValues;
}) => (
  <SectionCard title="Upload Settings" className="flex flex-col gap-4">
    <SubSection title="Uploads">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Upload Customer Contacted Date"
          options={yesNo}
          defaultValue={values.uploadCustomerContacted}
        />
        <SelectField
          label="Upload Site Inspected Date"
          options={yesNo}
          defaultValue={values.uploadSiteInspected}
        />
        <SelectField
          label="Upload Job Started Date"
          options={yesNo}
          defaultValue={values.uploadJobStarted}
        />
        <SelectField
          label="Upload Job Completed Date"
          options={yesNo}
          defaultValue={values.uploadJobCompleted}
        />
      </div>
    </SubSection>
    <SubSection title="RestorNet Settings">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Alternative Timestamps In"
          required
          options={timestampSources}
          defaultValue={values.timestampsIn}
        />
        <SelectField
          label="External QA Required"
          options={yesNo}
          defaultValue={values.externalQa}
        />
      </div>
    </SubSection>
  </SectionCard>
);
