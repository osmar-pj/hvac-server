import Help from '../models/Help'

export const createHelp = async (req, res) => {
    try {
        await newHelp.save()
        res.status(200).json(newHelp)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getHelp = async (req, res) => {
    try {
        const helps = await Help.find()
        res.status(200).json(helps)
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


// PRUEBAS DON NANO ETHERNET
export const text = async (req, res) => {
    try {
        const { text } = req.params
        console.log(text)
        res.status(200).json()
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createData = async (req, res) => {
     
}