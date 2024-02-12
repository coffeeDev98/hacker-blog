import HomeContent from "@/components/pages/home";
import React from "react";

type Props = {
  searchParams: { query: string };
};

const SearchPage = ({ searchParams }: Props) => {
  return (
    <div>
      <HomeContent />
    </div>
  );
};

export default SearchPage;
