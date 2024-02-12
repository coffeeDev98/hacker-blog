import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

const TypewriterLoader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max-content] font-firacode text-2xl h-8 text-gunmetal",
        "before:absolute before:inset-0 before:animate-typewriter before:bg-vista-white after:absolute after:inset-0 after:w-[2px] after:animate-caret after:bg-gunmetal",
        "dark:before:bg-gunmetal dark:after:bg-vista-white dark:text-vista-white",
        className
      )}
    >
      Loading...
    </div>
  );
};

export default TypewriterLoader;
