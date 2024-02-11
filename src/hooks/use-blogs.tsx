import { envVariables, urls } from "@/constants/config";
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
  search: Nullable<string>;
  current: Nullable<Blog>;
  incrementPage: () => void;
  fetchAllBlogs: (page?: number) => void;
  fetchFrontPageBlogs: () => void;
  getBlogDetails: (id: Hit["objectID"]) => Promise<Hit>;
}

export const useBlogs = create<IBlogsStore>()(
  persist(
    (set, get) => ({
      blogsFetchInProgress: false,
      result: null,
      blogs: [],
      search: null,
      current: null,
      page: 0,
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

        console.log("front-page =>", response);

        if (response.hits.length > 0) {
          set({
            frontPageBlogs: response.hits,
          });
        }
      },
      getBlogDetails: async (id) => {
        const blog = await (await fetch(urls.blogDetails(id))).json();
        console.log("COMMENTS => ", blog);
        set({ current: blog });
        return blog;
      },
    }),
    {
      name: "blogs-store",
    }
  )
);
