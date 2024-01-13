import JobPage from "@/components/jobPage";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React, { cache } from "react";

interface IPageProps{
    params:{slug:string}
}

const getJob = cache(async(slug:string)=>{
    const job = await prisma.job.findUnique({
        where:{slug}
    })
    if(!job) notFound();
    return job;
})


export async function generateStaticParams(){
    const jobs=await prisma.job.findMany({
        where:{approved:true},
        select:{slug:true}
    })
    return jobs.map(({slug})=>slug)
}

export async function generateMetadata({
    params:{slug}
}:IPageProps){
    const job = await getJob(slug);
    return {
        title:job.title
    }
}

const Page = async ({params:{slug}}:IPageProps) => {
    const job = await getJob(slug);
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={"#"} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
};

export default Page;
