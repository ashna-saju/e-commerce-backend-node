import { Op } from "sequelize";
import EcCustomers from "../../Models/ec_customers";
import { Request, Response } from "express";
 
const customerRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    if (!full_name) {
      res.status(422).json({ message: "name is missing" });
    }
 
    const newCustomer = await EcCustomers.create({
      full_name,
      e_mail,
      password,
      profile_pic: Buffer.from(profile_pic),
    });
    console.log(newCustomer);
    res.send(newCustomer);
  } catch (error: any) {
    console.log(error);
    res.status(425).json({ message: "data is missing" });
  }
};
export default customerRegistration;

 