import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
// import mqtt from 'mqtt'
require('dotenv').config()

import { createServer } from 'http'

// importamos las routes
import authRoutes from './routes/auth.routes'
import workerRoutes from './routes/worker.routes'
import equipoRoutes from './routes/equipo.routes'
import programRoutes from './routes/program.routes'
import helpRoutes from './routes/help.routes'
import workRoutes from './routes/work.routes'
import repuestoRoutes from './routes/repuesto.routes'
import backlogRoutes from './routes/backlog.routes'

import { createRoles, createHelp, createEquipo } from "./libs/initialSetup"
// IMPORT MODELS

const app = express();

// config sockets
const server = createServer(app)
const io = require('socket.io')(server)

createRoles()
createHelp()
createEquipo()
//createAdmin(); // para mejorar el codigo del weon de fazt

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000"
};
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Welcome Routes

// Routes
app.use('/auth/api', authRoutes)
app.use('/api/worker', workerRoutes)
app.use('/api/equipo', equipoRoutes)
app.use('/api/program', programRoutes)
app.use('/api/help', helpRoutes)
app.use('/api/work', workRoutes)
app.use('/api/repuesto', repuestoRoutes)
app.use('/api/backlog', backlogRoutes)

// MQTT
// let USERS = {}

// io.on("connection", (socket) => {
//   console.log(`${socket.id} was connected`)
//   USERS[socket.id] = socket

//   socket.on('disconnect', () => {
//     console.log(`${socket.id} was disconnected`)
//   })
// })

// const options = {
//   clientId: 'SERVER-DETECTOR',
//   username: 'ServerNode',
//   password: ''
// }

// const connectUrl = `${process.env.BASE_URL_MQTT}`
// const client = mqtt.connect(connectUrl, options)
// client.on('connect', () => {
//   console.log('Client connected by SERVER:')
//   // Subscribe
//   client.subscribe(`${process.env.TOPIC_MQTT_DETECTOR}`, { qos: 0 })
// })

// client.on('message', async (topic, message) => {
//   const data = JSON.parse(message.toString())
//   if (data.detector_rasp) {
//     const save_data = new Data(data.detector_rasp)
//     await save_data.save()
//   }
  
// })

setInterval(async () => {

}, 1000)

server.listen(process.env.PORT, () => {
  console.log('server is ok')
})

export default app