// import express from 'express';
// import { Request, Response } from 'express';
// import EcCustomers from '../Models/ec_customers';
 
// const customerRouter = express.Router();
 
// customerRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const { e_mail } = req.query;
//         const data = await EcCustomers.findOne({ where: { e_mail: e_mail }, raw: true });
//         res.status(200).json({ message: `The data ${JSON.stringify(data)}` });
//     }
//     catch (error: any) {
//         console.log(error);
//         res.status(500).json({ error: error.toString() });
//     }
// })
 
// customerRouter.post("/createCustomer", async (req: Request, res: Response) => {
//     console.log("Received POST request at /createCustomer:", req.body);
 
//   });
   
  // customerRouter.put("/updateCustomer", async (req: Request, res: Response) => {
  //   try {
     
   
  //     res.status(200).json({ message: "Implement logic to update a customer." });
  //   } catch (error) {
  //     console.error("Error updating customer:", error);
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // });
   
   
  // customerRouter.delete("/deletecustomer", async (req: Request, res: Response) => {
  //   try {
     
   
  //     res.status(200).json({ message: "Implement logic to delete a customer." });
  //   } catch (error) {
  //     console.error("Error deleting cust:", error);
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // });
// export default customerRouter;


import express from "express";
import { Request, Response } from "express";
import customerRegistration, { customerProfile } from "../controller/customers/customerRegistration.ts";
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
