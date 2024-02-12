import { urls } from "@/constants/config";
import { Blog, Blogs, Hit } from "@/types/blog";
import { Nullable } from "@/types/helpers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBlogsStore {
  blogsFetchInProgress: boolean;
  result: Nullable<Blogs>;
  blogs: Blogs["hits"];
  frontPageBlogs?: Nullable<Blogs["hits"]>;
  totalHits?: Blogs["nbHits"];
  page: number;
  totalPages?: Blogs["nbPages"];
  hitsPerPage?: Blogs["hitsPerPage"];
  current: Nullable<Blog>;
  incrementPage: () => void;
  fetchAllBlogs: () => void;
  fetchFrontPageBlogs: () => void;
  getBlogDetails: (id: Hit["objectID"]) => void;
  fetchSearchResults: (phrase: string) => void;
  reset: () => void;
}

export const useBlogs = create<IBlogsStore>()(
  persist(
    (set, get) => ({
      blogsFetchInProgress: false,
      result: null,
      blogs: [],
      current: null,
      page: 0,
      incrementPage: () => {
        const { fetchAllBlogs } = get();
        set({
          page: get().page + 1,
        });
        fetchAllBlogs();
      },
      fetchAllBlogs: async () => {
        const { page, reset } = get();
        reset();
        set({
          blogsFetchInProgress: true,
        });
        const response: Blogs = await (
          await fetch(page ? urls.fetchPage(page) : urls.search)
        ).json();

        const currBlogs = get().blogs;
        const currBlogIds = currBlogs.map((b) => b.objectID);
        set({
          blogsFetchInProgress: false,
          result: response,
          blogs: [
            ...currBlogs,
            ...response.hits?.filter(
              (hit: Hit) => hit.title && !currBlogIds.includes(hit.objectID)
            ),
          ],
          totalHits: response.nbHits,
          totalPages: response.nbPages,
          hitsPerPage: response.hitsPerPage,
        });
      },
      fetchFrontPageBlogs: async () => {
        const response: Blogs = await (await fetch(urls.frontPage)).json();

        if (response.hits.length > 0) {
          set({
            frontPageBlogs: response.hits,
          });
        }
      },
      getBlogDetails: async (id) => {
        const { current } = get();
        if (id !== `${current?.story_id}`) {
          set({ current: null });
          const blog = await (await fetch(urls.blogDetails(id))).json();
          set({ current: blog });
        }
      },
      fetchSearchResults: async (phrase) => {
        const { reset } = get();
        reset();
        set({
          blogsFetchInProgress: true,
        });
        const response = await (
          await fetch(urls.searchWithQuery(phrase))
        ).json();
        set({
          blogsFetchInProgress: false,
          result: response,
          blogs: response.hits,
          totalHits: response.nbHits,
          totalPages: response.nbPages,
          hitsPerPage: response.hitsPerPage,
        });
      },
      reset: () => {
        set({
          blogsFetchInProgress: false,
          result: null,
          blogs: [],
          current: null,
          page: 0,
        });
      },
    }),
    {
      name: "blogs-store",
    }
  )
);
