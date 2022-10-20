import { CreateCarsUseCase } from "@modules/carros/useCases/createCars/CreateCarsUseCase";

let createCarsUseCase: CreateCarsUseCase;

describe("Create cars", () => {
  beforeEach(() => {
    createCarsUseCase = new CreateCarsUseCase();
  });

  it("should be able to create a new car", async () => {
    await createCarsUseCase.execute({
      name: "Name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
  });
});
