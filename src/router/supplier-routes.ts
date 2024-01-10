import express from 'express';
import { Request, Response } from 'express';
import EcSuppliers from '../Models/ec_suppliers';
import supplierRegistration from '../controller/suppliers/supplierRegistration';
import supplierProfile from '../controller/suppliers/supplierProfile';
import addProducts from '../controller/products/addProducts';
const supplierRouter = express.Router();
supplierRouter.post("/createSupplier", async (req: Request, res: Response) => {
    console.log("Received POST request at /createSupplier:", req.body);
    supplierRegistration(req, res);
  });

  supplierRouter.get("/supplierProfile", (req: Request, res: Response) => {
    supplierProfile(req, res);
  });
  
  supplierRouter.post("/supplierRegistration", (req: Request, res: Response) => {
    supplierRegistration(req, res);
  }); 

  supplierRouter.post("/addProduct", (req:Request,res:Response)=>{
    addProducts(req,res);
  })
export default supplierRouter;


