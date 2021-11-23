import { Router } from "express";

import { CategoryRepository } from "../modules/carros/repositories/CategoryRepository";
import { CreateCategoryService } from "../modules/carros/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

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
