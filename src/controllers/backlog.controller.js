import Backlog from '../models/Backlog'

export const createBacklog = async (req, res) => {
    try {
        const newBacklog = new Backlog(req.body)
        await newBacklog.save()
        res.status(200).json(newBacklog)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getWorks = async (req, res) => {
    try {
        const works = await Work.find()
        res.status(200).json(works)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateEquipo = async (req, res) => {
    try {
        const { id } = req.params
        const { param } = req.body
        const equipo = Equipo.find({ _id: id })
        const updatedEquipo = await equipo.updateOne(params)
        res.status(200).json(updatedEquipo)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const searchEquipo = async (req, res) => {
    try {
        const { text } = req.params
        const equipos = await Equipo.find()
        const filteredEquipos = equipos.filter(equipo => {
          return equipo.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
        })
        res.status(200).json(filteredEquipos)
    } catch (error) {
        return res.status(500).json(error)
    }
}