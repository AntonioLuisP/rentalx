import { CategoriesRepositoryInMemory } from "@modules/carros/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCAse: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCAse = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Categoria Test",
      description: "Categoria description test",
    };

    await createCategoryUseCAse.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Categoria Test",
      description: "Categoria description test",
    };

    await createCategoryUseCAse.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCAse.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category Already Exists!"));
  });
});
