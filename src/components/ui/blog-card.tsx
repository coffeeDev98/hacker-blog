import { Hit } from "@/types/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  data: Hit;
};

const BlogCard = ({ data }: Props) => {
  return (
    <Link href={`/blog/${data.objectID}/${data.title}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="w-full h-full text-left p-5 pb-3 border-comet text-gunmetal border-[0.5px] border-opacity-25 flex flex-col justify-between font-inter dark:border-lily dark:text-linen"
      >
        <h3 className="mb-5">{data.title}</h3>
        <div className="w-full border-t-[0.5px] border-t-comet border-opacity-30 py-2 dark:border-t-lily">
          <span className="mr-1">By</span>
          <span className="text-comet dark:text-lily">
            <strong>{data.author}</strong>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
