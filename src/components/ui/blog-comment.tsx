"use client";
import { cn, getReplyCount } from "@/lib/utils";
import { Blog } from "@/types/blog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  data: Blog;
  nested?: boolean;
};

const BlogComment = ({ data, nested }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordian = () => {
    setIsOpen((prev) => !prev);
  };

  const replyCount = useMemo(
    () => getReplyCount(data.children),
    [data.children.length]
  );

  return (
    <div
      className={cn(
        "p-5",
        // "p-5 rounded-3xl rounded-bl-none even:bg-satin odd:bg-linen dark:bg-comet dark:even:bg-opacity-70",
        nested && "pl-10 !bg-inherit"
      )}
      onClick={() => {}}
    >
      <div className={cn("relative flex flex-col", replyCount > 0 && "pb-10")}>
        <div className="">
          <span className="text-lg font-semibold dark:text-linen">
            {data.author}
          </span>{" "}
          <span className="text-xs md:text-base text-comet dark:text-lily">
            {new Date(data.created_at).toDateString()}:
          </span>
        </div>
        <div
          className="text-xl text-gunmetal dark:text-vista-white"
          dangerouslySetInnerHTML={{ __html: data.text || "" }}
        ></div>
        {data.children.length >= 3 && (
          <button
            className="absolute left-0 bottom-0 text-left w-max text-gunmetal hover:font-semibold hover:scale-110 hover:translate-x-1 dark:text-lily"
            onClick={toggleAccordian}
          >
            {isOpen ? "Hide" : "View " + replyCount} Repl
            {replyCount > 1 ? "ies" : "y"}
          </button>
        )}
      </div>
      <div
        className={cn(
          "scale-y-0 h-0 overflow-hidden",
          (isOpen || data.children.length < 3) && "scale-y-100 h-auto"
        )}
      >
        {data.children
          ?.sort((a, b) => (a.created_at_i > b.created_at_i ? 1 : -1))
          ?.map((d) => (
            <BlogComment key={d.id} data={d} nested={true} />
          ))}
      </div>
    </div>
  );
};

export default BlogComment;
