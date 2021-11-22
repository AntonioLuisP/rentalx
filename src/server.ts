import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.listen(3333, () => console.log("server is running!"));

app.use(express.json());

app.use("/categories", categoriesRoutes);
