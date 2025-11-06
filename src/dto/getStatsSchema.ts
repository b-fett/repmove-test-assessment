import z from "zod";

export const requestSchema = z.void();
export const responseSchema = z.object({
  accounts: z.number(),
  prospects: z.number(),
  children: z.number(),
});
