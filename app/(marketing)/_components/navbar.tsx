"use client";

import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  console.log({ isAuthenticated });
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4 md:justify-between",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:w-[80%] md:justify-end justify-between w-full flex items-center gap-x-2">
        <>
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">Get A-SPACE free</Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/documents">Enter A-SPACE</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          <ModeToggle />
        </>
      </div>
    </div>
  );
};

export default Navbar;
