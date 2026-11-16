import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  /** Right-aligned actions. Use one Primary button at most. */
  actions?: ReactNode;
}

/** Full-width white bar under the top nav (Figma "Base Header"). */
const PageHeader = ({ title, actions }: PageHeaderProps) => (
  <div className="flex items-center justify-between bg-white p-4 inside-border-b">
    <h1 className="py-1 text-display-sm text-neutral-700">{title}</h1>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);

export default PageHeader;
