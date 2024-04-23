import httpStatus from "http-status";
import otpServices from "../services/otp.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
const createAnOtp = catchAsync(async (req, res) => {
  const result = await otpServices.createAnOtpIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "An otp sent to your email.",
    data: result ?? null,
  });
});
const veriFySignupOtp = catchAsync(async (req, res) => {
  const result = await otpServices.veriFySignupOtp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Otp verified successfully",
    data: result ? result : null,
  });
});
const verifyForgetPasswordOtp = catchAsync(async (req, res) => {
  const result = await otpServices.verifyForgetPasswordOtp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Otp verified successfully",
    data: result ? result : null,
  });
});
const otpControllers = {
  createAnOtp,
  veriFySignupOtp,
  verifyForgetPasswordOtp,
};
export default otpControllers;
