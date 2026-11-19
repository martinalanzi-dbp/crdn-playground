"use client";

import { Pagination, StatusDropdown } from "@/components/shared";
import type { StatusPillType } from "@/components/shared";
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
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { notFound, useParams } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import { useProgramStatusOverrides } from "../../../_data/program-status";
import { ProgramStatus, programs } from "../../../_data/programs";
import { territories } from "../../../_data/territories";

const programsPath = "/prototype/home-office/programs";

/* Status changes allowed from each status. Dev notes: an Inactive program can only go back to Active. */
const nextStatuses: Record<ProgramStatus, ProgramStatus[]> = {
  Draft: ["Active"],
  Active: ["Inactive"],
  Inactive: ["Active"]
};

const statusMessages: Record<ProgramStatus, string> = {
  Active: "Program successfully published",
  Inactive: "Program successfully deactivated",
  Draft: "Program saved as draft"
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm text-neutral-700">{label}</span>
    <span className="text-sm text-neutral-500">{children}</span>
  </div>
);

const FieldGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-3 gap-x-3 gap-y-4">{children}</div>
);

const Section = ({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-4 overflow-hidden rounded-3xl bg-white inset-ring-1 inset-ring-border"
  >
    <h2 className="p-4 text-xl leading-[29px] text-neutral-700 inside-border-b">
      {title}
    </h2>
    <div className="flex flex-col gap-4 p-4">{children}</div>
  </section>
);

const SubSection = ({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-4 border-t border-border pt-4 first:border-t-0 first:pt-0">
    <h3 className="text-base text-neutral-700">{title}</h3>
    {children}
  </div>
);

const PAGE_SIZE = 10;

const TerritoryTable = () => {
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

  return (
    <>
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
              {["Country", "Franchise", "Owner", "Territory"].map((heading) => (
                <TableHead key={heading} className="h-10 px-2 text-neutral-600">
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
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
    </>
  );
};

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { overrides, setStatus } = useProgramStatusOverrides();
  const [activeSection, setActiveSection] = useState("program-details");

  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();

  const status = overrides[program.slug] ?? program.status;
  const isCarrier = program.carrier !== "-";

  const sections = [
    { id: "program-details", label: "Program Details" },
    { id: "program-settings", label: "Program Settings" },
    { id: "discounts", label: "Discounts" },
    { id: "franchise-eligibility", label: "Franchise Eligibility" },
    ...(isCarrier ? [{ id: "uploads", label: "Uploads" }] : [])
  ];

  const handleStatusChange = (next: StatusPillType) => {
    setStatus(program.slug, next as ProgramStatus);
    toast.success(statusMessages[next as ProgramStatus]);
  };

  const goToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Dev notes: Inactive programs cannot be copied or updated; a Draft cannot be copied yet. */}
      <div className="flex items-center justify-between bg-white p-4 inside-border-b">
        <div className="flex flex-col gap-1">
          <h1 className="text-display-sm text-neutral-700">
            {program.name.replace(/ \(CCC\)$/, "")}
          </h1>
          <p className="text-sm text-neutral-500">
            {isCarrier ? "Carrier: " : "Regular program"}
            {isCarrier && (
              <span className="text-neutral-900">{program.carrier}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={status === "Inactive"}
            asChild={status !== "Inactive"}
          >
            {status === "Inactive" ? (
              "Update Program"
            ) : (
              <NextLink href={`${programsPath}/${program.slug}/edit`}>
                Update Program
              </NextLink>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={status !== "Active"}
            asChild={status === "Active"}
          >
            {status === "Active" ? (
              <NextLink href={`${programsPath}/${program.slug}/copy`}>
                Copy Program
              </NextLink>
            ) : (
              "Copy Program"
            )}
          </Button>
          <StatusDropdown
            status={status}
            options={nextStatuses[status]}
            onChange={handleStatusChange}
          />
        </div>
      </div>

      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 p-4 text-sm"
      >
        <NextLink href={programsPath} className="text-link underline">
          Programs
        </NextLink>
        <ChevronRightIcon className="size-3 text-neutral-500" />
        <span className="text-neutral-500">
          {program.name.replace(/ \(CCC\)$/, "")}
        </span>
      </nav>

      <div className="flex items-start gap-4 px-4 pb-8">
        <aside className="sticky top-4 w-65 shrink-0 rounded-3xl bg-white px-3 py-6 inset-ring-1 inset-ring-border">
          <ul className="flex flex-col gap-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => goToSection(section.id)}
                  className={cn(
                    "h-7.25 w-full rounded-md px-2 text-left text-sm text-neutral-700 outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-ring/50",
                    activeSection === section.id &&
                      "bg-accent text-accent-foreground hover:bg-accent"
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Section id="program-details" title="Program Details">
            <FieldGrid>
              <Field label="Name">{program.name}</Field>
              <Field label="Program Type">
                {isCarrier ? "Carrier Program" : "Regular Program"}
              </Field>
              {isCarrier && <Field label="Carrier">{program.carrier}</Field>}
              <Field label="Start Date">{program.startDate}</Field>
              <Field label="End Date">{program.endDate}</Field>
            </FieldGrid>
            <div className="pt-4 inside-border-top">
              <div className="flex flex-col gap-1 rounded-md bg-neutral-50 px-2 py-4">
                <p className="text-sm text-neutral-900">Program Notes</p>
                <p className="text-base text-neutral-500">
                  {isCarrier
                    ? `For ${program.carrier} losses assigned through CCC.`
                    : "Internal program, not tied to a carrier contract."}
                </p>
              </div>
            </div>
          </Section>

          <Section id="program-settings" title="Program Settings">
            <SubSection title="TIP Settings">
              <FieldGrid>
                <Field label="Customer Contacted Within (Hours)">4</Field>
                <Field label="Site Inspected Within (Hours)">24</Field>
                <Field label="Rush Delivery (Hours)">48</Field>
                <Field label="Rush Hours Calculation Date">
                  SiteInspected Date
                </Field>
                <Field label="Invoice Submitted (Hours)">72</Field>
                <Field label="Invoice Submitted Calculation Type">
                  Calendar
                </Field>
                <Field label="Invoice Submitted Calculation Date">
                  Received Date
                </Field>
                <Field label="Assignment Completed (Hours)">504</Field>
                <Field label="Assignment Completed Calculation Type">
                  Calendar
                </Field>
                <Field label="Job Completed Calculation Date">
                  Received Date
                </Field>
              </FieldGrid>
            </SubSection>
            <SubSection title="Pricing & Invoicing">
              <FieldGrid>
                <Field label="Invoice Type">RestorNet</Field>
                <Field label="Pricing Type">{program.pricingType}</Field>
                <Field label="Free Storage Months">0</Field>
                <Field label="Categories to Reprice">Electronic, Textile</Field>
              </FieldGrid>
            </SubSection>
            {isCarrier && (
              <>
                <SubSection title="Import Settings">
                  <FieldGrid>
                    <Field label="Send Adjuster Update on Claim Assignment">
                      Yes
                    </Field>
                    <Field label="Send Adjuster Update on Partner Acknowledgement">
                      No
                    </Field>
                  </FieldGrid>
                </SubSection>
                <SubSection title="Repricing Rules">
                  <FieldGrid>
                    <Field label="Require F9 Note on $0 Products">No</Field>
                  </FieldGrid>
                </SubSection>
              </>
            )}
          </Section>

          <Section id="discounts" title="Discounts">
            <SubSection title="Discount Availability">
              <FieldGrid>
                <Field label="Are discounts available for this Program?">
                  Yes
                </Field>
                <Field label="Discount %">5</Field>
                <Field label="Discount Cap %">-</Field>
                <Field label="Discount Type">RN Only</Field>
              </FieldGrid>
            </SubSection>
            <SubSection title="Indirect Discount">
              <FieldGrid>
                <Field label="Are indirect discounts available for this Program?">
                  Yes
                </Field>
                <Field label="Indirect Discount %">5</Field>
              </FieldGrid>
            </SubSection>
          </Section>

          <Section id="franchise-eligibility" title="Territory Eligibility">
            <TerritoryTable />
          </Section>

          {isCarrier && (
            <Section id="uploads" title="Upload Settings">
              <SubSection title="Uploads">
                <FieldGrid>
                  <Field label="Upload Customer Contacted Date">Yes</Field>
                  <Field label="Upload Site Inspected Date">Yes</Field>
                  <Field label="Upload Job Started Date">Yes</Field>
                  <Field label="Upload Job Completed Date">Yes</Field>
                </FieldGrid>
              </SubSection>
              <SubSection title="RestorNet Settings">
                <FieldGrid>
                  <Field label="Alternative Timestamps In">XactAnalysis</Field>
                  <Field label="Home Office Uploads Xactimate?">Yes</Field>
                  <Field label="TIP Photo and Doc Required to Complete">
                    Not Required
                  </Field>
                  <Field label="External QA Required?">Yes</Field>
                </FieldGrid>
              </SubSection>
            </Section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProgramDetailPage;
