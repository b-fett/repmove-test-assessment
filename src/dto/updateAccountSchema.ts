import z from "zod";
import { scopeSchema } from "../schema/scopeSchema";
import { accountSchema } from "../schema/models/accountSchema";
import { ObjectId } from "mongodb";

export const requestSchema = z.object({
  _id: z.string().transform((input) => new ObjectId(input)),
  name: z.string().optional(),
  scope: scopeSchema.optional(),
});
export const responseSchema = accountSchema;
