import { CategoriesRepositoryInMemory } from "@modules/carros/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let createCategoryUseCAse: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
    createCategoryUseCAse = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to list categories", async () => {
    const category = {
      name: "Categoria Test",
      description: "Categoria description test",
    };

    await createCategoryUseCAse.execute({
      name: category.name,
      description: category.description,
    });

    const categorys = await listCategoriesUseCase.execute();

    expect(categorys.length).toBe(1);
  });
});
