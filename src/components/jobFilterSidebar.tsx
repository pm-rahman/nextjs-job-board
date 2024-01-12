import React from "react";
import { jobTypes } from "../lib/job-types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./ui/select";
import { prisma } from "@/lib/prisma";
import { jobFilterSchema, jobFilterValue } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./formSubmitButton";

const filterDate = async (formData: FormData) => {
  "use server";
  const value = Object.fromEntries(formData.entries());
  const { q, type, location, remote } = jobFilterSchema.parse(value);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
};

interface IJobFilterSidebarProps {
  defaultValue: jobFilterValue;
}

const JobFilterSidebar = async ({ defaultValue }: IJobFilterSidebarProps) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];
  return (
    <aside className="sticky top-0 h-fit rounded border bg-background p-4 md:w-[260px]">
      <form action={filterDate}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              defaultValue={defaultValue.q}
              placeholder="Title, company, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="types">Type</Label>
            <Select
              id="types"
              name="types"
              defaultValue={defaultValue.type || ""}
            >
              <option value={""}>All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValue.location || ""}
            >
              <option value={""}>All Location</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remote"
              id="remote"
              defaultChecked={defaultValue?.remote}
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote Job</Label>
          </div>
          <FormSubmitButton className="w-full">Filter Job</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
