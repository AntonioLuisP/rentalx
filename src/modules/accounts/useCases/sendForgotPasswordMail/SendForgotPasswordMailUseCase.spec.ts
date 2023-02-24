import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/DateProvider/in-memory/MailProviderInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("Should Be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      name: "lubbuck",
      driver_license: "adasd12",
      email: "zap@gmail.com",
      password: "123456789",
    });

    await sendForgotPasswordMailUseCase.execute("zap@gmail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not Be able to send a forgot password mail to a nonexistent user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("zaaaap@gmail.com")
    ).rejects.toEqual(new AppError("User does not Exists!"));
  });

  it("Should not Be able to create a user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      name: "lubbucsk",
      driver_license: "adas1d12",
      email: "zap2@gmail.com",
      password: "123456789",
    });

    await sendForgotPasswordMailUseCase.execute("zap2@gmail.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
