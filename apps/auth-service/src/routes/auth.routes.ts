import { Router } from "express";
import {
  createShop,
  createStripeConnectLink,
  getSeller,
  getUser,
  loginSeller,
  loginUser,
  refreshToken,
  registerSeller,
  resetUserPassword,
  userForgotPassword,
  userRegistration,
  verifySeller,
  verifyUser,
} from "../controllers/auth.controller";
import { verifyForgotPasswordOtp } from "../utils/auth.helper";
import isAuthenticated from "../../../../packages/middleware/isAuthenticated";
import {
  isSeller,
  isUser,
} from "../../../../packages/middleware/authorizeRoles";
const router = Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/refresh-token", refreshToken);
router.post("/login", loginUser);
router.get("/logged-in-user", isAuthenticated, isUser, getUser);
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyForgotPasswordOtp);
router.post("/seller-registration", registerSeller);
router.post("/verify-seller", verifySeller);
router.post("/create-shop", createShop);
router.post("/create-stripe-link", createStripeConnectLink);
router.post("/login-seller", loginSeller);
router.get("/logged-in-seller", isAuthenticated, isSeller, getSeller);

export default router;
