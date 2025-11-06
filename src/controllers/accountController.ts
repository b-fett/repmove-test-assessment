import { Router } from "express";
import { serviceToRequestHandler } from "../utils/serviceToRequestHandler";
import * as updateAccountService from "../services/accounts/updateAccountService";
import * as createAccountService from "../services/accounts/createAccountService";
import * as getAccountsStatsService from "../services/accounts/getAccountsStatsService";

export const accountController = Router();

accountController
  .route("/accounts")
  .post(serviceToRequestHandler(createAccountService))
  .patch(serviceToRequestHandler(updateAccountService));
accountController.get(
  "/accounts/stats",
  serviceToRequestHandler(getAccountsStatsService)
);
