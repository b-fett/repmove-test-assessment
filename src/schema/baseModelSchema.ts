import { ObjectId } from "mongodb";
import z from "zod";

export const baseModelSchema = z.object({
  _id: z.instanceof(ObjectId).default(() => new ObjectId()),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
