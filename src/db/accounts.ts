import type z from "zod";
import { db } from "../mongodb";
import { accountSchema } from "../schema/models/accountSchema";

export const createAccount = async (
  accountInput: z.input<typeof accountSchema>
) => {
  const account = accountSchema.parse(accountInput);
  await db.collection("accounts").insertOne(account);
  return account;
};

export const updateAccount = async (
  account: Partial<z.input<typeof accountSchema>>
) => {
  if (!account._id) throw new Error("_id should be set");
  const result = await db
    .collection("accounts")
    .findOneAndUpdate(
      { _id: account._id },
      { $set: account },
      { returnDocument: "after" }
    );
  return accountSchema.parse(result);
};

export const getStats = async () => {
  const [accounts, children, prospects] = await Promise.all([
    db.collection("accounts").countDocuments({ scope: "account" }),
    db.collection("accounts").countDocuments({ scope: "child" }),
    db.collection("accounts").countDocuments({ scope: "prospect" }),
  ]);

  return { accounts, children, prospects };
};
