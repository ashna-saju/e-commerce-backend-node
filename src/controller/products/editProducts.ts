// import { Db, ObjectId } from "mongodb";
// import { client } from "../../services/mongodb";
// import { Request, Response } from 'express';
 
// const db: Db = client.db('e_commerce');
 
// const editProduct = async (req: Request, res: Response): Promise<void> => {
//     const { product_id } = req.body;
//     const { client_type } = req.body.jwt_decoded;
//     try {
//         if (!product_id || client_type != 'supplier') {
//             res.status(404).json({ error: 'Bad request' });
//         }
//         const productCollection = db.collection('products');
//         const updatedProductData = {
//             ...req.body
//         };
//         delete updatedProductData.jwt_decoded;
//         delete updatedProductData.product_id;
//         const filter = { _id: new ObjectId(product_id as string) };
//         console.log(updatedProductData)
//         const result = await productCollection.updateOne(filter, { $set: updatedProductData });
 
//         if (result.modifiedCount > 0) {
//             res.status(200).json({ message: "Update successful" });
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json({ message: 'Updated successfully' })
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
 
// export default editProduct;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { Db, ObjectId } from "mongodb";
// import { client } from "../../services/mongodb";
// import { Request, Response } from 'express';
 
// const db: Db = client.db('e_commerce');
 
// const editProducts = async (req: Request, res: Response): Promise<void> => {
//     const { product_id } = req.body;
//     try {
//         if (!product_id || !req.body.jwt_decoded || !req.body.jwt_decoded.client_type || req.body.jwt_decoded.client_type !== 'supplier') {
//             res.status(400).json({ error: 'Bad request' });
//             return;
//         }
 
//         const productCollection = db.collection('products');
//         const updatedProductData = {
//             ...req.body
//         };
 
//         delete updatedProductData.jwt_decoded;
//         delete updatedProductData.product_id;
 
//         const filter = { _id: new ObjectId(product_id as string) };
//         const result = await productCollection.updateOne(filter, { $set: updatedProductData });
 
//         if (result.modifiedCount > 0) {
//             res.status(200).json({ message: "Update successful" });
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
 
// export default editProducts;

import { Db, ObjectId } from "mongodb";
import { client } from "../../services/mongodb";
import { Request, Response } from 'express';
import io from "../../server"; // Assuming you have a reference to the Socket.IO instance

const db: Db = client.db('e_commerce');

const editProducts = async (req: Request, res: Response): Promise<void> => {
    const { product_id } = req.body;
    try {
        if (!product_id || !req.body.jwt_decoded || !req.body.jwt_decoded.client_type || req.body.jwt_decoded.client_type !== 'supplier') {
            res.status(400).json({ error: 'Bad request' });
            return;
        }

        const productCollection = db.collection('products');
        const updatedProductData = {
            ...req.body
        };

        delete updatedProductData.jwt_decoded;
        delete updatedProductData.product_id;

        const filter = { _id: new ObjectId(product_id as string) };
        const result = await productCollection.updateOne(filter, { $set: updatedProductData });

        if (result.modifiedCount > 0) {
            const updatedProduct = await productCollection.findOne(filter);

            // Notify customers and suppliers when the product stock becomes 0
            if (updatedProduct && updatedProduct.stock === 0) {
                io.emit('productOutOfStock', { product_id: updatedProduct._id });
            }

            res.status(200).json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default editProducts;




