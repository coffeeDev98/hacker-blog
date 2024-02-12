"use client";
import { useBlogs } from "@/hooks/use-blogs";
import { cn, getColorSet, lg } from "@/lib/utils";
import { Hit } from "@/types/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useMemo } from "react";

type Props = {
  data: Hit;
  index: number;
  className?: string;
};

const BlogCard = ({ data, className, index }: Props) => {
  const { blogs } = useBlogs();

  const colorSet = useMemo(() => getColorSet(index, blogs.length), []);
  return (
    <Link href={`/blog/${data.objectID}/${data.title}`} className="hover:z-10">
      <motion.div
        whileHover={{
          scale: 1.1,
          background: lg(colorSet.c1, colorSet.c2, "100%"),
        }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "rounded-xl w-full h-full text-left p-5 pb-3 bg-vista-white border-comet text-gunmetal border-[0.5px] border-opacity-25 flex flex-col justify-between font-inter text-xl hover:text-2xl",
          "dark:border-lily dark:bg-gunmetal",
          // "hover:scale-105 lg:hover:scale-110",
          className
        )}
        style={{
          background: `linear-gradient(90deg, ${colorSet.c1}, ${colorSet.c2} 51%,${colorSet.c1}) 0/ 200%`,
        }}
      >
        <div className="mb-5">
          <h3>{data.title}</h3>
          <div>
            Do dolor eu incididunt non id quis mollit proident ex id cupidatat
            occaecat officia ea.
          </div>
        </div>
        <div className="w-full border-t-[0.5px] border-t-comet border-opacity-60 py-2">
          <span className="mr-1">By</span>
          <span className="text-comet">
            <strong>{data.author}</strong>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
