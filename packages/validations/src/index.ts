import { z } from "zod";

export const BlogVal = z.object({
  title: z.string(),
  date: z.string(),
  image: z.string(),
  desc: z.string(),
});

export const classVal = z.object({
  name: z.string(),
  location: z.string(),
  timing: z.string(),
  desc: z.string(),
});

export const trainerVal = z.object({
  name: z.string(),
  position: z.string(),
  image: z.string(),
  desc: z.string(),
});
