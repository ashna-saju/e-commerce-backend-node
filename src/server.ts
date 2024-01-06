import { Request, Response } from 'express';
import express from 'express';
import  EcSuppliers  from '../src/Models/ec_suppliers'
import sequelize from './config/sequelize-config'
import supplierRouter from './router/supplier-routes';
import router from './router/supplierLogin-router';
const app = express();
const port = process.env.PORT || 3000;

sequelize.sync({
  force: false
})
.then(() => {
  console.log('Tables synchronized successfully.');
})
.catch((error:unknown) => {
  console.error('Error synchronizing models:', error);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get("/", (req: Request, res: Response) => {
//   const { name, age } = req.query;
//   if (name && age) {
//     res.send(`Welcome, ${name}! You are ${age} years old.`);
//   } else {
//     res.send("Welcome...");
//   }
// });

// app.post("/contact", (req: Request, res: Response) => {
//   const { name, age } = req.body;

//   if (!name) {
//     res.status(500).json({ error: "Name is required in the request body." });
//   } else {

//     if (name && age) {
//       res.status(200).json({ message: `Welcome, ${name}! You are ${age} years old.` });
//     } else {
//       res.status(400).json({ error: "Age is required in the request body." });
//     }
//   }
// });

// app.post("/createSupplier", async(req: Request, res: Response) => {
//   console.log("Received POST request at /createSupplier:", req.body);
//   // try {
//     const { full_name, e_mail, password, profile_pic } = req.body;
//     await EcSuppliers.create({
//       full_name,
//       e_mail,
//       password,
//       profile_pic: Buffer.from(profile_pic),
//     }, { raw: true });

//     res.status(201).json({ message:"hello"});
  
// });
// app.get("/findSupplier", (req: Request, res: Response) => {
//     const {full_name}= req.query

//     res.status(200).json({ message: "Implement logic to find a supplier." });
// });

app.use(supplierRouter);
app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
