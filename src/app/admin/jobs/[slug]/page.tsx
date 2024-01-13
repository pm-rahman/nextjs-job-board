import JobPage from '@/components/jobPage';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';
import AdminSidebar from './adminSidebar';

interface IPageProps{
    params:{slug:string};
}
const Page = async({params:{slug}}:IPageProps) => {
    const job = await prisma.job.findUnique({
        where:{slug}
    })
    if(!job)notFound()
    return (
        <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <JobPage job={job}/>
            <AdminSidebar job={job}/>
        </main>
    );
};

export default Page;