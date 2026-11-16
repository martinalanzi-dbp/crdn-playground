import { Link } from "@/components/shared";
import { appRoutes } from "@/routes";

const prototypes = [
  {
    title: "Home Office",
    description: "Contacts, Management, Operations and Finance flows.",
    href: appRoutes.homeOfficePath()
  },
  {
    title: "Franchises",
    description: "Franchise-side prototype. Not started.",
    href: appRoutes.franchisesPath()
  }
];

const PrototypePage = () => (
  <main className="mx-auto max-w-240 px-6 py-12">
    <h1 className="text-display-sm font-medium text-neutral-800">Prototype</h1>
    <div className="mt-6 grid grid-cols-2 gap-6">
      {prototypes.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="rounded-md border border-border bg-card p-6 hover:bg-neutral-50"
        >
          <h2 className="text-display-xs font-medium text-neutral-800">
            {item.title}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">{item.description}</p>
        </Link>
      ))}
    </div>
  </main>
);

export default PrototypePage;
