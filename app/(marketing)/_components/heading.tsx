"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-2">
      <h1 className=" text-xl sm:text-3xl md:text-4xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">A-Space</span>
      </h1>
      <h3 className="  text-base sm:text-lg md:text-xl font-bold">
        A-Space is the connected workspace where <br /> better , faster work
        happens
      </h3>
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            ENTER A-SPACE
            <ArrowRight className=" h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get A-SPACE for free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
