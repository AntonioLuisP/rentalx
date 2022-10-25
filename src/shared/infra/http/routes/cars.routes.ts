import { Router } from "express";

import { CreateCarController } from "@modules/carros/useCases/createCars/CreateCarController";
import { CreateCarSpecificationController } from "@modules/carros/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/carros/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);
export { carsRoutes };
