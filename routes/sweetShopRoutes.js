import { Router } from "express";
import SweetShop from "../controllers/sweetShopControllers.js";

const sweetShopRouter = new Router();

//Public route
sweetShopRouter.get("/", SweetShop.getAll);
sweetShopRouter.post("/", SweetShop.add);
sweetShopRouter.post("/bulk", SweetShop.addMany);
sweetShopRouter.put("/:id", SweetShop.update);

export default sweetShopRouter;
