import express, { Express, Request, Response } from "express";
import cors from "cors";
import PortfolioRouter from "./routes/portfolio";
import BlogRouter from "./routes/blog";
import AuthRouter from "./routes/auth";
import PreRun from "./prerun";
import { config } from "dotenv";

const app: Express = express();

app.use(express.json());
config({"path": "../.env"})

app.use(cors());
app.use("/portfolio", PortfolioRouter);
app.use("/blog", BlogRouter);
app.use("/auth", AuthRouter);

(async () => {
    await PreRun();
    app.listen(process.env.PORT || 3000, () => {
        console.log(`[SERVER] Running on port: ${process.env.PORT || 3000}`);
    });
})()
