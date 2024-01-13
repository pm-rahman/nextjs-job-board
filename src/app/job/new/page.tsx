import { Metadata } from "next";
import NewJobFrom from "./NewJobFrom";
export const metaData: Metadata = {
  title: "Post new job",
};
const Page = () => {
  return <NewJobFrom />;
};

export default Page;
