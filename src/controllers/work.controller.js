import Work from '../models/Work'
import Program from '../models/Program'

export const doWork = async (req, res) => {
    try {
        const newWork = new Work(req.body)
        await newWork.save()
        const id = req.body.program
        const program = await Program.findOne({_id: id})
        await program.updateOne({status: true})
        res.status(200).json({saved: true})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getWorks = async (req, res) => {
    try {
        const works = await Work.find().populate({ path: 'program', populate: { path: 'equipo' } }).populate('workers').sort({_id: -1})
        res.status(200).json(works)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getReport = async (req, res) => {
    try {
        const { id } = req.params
        const report = await Work.findOne({_id: id})
        console.log(report)
        res.status(200).json(report)
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