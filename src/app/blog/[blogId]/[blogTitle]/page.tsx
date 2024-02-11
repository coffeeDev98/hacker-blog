import BlogDetails from "@/components/ui/blog-details";
import { Hit } from "@/types/blog";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { blogId: Hit["objectID"]; blogTitle: Hit["title"] };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  return {
    title: `${params.blogTitle.replaceAll("%20", " ")}`,
  };
};

const BlogDetailsPage = ({ params }: Props) => {
  return (
    <div className="p-5 md:p-20 flex justify-center">
      <BlogDetails
        title={params.blogTitle.replaceAll("%20", " ")}
        id={params.blogId}
      />
    </div>
  );
};

export default BlogDetailsPage;
