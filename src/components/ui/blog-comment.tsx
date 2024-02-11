"use client";
import { cn } from "@/lib/utils";
import { Blog } from "@/types/blog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  data: Blog;
  nested?: boolean;
};

const getReplyCount: any = (comment: Blog["children"]) => {
  if (comment.length === 0) return 0;

  const counts = comment.map((c) => {
    return getReplyCount(c.children);
  });
  return counts.flat().reduce((sum, c) => sum + c, 0) + comment.length;
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
        "p-5 rounded-3xl rounded-bl-none even:bg-satin odd:bg-linen dark:bg-comet dark:even:bg-opacity-70",
        nested && "pl-10 !bg-inherit"
      )}
      onClick={() => {}}
    >
      <div className="relative flex flex-col pb-10">
        <div className="">
          <span className="font-semibold dark:text-linen">{data.author}</span>{" "}
          <span className="text-xs text-comet dark:text-lily">
            {new Date(data.created_at).toDateString()}:
          </span>
        </div>
        <div
          className="text-gunmetal dark:text-vista-white"
          dangerouslySetInnerHTML={{ __html: data.text || "" }}
        ></div>
        {data.children.length > 0 && (
          <button
            className="absolute left-0 bottom-0 text-left w-max text-gunmetal hover:font-semibold hover:scale-110 hover:translate-x-1 dark:text-lily"
            onClick={toggleAccordian}
          >
            {isOpen ? "Hide" : "View " + replyCount} Repl
            {replyCount > 1 ? "ies" : "y"}
          </button>
        )}
      </div>
      <div className={cn("h-0 overflow-hidden", isOpen && "h-auto")}>
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
