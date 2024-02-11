import { useBlogs } from "@/hooks/use-blogs";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lg = (c1: string, c2: string, x: string | number) => {
  return `linear-gradient(90deg, ${c1}, ${c2} 51%,${c1}) ${x}/ 200%`;
};

export const twlg = (c1: string, c2: string, x: string | number) => {
  return `linear-gradient(90deg,_${c1},_${c2}_51%,${c1})_${x}/_200%`;
};
