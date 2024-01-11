import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./ui/select";

const JobFilterSidebar = () => {
  return (
    <aside className="sticky top-0 h-fit rounded border bg-background p-4 md:w-[260px]">
      <form action="">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={""} >
                <option value={""}>All Location</option>
            </Select>
            
          </div>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
