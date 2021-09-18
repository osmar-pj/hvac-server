import Equipo from '../models/Equipo'
import Report from '../models/Work'
import Program from '../models/Program'

export const getDataDashboard = async (req, res) => {
    try {
        const equipos = await Equipo.find()
        const reports = await Report.find().populate('program')
        const programs = await Program.find()
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
        res.json({
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
    } catch (error) {
        console.error(error)
    }
}