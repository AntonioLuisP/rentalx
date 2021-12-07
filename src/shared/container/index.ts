import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/carros/repositories/ICategoriesRepository";
import { CategoryRepository } from "../../modules/carros/repositories/implementations/CategoryRepository";
import { SpecificationRepository } from "../../modules/carros/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/carros/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
