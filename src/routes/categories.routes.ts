import { Router } from "express";

import { CategoryRepository } from "../repositories/CategoryRepository";
// import { PostgresCategoriesRepository } from "../repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();
// const categoryRepository = new PostgresCategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.index();

  return response.json(categories);
});

export { categoriesRoutes };
