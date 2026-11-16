import { TopNav } from "@/components/shared";
import { ReactNode } from "react";
import { homeOfficeAccountMenu, homeOfficeNav } from "../nav";

const HomeOfficeLayout = ({ children }: { children: ReactNode }) => (
  <>
    <TopNav
      homeHref="/prototype/home-office/contacts"
      items={homeOfficeNav}
      user={{ name: "Jennifer Johnson", menu: homeOfficeAccountMenu }}
    />
    <main className="mx-auto w-full max-w-360">{children}</main>
  </>
);

export default HomeOfficeLayout;
