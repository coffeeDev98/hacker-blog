"use client";
import { cn } from "@/lib/utils";
import { Nullable } from "@/types/helpers";
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
    <input
      type="text"
      placeholder="Search"
      className="w-1/2 md:w-1/3 h-10 border-b text-gunmetal border-cyan bg-transparent border-opacity-75 outline-none focus:w-[calc(100%-80px)] focus:border-opacity-100 md:focus:w-1/2 md:focus:scale-110 duration-300 dark:text-vista-white"
    />
  );
};

export default SearchBar;
