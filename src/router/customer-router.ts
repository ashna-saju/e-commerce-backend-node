import express from "express";
import { Request, Response } from "express";
import customerRegistration from "../controller/customers/customerRegistration.ts";
import customerProfile from "../controller/customers/customerProfile.ts";
import { verifyToken } from "../middleware/verifyJWT.ts"
import resetPassword from "../controller/authentication/resetPassword.ts";

const router = express.Router();
router.get("/customerProfile", (req: Request, res: Response) => {
  customerProfile(req, res);
});

router.post("/customerRegistration", (req: Request, res: Response) => {
  customerRegistration(req, res);
});

router.patch("/resetPassword",verifyToken,  (req: Request, res: Response) => {
  resetPassword(req, res);
});

export default router;
