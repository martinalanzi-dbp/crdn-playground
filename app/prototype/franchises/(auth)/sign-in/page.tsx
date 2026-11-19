"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignInCard from "../../_components/SignInCard/SignInCard";

/* Loading state while EntraID signs the user in; moves on to the app after a short wait. */
const SignInPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(
      () => router.push("/prototype/franchises/jobs/schumacher-michael/assignments"),
      2500
    );
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <SignInCard className="min-h-59">
      <p className="text-center text-base text-neutral-500">
        Welcome to the future of restoration
      </p>
      <div className="relative size-6 animate-spin" role="status" aria-label="Signing in">
        <Image
          src="/assets/images/spinner-track.svg"
          alt=""
          fill
          unoptimized
          className="max-w-none"
        />
        <Image
          src="/assets/images/spinner-arc.svg"
          alt=""
          fill
          unoptimized
          className="max-w-none"
        />
      </div>
    </SignInCard>
  );
};

export default SignInPage;
