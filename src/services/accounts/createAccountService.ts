import z from "zod";
import * as apiSchema from "../../dto/createAccountSchema";
import { accounts } from "../../db";

export const { requestSchema, responseSchema } = apiSchema;
export const handler = async (
  data: z.infer<typeof requestSchema>
): Promise<z.infer<typeof responseSchema>> => {
  return accounts.createAccount(data);
};
