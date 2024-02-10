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
      className="w-1/3 h-10 border-b border-comet bg-transparent border-opacity-50 outline-none focus:w-full md:focus:w-1/2 duration-300"
    />
  );
};

export default SearchBar;
