// import { Request, Response } from 'express';
// import EcCart from '../../Models/ec_cart';
 
// const addCart = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { product_id, quantity }[] = req.body;
//         const { client_type, registrationId } = req.body.jwt_decoded;
//         if (!product_id || !quantity || client_type != 'customer') {
//             res.status(404).json({ error: 'Bad request' });
//         }
//         await EcCart.create({ product_id, registration_id: registrationId, quantity }, { raw: true });
//         res.status(200).json({ message: 'Data inserted succesfully' })
 
//     }
//     catch (error: any) {
//         res.status(500).json({ error: error.toString() });
//     }
// };
 
// export default addCart;

import { Request, Response } from 'express';
import EcCart from '../../Models/ec_cart';

const addCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: { _id: string; Quantity: number; registration_id: string }[] = req.body;
        const { client_type, registrationId } = req.body.jwt_decoded;

        if (!products || !Array.isArray(products) || !client_type || client_type !== 'customer') {
            res.status(400).json({ error: 'Bad request. Invalid input data.' });
            return;
        }

        await EcCart.bulkCreate(
            products.map(product => ({
                product_id: product._id,
                registration_id: product.registration_id || registrationId,
                quantity: product.Quantity,
            }))
        );

        res.status(200).json({ message: 'Data inserted successfully' });

    } catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};

export default addCart;
