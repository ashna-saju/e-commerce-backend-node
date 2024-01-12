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
    } else {
      res.status(400).json({ message: "Invalid client_type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default login;

