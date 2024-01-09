import { Op } from "sequelize";
import EcSuppliers from "../../Models/ec_suppliers";
import { Request, Response } from "express";

const supplierRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    if (!full_name) {
      res.status(425).json({ message: "name is missing" });
    }

    const newSupplier = await EcSuppliers.create({
      full_name,
      e_mail,
      password,
      profile_pic: Buffer.from(profile_pic),
    });
    console.log(newSupplier);
    res.send(newSupplier);
  } catch (error: any) {
    console.log(error);
    res.status(425).json({ message: "data is missing" });
  }
};
export default supplierRegistration;

