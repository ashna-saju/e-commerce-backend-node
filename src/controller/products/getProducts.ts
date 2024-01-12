import { client } from "../../services/mongodb";
import { Db } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db('e_commerce');

const getProducts = async (req: Request, res: Response): Promise<void> => {
    // try {
    //     const productCollection = db.collection('products');
    //     const result = await productCollection.find().toArray();
    //     console.log(result);
    //     res.status(200).json(result);
    // } catch (error) {
    //     res.status(500).json({ status: "Internal Server Error" });
    // }

    try {
        const { userID, client_type } = req.body.jwt_decoded;
        const productCollection = db.collection('products');
        const result = await productCollection.find({ userID }).toArray();
        res.status(200).json({ ...result });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getProducts;
