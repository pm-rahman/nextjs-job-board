import React from "react";
import JobListItem from "@/components/jobListItem";
import { prisma } from "@/lib/prisma";
import { jobFilterValue } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface IJobResultsProps {
  filterValue: jobFilterValue;
}

const JobResults = async ({ filterValue }: IJobResultsProps) => {
  const { q, type, location, remote } = filterValue;
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/job/${job?.slug}`} key={job.id}>
        <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length===0&&(
        <p className="m-auto text-center">
            No jobs found. Try to adjust your searching filter.
        </p>
      )}
    </div>
  );
};

export default JobResults;
