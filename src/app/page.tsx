import JobFilterSidebar from "@/components/jobFilterSidebar";
import JobResults from "@/components/jobResults";
import H1 from "@/components/ui/H1";
import { jobFilterValue } from "@/lib/validation";
import { Metadata } from "next";

interface IPageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}
const getTitle = ({ q, type, location, remote }: jobFilterValue) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? "Remote Developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";
  return `${titlePrefix}${titleSuffix}`;
};
export const generateMetadata=({searchParams:{q,type,location,remote}}:IPageProps):Metadata=>{
return {
  title:`${getTitle({
    q,
    type,
    location,
    remote:remote==="true"
  })} | Flow Jobs`
}
}
export default async function Home({
  searchParams: { q, type, location, remote },
}: IPageProps) {
  const filterValue: jobFilterValue = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-8 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValue)}</H1>
        <p className="text-muted-foreground">Find your Dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValue={filterValue} />
        <JobResults filterValue={filterValue} />
      </section>
    </main>
  );
}
