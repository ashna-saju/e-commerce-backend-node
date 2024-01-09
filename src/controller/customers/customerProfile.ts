// import { Op } from "sequelize";
// import EcCustomers from "../../Models/ec_customers";
// import { Request, Response } from "express";
// const customerProfile = async (req: Request, res: Response): Promise<void> => {
//     const { full_name, e_mail, password } = req.body;
//     console.log(`hi hello ...............${full_name} , ${e_mail} ,${password}`);
   
//     const found = await EcCustomers.findAll({
//       where: { e_mail },
//       raw: true,
//     });
//     console.log(found);
   
//     res.send(found);
//     //   return found;
//   };
//   export { customerProfile };
import EcCustomers from "../../Models/ec_customers";
import { Request, Response } from "express";
 
const customerProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { e_mail } = req.query;
        if (!e_mail) {
            res.status(403).json({ message: 'Forbidden' });
        }
        const profile = await EcCustomers.findOne({ where: { e_mail }, raw: true });
        res.status(200).json({
            ...profile
        });
    }
    catch (error) {
        res.status(500).json({ error: ` Internal server error` });
    }
};
 
export default customerProfile;