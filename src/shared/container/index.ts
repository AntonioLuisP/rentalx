import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/carros/repositories/ICategoriesRepository";
import { CategoryRepository } from "@modules/carros/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/carros/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/carros/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
