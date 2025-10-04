import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/", addExpense);
expenseRouter.get("/", getExpenses);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;
