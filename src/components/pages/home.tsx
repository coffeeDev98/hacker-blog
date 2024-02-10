"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Hit } from "@/types/blog";
import React, { useEffect } from "react";

type Props = {};

const HomeContent = (props: Props) => {
  const { blogs, fetchAllBlogs } = useBlogs();
  useEffect(() => {
    if (!blogs) {
      fetchAllBlogs();
    }
    console.log("BLOGS =>", blogs);
  }, [blogs]);
  return (
    <div>
      <div>
        {blogs?.map((blog: Hit) => (
          <div key={blog.story_id}>{blog.title}</div>
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
