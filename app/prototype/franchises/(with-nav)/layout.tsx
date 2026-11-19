import { TopNav } from "@/components/shared";
import { ReactNode } from "react";
import { franchisesAccountMenu, franchisesBase, franchisesNav } from "../nav";

const FranchisesLayout = ({ children }: { children: ReactNode }) => (
  <>
    <TopNav
      homeHref={`${franchisesBase}/jobs`}
      items={franchisesNav}
      /* Figma dev note: the bell stays hidden while notifications are under development. */
      hideNotifications
      user={{ name: "Michael Scott", menu: franchisesAccountMenu }}
    />
    <main className="mx-auto w-full max-w-360">{children}</main>
  </>
);

export default FranchisesLayout;
