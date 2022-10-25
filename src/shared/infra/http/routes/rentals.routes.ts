import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalsController.handle);

export { rentalsRoutes };
