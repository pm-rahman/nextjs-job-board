import { Job } from "@prisma/client";
import Image from "next/image";
import logoPlaceholder from "@/assets/company-logo-placeholder.png";

import { Banknote, Briefcase, Clock, Globe2, MapIcon } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import Badge from "./badge";

interface IJobListItemProps {
  job: Job;
}
const JobListItem = ({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: IJobListItemProps) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/30">
      <Image
        src={companyLogoUrl || logoPlaceholder}
        alt={`${title} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-x-3">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapIcon size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "world-wide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
        <div className="hidden sm:flex flex-col shrink-0 justify-between">
            <Badge>{type}</Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </span>
        </div>
    </article>
  );
};

export default JobListItem;
