import express from "express";
import bodyParser from "body-parser";
import { accountController } from "./controllers/accountController";

const app = express();
app.use(bodyParser.json());
app.use("/api", accountController);

export default app;
