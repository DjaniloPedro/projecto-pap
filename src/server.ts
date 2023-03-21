import express from 'express' 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { route } from './routes/pages'


dotenv.config()


const server = express()

server.set('view engine','ejs')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(express.static(__dirname + '/public'))
server.use(route)

server.listen(process.env.PORT, () => console.log('server is runng...'))