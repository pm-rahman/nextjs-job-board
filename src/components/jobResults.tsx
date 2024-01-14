import React from "react";
import JobListItem from "@/components/jobListItem";
import { prisma } from "@/lib/prisma";
import { jobFilterValue } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IJobResultsProps {
  filterValue: jobFilterValue;
  page?: number;
}

const JobResults = async ({ filterValue, page = 1 }: IJobResultsProps) => {
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

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

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/job/${job?.slug}`} key={job.id}>
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try to adjust your searching filter.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPage={Math.ceil(totalResults / jobsPerPage)}
          filterValue={filterValue}
        />
      )}
    </div>
  );
};

export default JobResults;

interface IPaginationProps {
  currentPage: number;
  totalPage: number;
  filterValue: jobFilterValue;
}

const Pagination = ({
  currentPage,
  totalPage,
  filterValue: { q, type, location, remote },
}: IPaginationProps) => {
  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `/?${searchParams.toString()}`;
  };

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous Page
      </Link>
      <span className="font-semibold">{currentPage}</span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPage && "invisible",
        )}
      >
        <ArrowRight size={16} />
        Next Page
      </Link>
    </div>
  );
};
