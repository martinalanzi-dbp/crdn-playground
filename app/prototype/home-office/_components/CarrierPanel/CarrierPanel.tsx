"use client";

import { FormField, SidePanel } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  Carrier,
  CarrierStatus,
  PricingSystem,
  carrierStatusOptions,
  pricingSystemOptions
} from "../../_data/carriers";

export interface CarrierFormValues {
  name: string;
  status: CarrierStatus;
  defaultPricingSystem?: PricingSystem;
}

interface CarrierPanelProps {
  /** Carrier being edited, or `null` when adding a new one. */
  carrier: Carrier | null;
  /** Every carrier, active or inactive: names must be unique across all of them. */
  allCarriers: Carrier[];
  onSubmit: (values: CarrierFormValues) => void;
  onClose: () => void;
}

/** Add New Carrier / Edit Carrier side panel. Mount it with a `key` so each open starts fresh. */
const CarrierPanel = ({
  carrier,
  allCarriers,
  onSubmit,
  onClose
}: CarrierPanelProps) => {
  const isEdit = carrier !== null;
  const [name, setName] = useState(carrier?.name ?? "");
  const [status, setStatus] = useState<CarrierStatus>(carrier?.status ?? "Active");
  const [pricingSystem, setPricingSystem] = useState<PricingSystem | "">(
    carrier?.defaultPricingSystem ?? ""
  );

  const trimmed = name.trim();
  /* Dev note: the name must be unique across all carriers, active or inactive. */
  const isDuplicate = allCarriers.some(
    (item) =>
      item.id !== carrier?.id &&
      item.name.trim().toLowerCase() === trimmed.toLowerCase()
  );
  const canSubmit = trimmed.length > 0 && !isDuplicate;

  const submit = () =>
    onSubmit({
      name: trimmed,
      status,
      defaultPricingSystem: pricingSystem || undefined
    });

  return (
    <SidePanel
      open
      onOpenChange={(open) => !open && onClose()}
      title={isEdit ? "Edit Carrier" : "Add New Carrier"}
      description={
        isEdit
          ? "Change the name, status or default pricing system of this carrier."
          : "Create a carrier with an optional default pricing system."
      }
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!canSubmit} onClick={submit}>
            {isEdit ? "Save" : "Add Carrier"}
          </Button>
        </>
      }
    >
      <FormField label="Carrier Name" htmlFor="carrier-name" required={!isEdit}>
        <Input
          id="carrier-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter carrier name"
          aria-invalid={isDuplicate}
          className="text-sm"
        />
        {isDuplicate && (
          <p className="flex items-center gap-1 text-xs leading-[1.2] text-error-200">
            <ExclamationCircleIcon className="size-4" />
            This carrier name is already in use.
          </p>
        )}
      </FormField>

      {isEdit && (
        <FormField label="Status" htmlFor="carrier-status">
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as CarrierStatus)}
          >
            <SelectTrigger id="carrier-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {carrierStatusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      )}

      <FormField label="Default Pricing System" htmlFor="carrier-pricing">
        <Select
          value={pricingSystem}
          onValueChange={(value) => setPricingSystem(value as PricingSystem)}
        >
          <SelectTrigger id="carrier-pricing">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {pricingSystemOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </SidePanel>
  );
};

export default CarrierPanel;
