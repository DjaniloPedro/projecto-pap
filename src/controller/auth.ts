import { compare } from "bcrypt"
import { db } from "../prisma/connect"
import { GenerateToken } from "../provider/generateToken"

interface User {

    email: string 
    password: string 
}


export class Authentication {

    static async execute({email, password}:User) {

          const email_check =  await db.user.findFirst({
            where:{
                email
            }
          })

         if (!email_check){
           
             throw new Error("Email ou senha está incorreta!")
         }

         const password_check = await compare(password, email_check.password)
         
         if (!password_check) {

            throw new Error("Email ou senha está incorreta!")
         }


         const token =  GenerateToken(email_check.id)

         return  {"token":token}

         
    }

}