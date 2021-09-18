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
import dashRoutes from './routes/dash.routes'

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
app.use('/api/dash', dashRoutes)

// MQTT
let USERS = {}

io.on("connection", (socket) => {
  console.log(`${socket.id} was connected`)
  USERS[socket.id] = socket

  socket.on('disconnect', () => {
    console.log(`${socket.id} was disconnected`)
  })
})

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

import Equipo from './models/Equipo'
import Report from './models/Work'
import Program from './models/Program'

setInterval(async () => {
  const equipos = await Equipo.find()
  const reports = await Report.find().populate('program')
  const programs = await Program.find().populate("equipo").sort({_id: -1})
  const pendingPrograms = programs.filter(program => program.status == false)
  const inoperativos = await equipos.filter(equipo => equipo.status == 'inoperativo')
  const operativos = await equipos.filter(equipo => equipo.status == 'operativo')
  let horasAcumuladasProgramadas = 0
  if (programs.length > 0) {
      horasAcumuladasProgramadas = programs.map(program => {
          return (new Date(program.barList[0].myEnd).getTime() - new Date(program.barList[0].myStart).getTime())/3600000
      }).reduce((a,b) => a + b)
  }
  const preventivos = reports.filter(report => report.program.type_work == 'preventive')
  let horasAcumuladasPreventivas = 0
  if (preventivos.length > 0) {
      horasAcumuladasPreventivas = preventivos.map(prev => {
          return (new Date(prev.endDate).getTime() - new Date(prev.startDate).getTime())/3600000
      }).reduce((a,b) => a + b)
  }
  const correctivos = reports.filter(report => report.program.type_work == 'corrective')
  let horasAcumuladasCorrectivas = 0
  if (correctivos.length > 0) {
      horasAcumuladasCorrectivas = correctivos.map(prev => {
          return (new Date(prev.endDate).getTime() - new Date(prev.startDate).getTime())/3600000
      }).reduce((a,b) => a + b)
  }
  const inspecciones = reports.filter(report => report.program.type_work == 'inspection')
  let horasAcumuladasInspeccion = 0
  if (inspecciones.length > 0) {
      horasAcumuladasInspeccion = inspecciones.map(prev => {
          return (new Date(prev.endDate).getTime() - new Date(prev.startDate).getTime())/3600000
      }).reduce((a,b) => a + b)
  }
  const fallas = reports.filter(report => report.program.type_work == 'failed')
  let horasAcumuladasFallas = 0
  if (fallas.length > 0) {
      horasAcumuladasFallas = fallas.map(prev => {
          return (new Date(prev.endDate).getTime() - new Date(prev.startDate).getTime())/3600000
      }).reduce((a,b) => a + b)
  }
  for (let i in USERS) {
    USERS[i].emit('dashboard', {
      data: {
        equipos: {
            operativos: operativos.length,
            inoperativos: inoperativos.length,
            total : equipos.length,
        },
        programas: {
            total: programs.length,
            horas: horasAcumuladasProgramadas
        },
        reportes: {
            preventivos: preventivos.length,
            horasAcumuladasPreventivas,
            correctivos: correctivos.length,
            horasAcumuladasCorrectivas,
            inspecciones: inspecciones.length,
            horasAcumuladasInspeccion,
            fallas: fallas.length,
            horasAcumuladasFallas
        }
      }
    })
  }
  for (let i in USERS) {
    USERS[i].emit('programs', pendingPrograms)
  }
}, 1000)

server.listen(process.env.PORT, () => {
  console.log('server is ok')
})

export default app