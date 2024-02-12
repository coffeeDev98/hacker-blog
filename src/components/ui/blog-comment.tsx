"use client";
import { cn, getReplyCount } from "@/lib/utils";
import { Blog } from "@/types/blog";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleUserRound,
  MinusCircle,
  PlusCircle,
  Tally1,
  UserCircle,
} from "lucide-react";
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
      <div className={cn("relative flex flex-col", replyCount > 0 && "pb-14")}>
        <div className="flex gap-2">
          <CircleUserRound className="w-[2rem] h-[2rem]" />
          <span className="text-lg font-semibold dark:text-linen">
            {data.author}
          </span>{" "}
          <span className="text-xs md:text-base text-comet dark:text-lily">
            {new Date(data.created_at).toDateString()}:
          </span>
        </div>
        {data.children.length >= 2 && (
          <button
            className="absolute left-[3.5px] h-[calc(100%-0.25rem)] flex flex-col items-center gap-3 opacity-60 hover:opacity-100"
            onClick={toggleAccordian}
          >
            <div className="h-full w-[1px] bg-gunmetal dark:bg-vista-white" />
            <PlusCircle
              className={cn(
                "w-6 h-6 stroke-gunmetal dark:stroke-vista-white hover:scale-125",
                isOpen && "hidden"
              )}
            />
            <MinusCircle
              className={cn(
                "w-6 h-6 stroke-gunmetal dark:stroke-vista-white hover:scale-125",
                !isOpen && "hidden"
              )}
            />
          </button>
        )}
        <div
          className="pl-10 text-xl text-gunmetal dark:text-vista-white"
          dangerouslySetInnerHTML={{ __html: data.text || "" }}
        ></div>
        {!nested && data.children.length >= 2 && (
          <button
            className="ml-10  rounded-3xl absolute left-0 bottom-0 text-xl text-left w-max text-gunmetal hover:font-semibold hover:scale-105 hover:translate-x-1 hover:underline hover:underline-offset-2 dark:text-cyan"
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
          (isOpen || (!nested && data.children.length < 2)) &&
            "scale-y-100 h-auto"
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
