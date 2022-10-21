import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/carros/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/carros/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/carros/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
