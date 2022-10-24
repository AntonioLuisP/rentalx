import { CarsRepositoryInMemory } from "@modules/carros/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be Able to list all cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "description car",
      daily_rate: 100,
      license_plate: "AdBC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "description car",
      daily_rate: 100,
      license_plate: "AdBC-1234",
      fine_amount: 60,
      brand: "Car_Brand",
      category_id: "category",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "description car",
      daily_rate: 100,
      license_plate: "AdBC-1234",
      fine_amount: 60,
      brand: "Car_Brand",
      category_id: "category",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "description car",
      daily_rate: 100,
      license_plate: "AdBC-1234",
      fine_amount: 60,
      brand: "Car_Brand",
      category_id: "category_test",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category",
    });
    expect(cars).toEqual([car]);
  });
});
