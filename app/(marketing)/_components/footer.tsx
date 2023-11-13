import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="flex items-center justify-center md:justify-between w-full p-6 bg-background z-50 space-x-0 md:space-x-5 dark:bg-[#1F1F1F]">
      <Logo />
      <div
        className="w-full md:w-[80%] justify-between md:justify-end flex items-center 
             text-muted-foreground
        "
      >
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
