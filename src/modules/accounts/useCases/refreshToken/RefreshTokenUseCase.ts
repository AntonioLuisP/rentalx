import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not Exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expire_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };