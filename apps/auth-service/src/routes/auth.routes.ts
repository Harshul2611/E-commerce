import { Router } from "express";
import {
  createShop,
  getUser,
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
const router = Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/refresh-token-user", refreshToken);
router.post("/login", loginUser);
router.get("/logged-in-user", isAuthenticated, getUser);
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyForgotPasswordOtp);
router.post("/seller-registration", registerSeller);
router.post("/verify-seller", verifySeller);
router.post("/create-shop", createShop);

export default router;
