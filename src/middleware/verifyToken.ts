import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"






export function virifyToken(req: Request, res: Response, next: NextFunction){
  
    const authToken = req.cookies['token']
    const secret =  '827c3122df353cce0c69e3ace444dddc'

    console.log(authToken,secret)
    
    if(!authToken) {
        
        res.redirect('/login')
    }

    
    
    try{
        
        verify(authToken,secret) 
      
        return next()


    }catch(err) {
        
        res.redirect('/login')
    }


}