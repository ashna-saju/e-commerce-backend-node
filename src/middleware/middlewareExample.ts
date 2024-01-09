import { NextFunction, Request, Response } from 'express'; 

interface CustomerRequest extends Request{
customProperty?:object;
  }
 export const middlewareExample1 = async (req: CustomerRequest, res: Response, next: NextFunction)=> {
  req.customProperty={message:'hello'};
  next();
}

export const middlewareExample2 = async (req: CustomerRequest, res: Response, next: NextFunction)=> {
res.setHeader('Content-Type','application/json');
res.setHeader('Set-cookie',['type=ninja','language=javascript']);
next();
  }

  

