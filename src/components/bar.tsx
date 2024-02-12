import React from "react";
import SearchBar from "./search-bar";
import ThemeToggle from "./ui/theme-toggle";
import { Home } from "lucide-react";
import Link from "next/link";

type Props = {
  showSearch?: boolean;
};

const Bar = (props: Props) => {
  return (
    <div className="h-[120px] relative left-1/2 -translate-x-1/2 w-full md:w-[90%] p-8 max-w-screen-xl flex justify-between items-center gap-3">
      <Link href="/">
        <Home className="w-6 aspect-square stroke-gunmetal dark:stroke-vista-white" />
      </Link>
      <SearchBar className="" />
      <ThemeToggle className="" />
    </div>
  );
};

export default Bar;
