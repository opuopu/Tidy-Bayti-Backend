import httpStatus from "http-status";
import groceryListServices from "../services/groceryList.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const insertGroceryListIntoDB = catchAsync(async (req, res) => {
  const category = req.params.id;
  const data = req.body.map((data) => ({
    category: category,
    name: data?.name,
  }));
  const result = await groceryListServices.insertGroceryListIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grocery item added successfully",
    data: result,
  });
});

const getGroceryListsByCategory = catchAsync(async (req, res) => {
  const result = await groceryListServices.getGroceryListsByCategory(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grocery items retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const getSingleGroceryList = catchAsync(async (req, res) => {
  const result = await groceryListServices.getSingleGroceryList(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grocery item retrieved  successfully",
    data: result,
  });
});

const groceryListControllers = {
  insertGroceryListIntoDB,
  getGroceryListsByCategory,
  getSingleGroceryList,
};
export default groceryListControllers;
