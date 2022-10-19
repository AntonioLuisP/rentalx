import { Router } from "express";

import { CreateSpecificationController } from "@modules/carros/useCases/createSpecification/CreateSpecificationController";
import { EnsureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(EnsureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
