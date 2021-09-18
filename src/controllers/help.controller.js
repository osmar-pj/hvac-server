import Work from '../models/Work'

export const getQtyEquipos = async (req, res) => {
    try {
        const { id } = req.params
        const works = await Work.find()
        const worksDone = works.filter(work => work.workers.some(data => data == id))
        res.status(200).json(worksDone)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createData = async (req, res) => {
     
}