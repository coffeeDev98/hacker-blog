"use client";
import { Hit } from "@/types/blog";
import React, { useEffect, useState } from "react";
import BlogCard from "./blog-card";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = { data: Hit[] };

// const MotionBox = styled(motion.div)`
//   background-color: rgb(172, 236, 161);
//   border-radius: 15px;
//   height: 100%;
//   width: 100%;
//   position: absolute;
// `;

const variants = {
  enter: (direction: number) => {
    return {
      // x: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      // x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

const Carousel = ({ data }: Props) => {
  const [[page, direction], setPage] = useState([0, 1]);
  const paginate = () => {
    setPage(([prevPage, prevDirection]) => [
      prevPage >= data.length - 1 ? 0 : prevPage + 1,
      prevDirection,
    ]);
  };

  useEffect(() => {
    if (data.length > 0) {
      const startCarousel = setInterval(() => paginate(), 5000);
      return () => {
        clearInterval(startCarousel);
      };
    }
  }, [data.length]);

  useEffect(() => {
    console.log("P => ", page);
  }, [page]);

  return (
    <div
      className={cn(
        "mb-20 relative h-[300px] w-[90%] border-y border-comet dark:border-lily",
        data.length > 0 ? "block" : "hidden"
      )}
    >
      <AnimatePresence initial={false} custom={direction}>
        {data.map(
          (d, index: number) =>
            index === page && (
              <motion.div
                key={d.objectID}
                className="w-full h-full absolute"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 30, delay: 0.3 }}
              >
                <BlogCard data={d} carousel={true} />
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
