"use client";
import { cn } from "@/lib/utils";
import { Nullable } from "@/types/helpers";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const SearchBar = ({ className }: Props) => {
  const [searchText, setSearchText] = useState<Nullable<string>>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const reset = () => {
    setSearchText("");
  };

  useEffect(() => {
    const fnCall = setTimeout(() => {}, 300);

    return () => {
      clearTimeout(fnCall);
    };
  }, [searchText]);
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search"
        className="w-[50vw] md:w-[33vw] h-10 border-b text-gunmetal border-cyan bg-transparent border-opacity-75 outline-none focus:w-[calc(100vw-200px)] focus:border-opacity-100 md:focus:w-[50vw] md:focus:scale-110 duration-300 dark:text-vista-white"
      />
      <button className="cursor-pointer p-1">
        <Search className="stroke-gunmetal dark:stroke-cyan hover:fill-gunmetal dark:hover:fill-cyan " />
      </button>
    </div>
  );
};

export default SearchBar;
