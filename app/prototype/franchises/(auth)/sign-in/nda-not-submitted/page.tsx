import { Button } from "@/components/ui/button";
import SignInCard from "../../../_components/SignInCard/SignInCard";

/* The user has not submitted the NDA for any franchise: prompt them to contact the Local Administrator. */
const NdaNotSubmittedPage = () => (
  <SignInCard>
    <p className="text-center text-base text-error-200">
      NDA not submitted.
      <br />
      Please contact your administrator.
    </p>
    <Button variant="secondary" className="w-full">
      Contact Local Administrator
    </Button>
  </SignInCard>
);

export default NdaNotSubmittedPage;
