// import { Request, Response } from 'express';
// import EcCustomers from "../../Models/ec_customers";
 
// const customerRegistration = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { full_name, e_mail, password, profile_pic } = req.body;
//         const user = await EcCustomers.create({
//             full_name,
//             e_mail,
//             password,
//             profile_pic: Buffer.from(profile_pic),
//         }, { raw: true })
//         res.status(200).json({ message: `registration_id: ${user.registration_id}` })
//     }
//     catch (error: any) {
//         console.log(error);
//         res.status(401).json({ error: error.toString() });
//     }
// };
 
// export default customerRegistration;

import { Op } from "sequelize";
import EcSuppliers from "../../Models/ec_suppliers";
import { Request, Response } from "express";

const customerRegistration = async (
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

const customerProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const { name, age } = req.query;
  // res.send(`${name} , ${age} `);

  const { full_name, e_mail, password, profile_pic } = req.body;
  console.log(
    `hi hello ...............${full_name} , ${e_mail} ,${password},&${profile_pic}`
  );

  const found = await EcSuppliers.findAll({
    where: { e_mail: { [Op.in]: ["Aljo@gmail.com"] } },
    raw: true,
  });
  console.log(found);

  // res.send(`${full_name} , ${e_mail} ,${password},&${profile_pic}`);
  res.send(found);
  //   return found;
};
export default customerRegistration;
export { customerProfile };
