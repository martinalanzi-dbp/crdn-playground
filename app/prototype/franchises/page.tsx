import { Link } from "@/components/shared";

const FranchisesPage = () => (
  <main className="mx-auto max-w-240 px-6 py-12">
    <h1 className="text-display-sm font-medium text-neutral-800">Franchises</h1>
    <p className="mt-2 text-sm text-neutral-500">
      This prototype has not been started.
    </p>
    <Link
      href="/prototype"
      className="mt-4 inline-block text-sm font-medium text-link"
    >
      Back to prototypes
    </Link>
  </main>
);

export default FranchisesPage;
