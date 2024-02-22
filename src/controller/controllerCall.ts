import { callList } from "src/models/listCall"
import { Request, Response } from "express"
import { users } from "src/models/users"
import { permissionUser } from "./controllerUsers"

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

interface User {
    id: number,
    email: string
    username: string,
    password: string,
    nivel: 'administrador' | 'usuário comum',
    isAdmin: boolean
}

const getAllCalls = (req: Request, res: Response) => {
    res.status(200).json(callList)
}

const setCall = (req: Request, res: Response) => {
    const call: Call = req.body

    callList.push(call)

    res.status(200).json({ response: "Chamado adicionado com sucesso!" })
}

const routerUpdate = (req: Request, res: Response)  => {
    const userid = req.body.userId
    const userPermisson = users.find((user: User) => user.id === userid)

    if (userPermisson && permissionUser(userPermisson?.id)) { 
        const call: Call = req.body.call

        updateStatus(call.id, call.status)

        res.status(200).json({ response: "Status do chamado alterado com sucesso!" })
    } else {
        res.status(200).json({ response: "Usuario sem permissão" })
    }
}

const updateStatus = ( callId: number, newStatus: 'pendente' | 'concluido' | 'em análise' ): void => {
    const callUpdate = callList.find(call => call.id === callId)

    if (callUpdate) callUpdate.status = newStatus
    else return
}

export { getAllCalls, setCall, updateStatus, routerUpdate }
