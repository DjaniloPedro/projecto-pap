import { Request, Response, Router } from "express"
import { Authentication } from "../controller/auth"
import { CreateUser } from "../controller/user"
import { virifyToken } from "../middleware/verifyToken"



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

       res.cookie('token',auth.token , { expires: new Date(Date.now() + 900000),secure:true ,httpOnly: true })
       
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


route.get('/home',virifyToken,(req: Request, res: Response) => {
     
      res.render('pages/home')
})


route.get('/testPerfile',virifyToken, (req: Request, res: Response) => {
    
    res.render('pages/testPerfile',{
         content: ''
    })

})


route.post('/testPerfile', virifyToken,(req: Request, res: Response) => {

      const {p1,p2,p3,p4,p5} = req.body 

      let points: number 
      //  "Jornalismo", "Literatura", "Educação"   p1 0  p2 0 p3 0 p4 1 p5 
      if (p1 == 0 || p2 == 0 || p3 == 0 || p4 == 1 || p5 == 0) {
    
        res.render('pages/testPerfile', { 
            content: `Tens Perfile para seguintes cursos Jornalismo,Literatura,Educação,Publicidade, Psicologia `
        }) 

      }else if(p1 == 3 ||  p2 == 3 || p3 == 1 || p4 == 0 || p5 == 2) {
        res.render('pages/testPerfile', { 
            content: ` Tens Perfile para seguintes cursos Informática,Electrónica e telecominicação, ciência da computação `
        }) 

      } else if(p2 == 1 || p3 == 0 || p4 == 2 || p5 == 0) {
        res.render('pages/testPerfile', { 
            content: ` Tens Perfile para seguintes cursos Medicina, Enfermagem, Farmácia`
        })
      } else if(p2 == 2 || p3 == 0  || p5 == 0 ) {
        res.render('pages/testPerfile', { 
            content: ` Tens Perfile para seguintes cursos Direito", Ciências Sociais, Turismo`
        })
      }else if(p2 == 2 || p3 == 0 || p4 == 3 || p5 == 0){
       
        res.render('pages/testPerfile', { 
            content: ` Tens Perfile para seguintes cursos Direito,Contabilidade,Administração, Economia e negócios`
        })

      }


     
 

      

/*

   

 */
      
} )



route.get('/logout', (req: Request, res: Response) => {
     res.clearCookie('token')
     res.redirect('/')
})