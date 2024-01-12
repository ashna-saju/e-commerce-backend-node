import { Request, Response } from 'express';
import express from 'express';
import  EcSuppliers  from '../src/Models/ec_suppliers'
import sequelize from './config/sequelize-config'
import supplierRouter from './router/supplier-routes';
import router from './router/Login-router';
import customerRouter from './router/customer-router';
import { middlewareExample1, middlewareExample2} from './middleware/middlewareExample';
import { stopMongoDb } from './services/mongodb';
import sequelizeSync from './services/sequelize';
import cors from 'cors';
import { Server, Socket } from "socket.io";
import { createServer } from 'node:http';
import { initializeSocket } from './services/socket';
const app = express();
const server=createServer(app);

const io=initializeSocket(server)
    //creating an instance of the socket io
const port = process.env.PORT || 3000;
// const io = new Server(server, httpServer, {
//   cors: {
//     origin: 'http://localhost:8080', // Add a colon after "http"
//   },
// });

sequelizeSync();
// sequelize.sync({
//   force: false
// })
// .then(() => {
//   console.log('Tables synchronized successfully.');
// })
// .catch((error:unknown) => {
//   console.error('Error synchronizing models:', error);
// });
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get("/", (req: Request, res: Response) => {
//   const { name, age } = req.query;
//   if (name && age) {
//     res.send(`Welcome, ${name}! You are ${age} years old.`);
//   } else {
//     res.send("Welcome...");
//   }
// });

// app.post("/contact", (req: Request, res: Response) => {
//   const { name, age } = req.body;

//   if (!name) {
//     res.status(500).json({ error: "Name is required in the request body." });
//   } else {

//     if (name && age) {
//       res.status(200).json({ message: `Welcome, ${name}! You are ${age} years old.` });
//     } else {
//       res.status(400).json({ error: "Age is required in the request body." });
//     }
//   }
// });

// app.post("/createSupplier", async(req: Request, res: Response) => {
//   console.log("Received POST request at /createSupplier:", req.body);
//   // try {
//     const { full_name, e_mail, password, profile_pic } = req.body;
//     await EcSuppliers.create({
//       full_name,
//       e_mail,
//       password,
//       profile_pic: Buffer.from(profile_pic),
//     }, { raw: true });

//     res.status(201).json({ message:"hello"});
  
// });
// app.get("/findSupplier", (req: Request, res: Response) => {
//     const {full_name}= req.query

//     res.status(200).json({ message: "Implement logic to find a supplier." });
// });
app.use((req,res,next)=>{
  console.log("hi from middleware");
  next();
})

interface CustomerRequest extends Request{
  customProperty?:object;
}
// app.use((req:CustomerRequest,res,next)=>{
// middlewareExample1(req,res,next); 
// });

// app.use((req,res,next)=>{
// middlewareExample2(req,res,next);
// });

app.get('/example',middlewareExample1,middlewareExample2,(req:CustomerRequest,res:Response)=>{
  console.log('Route Handler-Handling Request');
  const customProperty=req.customProperty??'Not Available';
  res.send(customProperty);
});

app.use('/api/v1',supplierRouter);
app.use('/api/v2',customerRouter);
app.use('/login',router);

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log('socket is',socket);
  socket.emit("event emitted","Hello World");
  socket.on('out of stock emit received',()=>{
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



// Socket.on('disconnect',()=>){
//   console.log('User disconnected');
// });



server.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
process.on("SIGINT",()=>{
  sequelize.close(); stopMongoDb();
  process.exit();
})

process.on("exit",()=>{
  sequelize.close(); stopMongoDb();
})
export default io;