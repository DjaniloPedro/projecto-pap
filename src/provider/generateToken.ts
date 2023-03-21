import dotenv from 'dotenv'
import { sign } from 'jsonwebtoken'


dotenv.config()

const secret = '827c3122df353cce0c69e3ace444dddc'

export function GenerateToken(userId: string) {
     
      
      return sign({},secret,{
        expiresIn:'30m',
        subject: userId
      })
        
}