import z from "zod";

export const scopeSchema = z.enum(["account", "prospect", "child"]);
