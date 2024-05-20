import { Router } from "express";
import GroceryStore from "../controllers/groceryStoreControllers.js";

const groceryStoreRouter = new Router();

//Public route
groceryStoreRouter.get("/", GroceryStore.getAll);
groceryStoreRouter.post("/", GroceryStore.add);
groceryStoreRouter.post("/bulk", GroceryStore.addMany);
groceryStoreRouter.put("/:id", GroceryStore.update);

export default groceryStoreRouter;
