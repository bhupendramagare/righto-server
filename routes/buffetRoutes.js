import { Router } from "express";
import Buffet from "../controllers/buffetControllers.js";

const buffetRouter = new Router();

//Public route
buffetRouter.get("/", Buffet.getAll);
buffetRouter.get("/:token", Buffet.getAllByToken);
buffetRouter.post("/", Buffet.add);
buffetRouter.post("/bulk", Buffet.addMany);

export default buffetRouter;
