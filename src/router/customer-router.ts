import express from "express";
import { Request, Response } from "express";
import customerRegistration from "../controller/customers/customerRegistration.ts";
import customerProfile from "../controller/customers/customerProfile.ts";
import { verifyToken } from "../middleware/verifyJWT.ts"
import resetPassword from "../controller/authentication/resetPassword.ts";
import getProducts from "../controller/products/getProducts.ts";
import updateCart from "../controller/carts/updateCart.ts";
import getCart from "../controller/carts/getCart.ts";
import addCart from "../controller/carts/addCart.ts";
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

router.get("/getProduct",verifyToken, (req:Request,res:Response)=>{
  getProducts(req,res);
})

router.post("/addCart",verifyToken, (req:Request,res:Response)=>{
  addCart(req,res);
})

router.get("/getCart",verifyToken, (req:Request,res:Response)=>{
  getCart(req,res);
})

router.get("/updateCart",verifyToken, (req:Request,res:Response)=>{
  updateCart(req,res);
})

export default router;
