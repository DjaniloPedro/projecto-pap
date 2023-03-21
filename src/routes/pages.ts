import { Request, Response, Router } from "express"
import { Authentication } from "../controller/auth"
import { CreateUser } from "../controller/user"



export const route =  Router() 


route.get('/', (req: Request, res: Response) => {
     res.render('pages/index')
} )


route.get('/login', (req: Request, res: Response) => {

       res.render('pages/login',{error:false})
})


route.post('/login', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body 
        const auth = await Authentication.execute({
            email,
            password,
       })
       res.redirect('/home')
       } catch(err) {
            
            res.render('pages/login',{
                error: err.message,
       })
       }
     

      


})


route.get('/cadastrar', (req: Request, res: Response) => {
      
       res.render('pages/cadastrar',{
           error: false,
           message:false
       })
})

route.post('/cadastrar', async (req: Request, res: Response) => {
     try{
           const username = req.body.username
           const email = req.body.email 
           const phone_number = req.body.phone_number 
           const password = req.body.password 

           
          
           const user_create =  await CreateUser.execute({
              username,
              email,
              phone_number,
              password,
           })

           res.render('pages/cadastrar',{
               error: false,
               message: user_create.error
           })
            



      }catch(err){
          res.render('pages/cadastrar',{
               error: err.message,
               message: false
           })
      }
})


route.get('/home',(req: Request, res: Response) => {
     
      res.render('pages/home')
})


route.get('/testPerfile', (req: Request, res: Response) => {


})