import { callList } from "src/models/listCall"
import { Request, Response } from "express"

interface Call {
    id: number,
    name: string,
    sector: string
    subject: string,
    description: string,
    date: string
    category: 'windows' | 'senior' | 'outlook/email' | 'PC' | 'depot' | 'outros',
    status: 'pendente' | 'concluido' | 'em análise'
}

const getAllCalls = (req: Request, res: Response) => {
    res.status(200).json(callList)
}

const setCall = (req: Request, res: Response) => {
    const call: Call = req.body

    callList.push(call)

    res.status(200).json({ response: "Chamado adicionado com sucesso!" })
}

export { getAllCalls, setCall }
