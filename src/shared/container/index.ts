import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarRepository } from "@modules/carros/infra/typeorm/repositories/CarRepository";
import { CarsImageRepository } from "@modules/carros/infra/typeorm/repositories/CarsImageRepository";
import { CategoryRepository } from "@modules/carros/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/carros/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImageRepository } from "@modules/carros/repositories/ICarsImageRepository";
import { ICarsRepository } from "@modules/carros/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/carros/repositories/ICategoriesRepository";
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

container.registerSingleton<ICarsRepository>("CarsRepository", CarRepository);
container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
);
