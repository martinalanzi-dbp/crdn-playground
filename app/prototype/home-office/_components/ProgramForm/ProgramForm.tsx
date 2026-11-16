"use client";

import { SectionCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useProgramStatusOverrides } from "../../_data/program-status";
import {
  emptyProgramValues,
  ProgramFormValues
} from "../../_data/program-values";
import { Program } from "../../_data/programs";
import {
  DiscountsSection,
  ProgramDetailsSection,
  ProgramSettingsSection,
  TerritorySection,
  UploadSettingsSection
} from "./sections";

type ProgramType = "carrier" | "regular";
export type ProgramFormMode = "create" | "update" | "copy";

const programTypes: {
  value: ProgramType;
  label: string;
  description: string;
}[] = [
  {
    value: "carrier",
    label: "Carrier Program",
    description: "Programs that relate to a signed contract with a Carrier"
  },
  {
    value: "regular",
    label: "Regular Program",
    description: "Programs that are not related to a Carrier contract"
  }
];

const programsPath = "/prototype/home-office/programs";

const copy: Record<
  ProgramFormMode,
  { title: string; submit: string; toast: string }
> = {
  create: {
    title: "Add New Program",
    submit: "Add Program",
    toast: "Program successfully created"
  },
  update: {
    title: "Update Program",
    submit: "Save Changes",
    toast: "Program successfully updated"
  },
  copy: {
    title: "Copy Program",
    submit: "Add Program",
    toast: "Program successfully created"
  }
};

interface ProgramFormProps {
  mode: ProgramFormMode;
  /** The program being updated or copied. Omit when creating. */
  program?: Program;
  /** Initial field values. Omit when creating. */
  values?: ProgramFormValues;
}

const ProgramForm = ({
  mode,
  program,
  values = emptyProgramValues
}: ProgramFormProps) => {
  const router = useRouter();
  const { overrides } = useProgramStatusOverrides();
  const [programType, setProgramType] = useState<ProgramType | null>(
    program ? (program.carrier === "-" ? "regular" : "carrier") : null
  );
  // Dev notes: "Set as Default Program" always starts as "No".
  const [defaultProgram, setDefaultProgram] = useState<"yes" | "no">("no");

  // Dev notes: once a program is Active its type and Pricing & Invoicing settings cannot be edited.
  const status = program
    ? (overrides[program.slug] ?? program.status)
    : undefined;
  const locked = mode === "update" && status === "Active";

  const backPath =
    program && mode !== "create"
      ? `${programsPath}/${program.slug}`
      : programsPath;

  const handleSubmit = () => {
    toast.success(copy[mode].toast);
    router.push(mode === "update" ? backPath : programsPath);
  };

  return (
    <>
      <div className="flex h-[67px] items-center justify-between bg-white px-6 inside-border-b">
        <h1 className="text-display-xs text-neutral-700">{copy[mode].title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(backPath)}>
            Cancel
          </Button>
          <Button disabled={!programType} onClick={handleSubmit}>
            {copy[mode].submit}
          </Button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-208 flex-col gap-6 px-4 py-4 pb-12">
        <SectionCard title="Program Type">
          <RadioGroup
            value={programType ?? ""}
            onValueChange={(value) => setProgramType(value as ProgramType)}
            disabled={locked}
            className="gap-4"
          >
            {programTypes.map((type) => (
              <div key={type.value} className="flex items-start gap-2">
                <RadioGroupItem
                  value={type.value}
                  id={type.value}
                  className="m-1"
                />
                <div className="flex flex-col gap-[3px]">
                  <Label
                    htmlFor={type.value}
                    className="text-sm font-normal text-neutral-900"
                  >
                    {type.label}
                  </Label>
                  <p className="text-sm text-neutral-500">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </SectionCard>

        {programType && (
          <>
            <ProgramDetailsSection
              key={programType}
              isCarrier={programType === "carrier"}
              values={values}
              defaultProgram={defaultProgram}
              onDefaultProgramChange={setDefaultProgram}
            />
            <ProgramSettingsSection
              isCarrier={programType === "carrier"}
              values={values}
              locked={locked}
            />
            <DiscountsSection values={values} locked={locked} />
            <TerritorySection />
            {programType === "carrier" && (
              <UploadSettingsSection values={values} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProgramForm;
