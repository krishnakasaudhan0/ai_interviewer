import z from "zod";
export const PreInterviewBody = z.object ({
    linkedin : z.string().optional(),
    github : z.string()
})