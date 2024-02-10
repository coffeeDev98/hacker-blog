import { envVariables } from "@/constants/config";
import { Blogs } from "@/types/blog";
import { Nullable } from "@/types/helpers";
import { create } from "zustand";

interface IBlogsStore {
  result: Nullable<Blogs>;
  blogs: Nullable<Blogs["hits"]>;
  totalHits?: Blogs["nbHits"];
  totalPages?: Blogs["nbPages"];
  hitsPerPage?: Blogs["hitsPerPage"];
  search: Nullable<string>;
  current: Nullable<string>;
  fetchAllBlogs: () => void;
}

export const useBlogs = create<IBlogsStore>((set, get) => ({
  result: null,
  blogs: null,
  search: null,
  current: null,
  fetchAllBlogs: async () => {
    const response: Blogs = await (
      await fetch(`${envVariables.apiUrl}/search`)
    ).json();

    console.log("response =>", response);

    set({
      result: response,
      blogs: response.hits,
      totalHits: response.nbHits,
      totalPages: response.nbPages,
      hitsPerPage: response.hitsPerPage,
    });
  },
}));
