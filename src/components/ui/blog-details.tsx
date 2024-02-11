"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Blog, Hit } from "@/types/blog";
import { Maybe } from "@/types/helpers";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BlogComment from "./blog-comment";

type Props = { id: Hit["objectID"]; title: Hit["title"] };

const BlogDetails = ({ id }: Props) => {
  const { current, getBlogDetails } = useBlogs();

  const fetchData = async () => {
    const data = await getBlogDetails(id);
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div className="max-w-screen-md w-full flex flex-col items-center">
      <h1 className="w-full text-center leading-relaxed dark:text-vista-white">
        {current?.title}
      </h1>
      <div className="bg-gunmetal bg-opacity-25 h-0.5 w-full my-10 dark:bg-lily"></div>
      <div className="w-full text-left flex flex-col gap-10">
        {current?.children
          ?.sort((a, b) => (a.created_at_i > b.created_at_i ? -1 : 1))
          ?.map((c) => (
            <BlogComment key={c.id} data={c} />
          ))}
      </div>
    </div>
  );
};

export default BlogDetails;
