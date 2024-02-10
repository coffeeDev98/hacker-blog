import Bar from "@/components/bar";
import HomeContent from "@/components/pages/home";
import SearchBar from "@/components/search-bar";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="">
      <Bar />
      <HomeContent />
    </div>
  );
};

export default page;
