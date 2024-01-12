import express from 'express';
import { Request, Response } from 'express';
import EcSuppliers from '../Models/ec_suppliers';
import supplierRegistration from '../controller/suppliers/supplierRegistration';
import supplierProfile from '../controller/suppliers/supplierProfile';
import addProducts from '../controller/products/addProducts';
import editProducts from '../controller/products/editProducts';
import { verifyToken } from '../middleware/verifyJWT';
import getProductSupplier from '../controller/products/getProductsSupplier';
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

  supplierRouter.post("/addProduct",verifyToken, (req:Request,res:Response)=>{
    addProducts(req,res);
  })

  supplierRouter.patch("/editProduct",verifyToken, (req:Request,res:Response)=>{
    editProducts(req,res);
  })
  
  supplierRouter.get("/getProductSupplier",verifyToken, (req:Request,res:Response)=>{
    getProductSupplier(req,res);
  })

export default supplierRouter;


