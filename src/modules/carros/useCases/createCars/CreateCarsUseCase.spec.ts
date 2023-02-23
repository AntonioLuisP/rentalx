import { CarsRepositoryInMemory } from "@modules/carros/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarsUseCase } from "@modules/carros/useCases/createCars/CreateCarsUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarsUseCase: CreateCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarsUseCase.execute({
      name: "Name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with a exists license plate", async () => {
    await createCarsUseCase.execute({
      name: "Car1",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
    await expect(
      createCarsUseCase.execute({
        name: "Car2",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already Exists"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car Available car",
      description: "description car",
      daily_rate: 100,
      license_plate: "A2BC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
