import SignInCard from "../../../_components/SignInCard/SignInCard";

/* NDA submitted but still pending approval. */
const NdaPendingPage = () => (
  <SignInCard>
    <p className="text-center text-base text-error-200">
      Your NDA has been submitted, but has not been processed yet.
    </p>
    <p className="text-center text-base text-neutral-600">
      Please email support@crdn.com if this process takes more than 2 business
      day.
    </p>
  </SignInCard>
);

export default NdaPendingPage;
