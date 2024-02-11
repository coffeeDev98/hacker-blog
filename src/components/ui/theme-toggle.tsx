"use client";
import { cn } from "@/lib/utils";
import { Theme } from "@/types";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
  useEffect(() => {
    if (darkMode) {
      document?.documentElement?.classList.add("dark");
    } else {
      document?.documentElement?.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div
      className={cn(
        "w-[70px] h-8 rounded-3xl border flex justify-evenly items-center",
        !darkMode && "border-gunmetal",
        darkMode && "border-vista-white",
        className
      )}
      onClick={toggleTheme}
    >
      <div className="w-1/2 h-full flex justify-center items-center">
        <Sun
          className={cn(
            "w-4 aspect-square fill-yellow-300 stroke-yellow-300",
            !darkMode && "w-0"
          )}
        />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Moon
          className={cn(
            "w-4 aspect-square fill-comet stroke-comet",
            darkMode && "w-0"
          )}
        />
      </div>
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-6 rounded-3xl flex justify-center items-center",
          darkMode
            ? "bg-vista-white translate-x-[calc(100%-2px)]"
            : "bg-gunmetal translate-x-0.5"
        )}
      >
        <Sun
          className={cn(
            "w-4 aspect-square fill-yellow-300 stroke-yellow-300",
            darkMode && "w-0"
          )}
        />
        <Moon
          className={cn(
            "w-4 aspect-square fill-gunmetal stroke-gunmetal",
            !darkMode && "w-0"
          )}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
