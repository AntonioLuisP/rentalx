import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/carros/useCases/createCategory";
import { importCategoryController } from "../modules/carros/useCases/importCategory";
import { listCategoriesController } from "../modules/carros/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) =>
  createCategoryController().handle(request, response)
);

categoriesRoutes.get("/", (request, response) =>
  listCategoriesController.handle(request, response)
);

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  importCategoryController.handle(request, response);
});

export { categoriesRoutes };
