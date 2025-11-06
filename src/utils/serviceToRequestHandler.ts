import type { Request, Response } from "express";
import z from "zod";

export const serviceToRequestHandler =
  <
    RQ extends z.ZodType,
    RS extends z.ZodType,
    H extends (data: z.infer<RQ>) => z.infer<RS> | Promise<z.infer<RS>>
  >({
    requestSchema,
    responseSchema,
    handler,
  }: {
    requestSchema: RQ;
    responseSchema: RS;
    handler: H;
  }) =>
  async (req: Request, res: Response) => {
    try {
      const parsedData = requestSchema.parse(req.body);
      const serviceResult = await handler(parsedData);
      const parsedServiceResult = responseSchema.parse(serviceResult);
      res.json(parsedServiceResult);
    } catch (error) {
      res.statusCode = 500;
      return res.json({
        error:
          error instanceof z.ZodError
            ? error.message
            : "Unknown error, try again later",
      });
    }
  };
