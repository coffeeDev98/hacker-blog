"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Blog, Hit } from "@/types/blog";
import { Maybe } from "@/types/helpers";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import BlogComment from "./blog-comment";
import { cn, getColorSet, getReplyCount, lg, twlg } from "@/lib/utils";
import { HandMetal, MessageSquareText } from "lucide-react";
import TypewriterLoader from "./typewriter-loader";

type Props = { id: Hit["objectID"]; title: Hit["title"] };

const BlogDetails = ({ id }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { current, getBlogDetails } = useBlogs();
  const fetchData = async () => {
    setLoading(true);
    await getBlogDetails(id);
    setLoading(false);
  };
  const cSet = useMemo(() => getColorSet(), []);
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  return loading ? (
    <TypewriterLoader />
  ) : (
    <div className="max-w-screen-md relative w-full flex flex-col items-center">
      <h1
        className={cn(
          "text-5xl w-full flex flex-col justify-center items-center text-center leading-relaxed h-80 border-b-[0.5px] border-b-gunmetal border-opacity-25 dark:border-b-lily text-gunmetal rounded-3xl"
        )}
        style={{
          background: lg(cSet.c1, cSet.c2, "100%"),
        }}
      >
        <div>{current?.title}</div>
        <div className="my-0 text-base">
          <HandMetal className="inline-block fill-gunmetal stroke-gunmetal" />
          {`${current?.points}`}|{" "}
          {current?.created_at && new Date(current.created_at).toDateString()} |{" "}
          <MessageSquareText className="inline-block fill-gunmetal stroke-gunmetal" />
          {getReplyCount(current?.children)}
        </div>
      </h1>
      {/* <div className="bg-gunmetal bg-opacity-25 h-0.5 w-full my-10 dark:bg-lily"></div> */}
      <div className="w-full max-w-screen-md  text-left flex flex-col">
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
