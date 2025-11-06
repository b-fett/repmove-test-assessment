import z from "zod";
import { scopeSchema } from "../schema/scopeSchema";
import { accountSchema } from "../schema/models/accountSchema";

export const requestSchema = z.object({
  name: z.string(),
  scope: scopeSchema,
});

export const responseSchema = accountSchema;
