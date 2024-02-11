"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Hit } from "@/types/blog";
import React, { useEffect } from "react";
import BlogCard from "../ui/blog-card";
import { cn } from "@/lib/utils";
import SearchBar from "../search-bar";
import TypewriterLoader from "../ui/typewriter-loader";

type Props = {};

const HomeContent = (props: Props) => {
  const {
    blogsFetchInProgress,
    page,
    incrementPage,
    blogs,
    fetchAllBlogs,
    fetchFrontPageBlogs,
  } = useBlogs();
  useEffect(() => {
    if (blogs.length === 0) {
      fetchAllBlogs(page);
    }
    console.log("BLOGS =>", blogs, page);
  }, [blogs]);
  useEffect(() => {
    fetchAllBlogs(page);
  }, [page]);
  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.offsetHeight === e.target.scrollTop) {
      incrementPage();
    }
  };

  return (
    <div className=" pb-20 relative left-1/2 -translate-x-1/2 h-[calc(100vh-120px)]">
      <div className="w-full py-20 p-8 flex flex-col items-center overflow-scroll">
        <div
          className={cn(
            "w-full md:max-w-screen-xl",
            "masonry",
            blogs.length > 0 ? " h-full" : "h-0"
          )}
          // onScroll={handleScroll}
        >
          {blogs?.map((blog: Hit, idx: number) => (
            <BlogCard key={blog.objectID} data={blog} index={idx} />
          ))}
        </div>
        <button
          className="mt-10 px-10 py-3 rounded-lg border border-gunmetal text-2xl"
          onClick={handleScroll}
        >
          Load More
        </button>
      </div>
      <TypewriterLoader
        className={cn(
          "left-1/2 -translate-x-1/2 my-5",
          `1`,
          blogs.length === 0 && "top-1/2 -translate-y-1/2",
          blogsFetchInProgress ? "block" : "hidden"
        )}
      />
    </div>
  );
};

export default HomeContent;
