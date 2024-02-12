"use client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const SearchBar = ({ className }: Props) => {
  const query = useSearchParams().get("query");
  const [searchText, setSearchText] = useState<string>(query || "");
  const router = useRouter();

  useEffect(() => {
    setSearchText(query || "");
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as any).blur();
      router.push(searchText === "" ? "/" : `/search?query=${searchText}`);
    }
  };
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <button className="hidden md:block cursor-pointer p-1">
        <Search className="stroke-gunmetal dark:stroke-cyan " />
      </button>
      <input
        type="text"
        value={searchText}
        placeholder="Search"
        className="w-[50vw] md:w-[33vw] h-10 border-b text-gunmetal border-cyan bg-transparent border-opacity-75 outline-none focus:w-[calc(100vw-200px)] focus:border-opacity-100 md:focus:w-[50vw] md:focus:scale-110 duration-300 dark:text-vista-white md:focus:pl-7"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
