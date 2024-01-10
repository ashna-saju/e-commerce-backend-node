import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EcCustomers from "../../Models/ec_customers";
import EcSuppliers from "../../Models/ec_suppliers";
 
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { client_type, e_mail, password } = req.body;
 
    if (client_type === "customer") {
      const found = await EcCustomers.findOne({
        where: { e_mail },
        raw: true,
      });
 
      if (!found) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }
 
      if (found?.password && bcrypt.compareSync(password, found.password)) {
        const token = jwt.sign(
          {
            userID: found.registration_id,
            client_type,
          },
          "your-secret-key",
          { expiresIn: "24h" }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    } else if (client_type === "supplier") {
      const found = await EcSuppliers.findOne({
        where: { e_mail },
        raw: true,
      });
 
      if (!found) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }
 
      // if (bcrypt.compareSync(password, found.password)) {
      //   res.status(200).json({ message: "Login successful" });
      // } else {
      //   res.status(401).json({ message: "Authentication failed" });
      // }
      /////////////////////////////////////////////////////////////////////////
      if (found?.password && bcrypt.compareSync(password, found.password)) {
        const token = jwt.sign(
          {
            userID: found.registration_id,
            client_type,
          },
          "your-secret-key",
          { expiresIn: "24h" }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    /////////////////////////////////////////////////////Getting tokens for suppilers
    } else {
      res.status(400).json({ message: "Invalid client_type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
 
 
// const customerProfile = async (req: Request, res: Response): Promise<void> => {
//       const { client_type } = req.body;
//       let found = {};
//       if (client_type == "customer") {
//         found = await EcCustomers.findAll({
//           where: {},
//           raw: true,
//         });
//       } else if (client_type == "supplier") {
//         found = await EcSuppliers.findAll({
//           where: {},
//           raw: true,
//         });
//       }
//       console.log(found);
   
//       res.send(found);
//     };
export default login;
// export { customerProfile };
