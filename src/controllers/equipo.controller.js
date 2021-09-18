import Equipo from '../models/Equipo'

export const createEquipo = async (req, res) => {
    try {
        const newEquipo = new Equipo(req.body)
        await newEquipo.save()
        res.status(200).json(newEquipo)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.find()
        res.status(200).json(equipos)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateEquipo = async (req, res) => {
    try {
        const { id } = req.params
        const params = req.body
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