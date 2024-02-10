import { Hit } from "@/types/blog";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { blogId: Hit["story_id"]; blogTitle: Hit["title"] };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  return {
    title: `${params.blogTitle.replaceAll("%20", " ")}`,
  };
};

const BlogDetailsPage = ({ params }: Props) => {
  return <div>{params.blogId}</div>;
};

export default BlogDetailsPage;
