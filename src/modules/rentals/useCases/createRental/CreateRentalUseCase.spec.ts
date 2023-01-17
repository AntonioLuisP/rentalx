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
    const rental = await createRentalUseCase.execute({
      user_id: "32131",
      car_id: "1212",
      expected_return_date: dayAdd24Housr,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rent if theres a open rental for the user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "32131",
        car_id: "1212",
        expected_return_date: dayAdd24Housr,
      });
      await createRentalUseCase.execute({
        user_id: "32131",
        car_id: "12122",
        expected_return_date: dayAdd24Housr,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rent if theres a open rental for the car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "321332131",
        car_id: "121367",
        expected_return_date: dayAdd24Housr,
      });
      await createRentalUseCase.execute({
        user_id: "387662131",
        car_id: "121367",
        expected_return_date: dayAdd24Housr,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "321332131",
        car_id: "121367",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
