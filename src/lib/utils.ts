import { colorSet } from "@/constants/config";
import { useBlogs } from "@/hooks/use-blogs";
import { Blog } from "@/types/blog";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lg = (c1: string, c2: string, x: string | number) => {
  return `linear-gradient(90deg, ${c1}, ${c2} 51%,${c1}) ${x}/ 200%`;
};

export const random = (num: number) => Math.floor(Math.random() * num);

export const getReplyCount: any = (comment: Blog["children"]) => {
  if (!comment || comment.length === 0) return 0;

  const counts = comment.map((c) => {
    return getReplyCount(c.children);
  });
  return counts.flat().reduce((sum, c) => sum + c, 0) + comment.length;
};

export const getColorSet = (index?: number, length?: number) => {
  if (index && length) {
    return colorSet[(index % length) % colorSet.length];
  }

  return colorSet[random(colorSet.length)];
};
