import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label above the control, red asterisk before the label when required. */
const FormField = ({
  label,
  htmlFor,
  required,
  className,
  children
}: FormFieldProps) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <Label
      htmlFor={htmlFor}
      className="gap-1 text-sm font-normal text-neutral-700"
    >
      {required && <span className="text-error-100">*</span>}
      {label}
    </Label>
    {children}
  </div>
);

export default FormField;
