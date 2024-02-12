"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Hit } from "@/types/blog";
import React, { useEffect } from "react";
import BlogCard from "../ui/blog-card";
import { cn } from "@/lib/utils";
import TypewriterLoader from "../ui/typewriter-loader";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Carousel from "../ui/carousel";

type Props = {};

const HomeContent = ({}: Props) => {
  const searchParams = useSearchParams();
  const {
    blogsFetchInProgress,
    page,
    incrementPage,
    blogs,
    fetchAllBlogs,
    fetchSearchResults,
  } = useBlogs();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchSearchResults(query);
    } else {
      fetchAllBlogs();
    }
  }, [searchParams.get("query")]);

  const handleLoadMore = (e: any) => {
    incrementPage();
  };

  return (
    <div className=" pb-20 relative left-1/2 -translate-x-1/2 h-[calc(100vh-120px)]">
      <div
        className={cn(
          "w-full py-20 p-8 flex flex-col items-center overflow-scroll"
        )}
      >
        <Carousel data={blogs.slice(10)} />
        <div
          className={cn(
            "w-full md:max-w-screen-xl",
            "masonry",
            blogs.length > 0 ? " h-full" : "h-0"
          )}
        >
          {blogs.slice(10, blogs.length)?.map((blog: Hit, idx: number) => (
            <BlogCard key={blog.objectID} data={blog} index={idx} />
          ))}
        </div>
        <motion.button
          whileHover={{
            fontWeight: 600,
            scale: 1.05,
          }}
          className={cn(
            "mt-10 px-10 py-3 rounded-lg border border-gunmetal text-2xl dark:text-cyan dark:border-cyan",
            !blogs.length && "hidden"
          )}
          onClick={handleLoadMore}
        >
          Load More
        </motion.button>
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
