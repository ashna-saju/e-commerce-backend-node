// import { Op } from "sequelize";
// import EcSuppliers from "../../Models/ec_suppliers";
// import { Request, Response } from "express";
// const supplierProfile = async (
//     req: Request,
//     res: Response
//   ): Promise<void> => {
    
//     const { full_name, e_mail, password, profile_pic } = req.body;
//     console.log(
//       `hi hello ...............${full_name} , ${e_mail} ,${password},&${profile_pic}`
//     );
  
//     const found = await EcSuppliers.findAll({
//       where: { e_mail: { [Op.in]: ["ashna@gmail.com"] } },
//       raw: true,
//     });
//     console.log(found);
//     res.send(found);
//   };
//   export { supplierProfile };

import EcSuppliers from "../../Models/ec_suppliers";
import { Request, Response } from 'express';
 
const supplierProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { e_mail } = req.query;
        if (!e_mail) {
            res.status(403).json({ message: 'Forbidden' });
        }
        const profile = await EcSuppliers.findOne({ where: { e_mail }, raw: true });
        res.status(200).json({ ...profile });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export default supplierProfile;