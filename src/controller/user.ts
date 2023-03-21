import { hash } from "bcrypt"
import { db } from "../prisma/connect"

interface User  {
   
    username: string 
    email: string 
    phone_number: string 
    password: string 
     
}


export class CreateUser {

      static async execute({username,email,phone_number,password}:User) {
          
              const userAlreadyExiste = await db.user.findFirst({
                   where:{
                    username
                   }
              })

              if(userAlreadyExiste) {
                 throw new Error('Utilizador já existe!')
              }

              const passwordHash = await hash(password,15) 

              const create_user  =  await db.user.create({
                data:{
                     username,
                     email,
                     phone_number,
                     password:passwordHash,

                }
              })


            return {"error":`${username} foi cadastrado com sucesso!`}

      }

}