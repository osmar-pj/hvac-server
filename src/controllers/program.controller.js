import Program from '../models/Program'

export const createProgram = async (req, res) => {
    try {
        console.log(req.body)
        const newProgram = new Program(req.body)
        await newProgram.save()
        res.status(200).json(
            {
                saved: true,
                program: newProgram
            }
        )
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find().populate("equipo").sort({_id: -1})
        const pendingPrograms = programs.filter(program => program.status == false)
        res.status(200).json({
            programs, pendingPrograms
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateEquipo = async (req, res) => {
    try {
        const { id } = req.params
        const { ganttBarConfig } = req.body
        const program = Program.find({ _id: id })
        const updatedProgram = await program.updateOne(ganttBarConfig)
        res.status(200).json(updatedProgram)
    } catch (error) {
        return res.status(500).json(error)
    }
}
