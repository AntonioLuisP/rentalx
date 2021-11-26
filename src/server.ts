import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.listen(3333, () => console.log("server is running!"));

app.use(express.json());

app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
