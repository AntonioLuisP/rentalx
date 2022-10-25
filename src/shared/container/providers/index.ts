import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
