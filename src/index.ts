import express, { Express, Request, Response } from "express";
import PortfolioRouter from "./routes/portfolio";
import { config } from "dotenv";

const app: Express = express();
config({"path": ".env"})

app.use("/portfolio", PortfolioRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`[SERVER] Running on port: ${process.env.PORT || 3000}`);
});
