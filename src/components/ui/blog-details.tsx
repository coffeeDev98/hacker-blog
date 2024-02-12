"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { Hit } from "@/types/blog";
import React, { useEffect, useState } from "react";
import BlogComment from "./blog-comment";
import { cn, getReplyCount } from "@/lib/utils";
import { ArrowBigUp, CircleUserRound, MessageSquareText } from "lucide-react";
import TypewriterLoader from "./typewriter-loader";

type Props = { id: Hit["objectID"]; title: Hit["title"] };

const BlogDetails = ({ id }: Props) => {
  const { current, getBlogDetails } = useBlogs();
  const [commentCount, setCommentCount] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(
    `${current?.story_id}` === id ? false : true
  );
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  const fetchData = async () => {
    setLoading(true);
    await getBlogDetails(id);
    setLoading(false);
  };
  const handleLoadMoreComments = () => {
    setCommentCount((prev) => prev + 20);
  };
  return loading ? (
    <TypewriterLoader />
  ) : (
    <div className="max-w-screen-md relative w-full flex flex-col items-center pb-20">
      <div
        className={cn(
          "w-full flex flex-col justify-center pb-5 leading-relaxed max-h-96 border-b-[0.5px] border-b-gunmetal border-opacity-25",
          " dark:border-b-lily text-gunmetal dark:text-vista-white"
        )}
        style={{}}
      >
        <div className="flex gap-3 items-center">
          <div>
            <CircleUserRound className="w-[3rem] h-[3rem]" />
            <div className="h-full w-[1px] bg-gunmetal dark:bg-vista-white" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="leading-none my-0">{current?.author}</h2>
            {current?.created_at && (
              <div className="text-lg text-comet dark:text-cyan leading-none my-0">
                {new Date(current.created_at).toDateString()}
              </div>
            )}
          </div>
        </div>
        <h1
          className="text-4xl md:text-5xl !leading-normal bg-gradient-to-r from-gunmetal via-blue-800 to-gunmetal dark:from-[#84fab0] dark:via-[#8fd3f4] dark:to-[#84fab0] transition-all duration-200"
          style={{
            // background: lg(cSet.c1, cSet.c2, "100%"),
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {current?.title}
        </h1>
        <div className="my-0 text-base flex gap-2">
          <div className="flex">
            <ArrowBigUp className="inline-block fill-gunmetal dark:fill-vista-white" />
            <div>{`${current?.points}`}</div>
          </div>
          <div className="h-full w-[1px] bg-gunmetal dark:bg-vista-white" />
          {/* <MessageSquareText className="inline-block fill-gunmetal stroke-gunmetal" /> */}
          <MessageSquareText className="inline-block" />
          {getReplyCount(current?.children)}
        </div>
      </div>
      {/* <div className="bg-gunmetal bg-opacity-25 h-0.5 w-full my-10 dark:bg-lily"></div> */}
      <div className="w-full max-w-screen-md  text-left flex flex-col mb-10">
        {current?.children
          ?.sort((a, b) => (a.created_at_i > b.created_at_i ? -1 : 1))
          ?.map(
            (c, index: number) =>
              index < commentCount && <BlogComment key={c.id} data={c} />
          )}
      </div>
      {
        <button
          className="mr-auto px-4 py-3 rounded-3xl bg-satin text-gunmetal dark:bg-comet dark:text-cyan hover:scale-110"
          onClick={handleLoadMoreComments}
        >
          {current?.children && commentCount <= current?.children.length
            ? "View more"
            : "Show less"}{" "}
          comments
        </button>
      }
    </div>
  );
};

export default BlogDetails;
