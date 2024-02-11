import React from "react";
import SearchBar from "./search-bar";
import ThemeToggle from "./ui/theme-toggle";
import { usePathname } from "next/navigation";

type Props = {
  showSearch?: boolean;
};

const Bar = (props: Props) => {
  return (
    <div className="h-[120px] relative left-1/2 -translate-x-1/2 w-full p-10 max-w-screen-xl flex justify-between md:justify-center items-center">
      <SearchBar className="mb-10" />
      <ThemeToggle className="absolute right-5 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default Bar;
