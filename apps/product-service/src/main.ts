import express from "express";
import "./jobs/product-cron.job";
import cors from "cors";
import { errorMiddleware } from "../../../packages/error-handler/error-middleware";
import cookieParser from "cookie-parser";
import router from "./routes/product.route";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { join } from "path";

const swaggerDocument = JSON.parse(
  readFileSync(
    join(process.cwd(), "apps/product-service/src/swagger-output.json"),
    "utf-8"
  )
);

const port = process.env.PORT || 6002;

const app = express();

app.use(express.json({ limit: "100mb" }));

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs-json", (req, res) => {
  res.json(swaggerDocument);
});

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send({ message: "Hello Product API" });
});

const server = app.listen(port, () => {
  console.log(`Product-service is running on http://localhost:${port}/api`);
});

server.on("error", (err) => {
  console.log("Server Error:", err);
});
