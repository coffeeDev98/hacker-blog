import { envVariables, urls } from "@/constants/config";
import { Blogs, Hit } from "@/types/blog";
import { Nullable } from "@/types/helpers";
import { create } from "zustand";

interface IBlogsStore {
  blogsFetchInProgress: boolean;
  result: Nullable<Blogs>;
  blogs: Blogs["hits"];
  frontPageBlogs?: Nullable<Blogs["hits"]>;
  totalHits?: Blogs["nbHits"];
  page: number;
  totalPages?: Blogs["nbPages"];
  hitsPerPage?: Blogs["hitsPerPage"];
  search: Nullable<string>;
  current: Nullable<string>;
  incrementPage: () => void;
  fetchAllBlogs: (page?: number) => void;
  fetchFrontPageBlogs: () => void;
}

export const useBlogs = create<IBlogsStore>((set, get) => ({
  blogsFetchInProgress: false,
  result: null,
  blogs: [],
  search: null,
  current: null,
  page: 1,
  incrementPage: () => {
    set({
      page: get().page + 1,
    });
  },
  fetchAllBlogs: async (page?: number) => {
    set({
      blogsFetchInProgress: true,
    });
    const response: Blogs = await (
      await fetch(page ? urls.fetchPage(page) : urls.search)
    ).json();

    console.log("response =>", response);
    const currBlogs = get().blogs;
    const currBlogIds = currBlogs.map((b) => b.story_id);
    set({
      blogsFetchInProgress: false,
      result: response,
      blogs: [
        ...currBlogs,
        ...response.hits?.filter(
          (hit: Hit) => hit.title && !currBlogIds.includes(hit.story_id)
        ),
      ],
      totalHits: response.nbHits,
      totalPages: response.nbPages,
      hitsPerPage: response.hitsPerPage,
    });
  },
  fetchFrontPageBlogs: async () => {
    const response: Blogs = await (await fetch(urls.frontPage)).json();

    console.log("front-page =>", response);

    if (response.hits.length > 0) {
      set({
        frontPageBlogs: response.hits,
      });
    }
  },
}));
