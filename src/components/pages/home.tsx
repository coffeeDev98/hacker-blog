"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Hit } from "@/types/blog";
import React, { useEffect } from "react";
import BlogCard from "../ui/blog-card";
import { cn } from "@/lib/utils";
import SearchBar from "../search-bar";

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
      fetchFrontPageBlogs();
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
    <div className=" pb-20 max-w-screen-xl relative left-1/2 -translate-x-1/2 h-[calc(100vh-120px)] overflow-hidden">
      <div
        className={cn(
          "w-full h-full pt-3 px-5 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-scroll"
        )}
        onScroll={handleScroll}
      >
        {blogs?.map((blog: Hit) => (
          <BlogCard key={blog.story_id} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
