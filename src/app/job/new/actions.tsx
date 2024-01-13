"use server"

import {prisma} from "@/lib/prisma"
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation"
import {nanoid} from "nanoid"
import {put} from "@vercel/blob"
import path from "path"
import { redirect } from "next/navigation";

export async function createJobPosting(FormData:FormData){
    const values= Object.fromEntries(FormData.entries());
    const {
        title,
        type,
        companyName,
        companyLogo,
        locationType,
        location,
        applicationEmail,
        applicationUrl,
        description,
        salary
    }=createJobSchema.parse(values);

    const slug = `${toSlug(title)}-${nanoid(10)}`
    let companyLogoUrl:string|undefined=undefined;
    if(companyLogo){
        const blob=await put(
            `companyLogos/${slug}${path.extname(companyLogo.name)}`,
            companyLogo,
            {
                access:'public',
                addRandomSuffix:false
            }
        )
        companyLogoUrl=blob.url
    }

    await prisma.job.create({
        data:{
            slug,
            title:title.trim(),
            type,
            companyName:companyName.trim(),
            companyLogoUrl,
            locationType,
            location,
            applicationEmail:applicationEmail?.trim(),
            applicationUrl:applicationUrl?.trim(),
            description:description?.trim(),
            salary:parseInt(salary)
        }
    })
    redirect("/job-submitted")
}