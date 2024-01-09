import express from "express";
import { Request, Response } from "express";
import login from "../controller/authentication/login.ts";

const router = express.Router();

// router.post("/login",(req: Request, res: Response) => {
//   customerProfile(req, res);
// });

// router.get("/viewProfile", (req: Request, res: Response) => {
//   customerProfile(req, res);
// });

router.post("/", (req: Request, res: Response) => {
  login(req, res);
});

export default router;

