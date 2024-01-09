// import express from 'express';
// import { Request, Response } from 'express';
// import EcSuppliers from '../Models/ec_suppliers';
 
// const supplierRouter = express.Router();
 
// supplierRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const { e_mail } = req.query;
//         const data = await EcSuppliers.findOne({ where: { e_mail: e_mail }, raw: true });
//         res.status(200).json({ message: `The data ${JSON.stringify(data)}` });
//     }
//     catch (error: any) {
//         console.log(error);
//         res.status(500).json({ error: error.toString() });
//     }
// })
// export default supplierRouter;

import express from 'express';
import { Request, Response } from 'express';
import EcSuppliers from '../Models/ec_suppliers';
 import supplierRegistration,{ supplierProfile } from '../controller/suppliers/supplierRegistration';
const supplierRouter = express.Router();
 
// supplierRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const { e_mail } = req.query;
//         const data = await EcSuppliers.findOne({ where: { e_mail: e_mail }, raw: true });
//         res.status(200).json({ message: `The data ${JSON.stringify(data)}` });
//     }
//     catch (error: any) {
//         console.log(error);
//         res.status(500).json({ error: error.toString() });
//     }
// })
 
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
  
   
  // supplierRouter.put("/updateSupplier", async (req: Request, res: Response) => {
  //   try {
  //     res.status(200).json({ message: "Implement logic to update a supplier." });
  //   } catch (error) {
  //     console.error("Error updating supplier:", error);
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // });
   
  // supplierRouter.delete("/deleteSupplier", async (req: Request, res: Response) => {
  //   try {
     
   
  //     res.status(200).json({ message: "Implement logic to delete a supplier." });
  //   } catch (error) {
  //     console.error("Error deleting supplier:", error);
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // });
   
export default supplierRouter;


