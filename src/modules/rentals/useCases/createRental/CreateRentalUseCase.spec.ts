import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/carros/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/implementations/DayjsDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental Test", () => {
  const dayAdd24Housr = dayjs().add(1, "day").toDate();

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste",
      description: "teste de carrroi",
      daily_rate: 112,
      license_plate: "csadas",
      brand: "daksndkljas",
      category_id: "asdasndjsanask",
      fine_amount: 12,
    });

    const rental = await createRentalUseCase.execute({
      user_id: "32131",
      car_id: car.id,
      expected_return_date: dayAdd24Housr,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rent if theres a open rental for the user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1212",
      expected_return_date: dayAdd24Housr,
      user_id: "32131",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "32131",
        car_id: "12122",
        expected_return_date: dayAdd24Housr,
      })
    ).rejects.toEqual(
      new AppError("There is a rental in progress for the user")
    );
  });

  it("Should not be able to create a new rent if theres a open rental for the car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1212",
      expected_return_date: dayAdd24Housr,
      user_id: "32131",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "387662131",
        car_id: "1212",
        expected_return_date: dayAdd24Housr,
      })
    ).rejects.toEqual(new AppError("Car is Unavailable"));
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "321332131",
        car_id: "121367",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid Return Time"));
  });
});
