import z from "zod";
import { baseModelSchema } from "../baseModelSchema";
import { scopeSchema } from "../scopeSchema";

export const accountSchema = baseModelSchema.extend({
  name: z.string(),
  scope: scopeSchema,
});
