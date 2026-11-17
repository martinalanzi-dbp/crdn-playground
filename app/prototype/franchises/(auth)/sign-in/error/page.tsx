import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import SignInCard from "../../../_components/SignInCard/SignInCard";

/* Generic error from the backend. */
const SignInErrorPage = () => (
  <SignInCard className="min-h-59">
    <p className="text-center text-base text-error-200">
      An error occurred while logging in. Please try again
    </p>
    <Button asChild className="w-full">
      <NextLink href="/prototype/franchises/sign-in">Retry</NextLink>
    </Button>
  </SignInCard>
);

export default SignInErrorPage;
