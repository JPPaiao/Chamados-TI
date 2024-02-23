import { users } from "src/models/users"
import { Request, Response } from "express"

interface User {
    id: number,
    email: string
    username: string,
    password: string,
    nivel: 'administrador' | 'usuário comum',
    isAdmin: boolean
}

const permissionUser = (userId: number): boolean => {
    const checkUser = users.find(user => user.id === userId)

    return checkUser?.isAdmin ? true : false
}

const getUsers = (req: Request, res: Response) => {
    const userId = req.body.id
    
    if (permissionUser(userId)) res.status(200).json(users)
    else res.status(200).json({ response: "Usuário sem permissão" })
}

const setUser = (req: Request, res: Response) => {
    const createUser: User = req.body.user

    users.push(createUser)
}

const updateUser = (req: Request, res: Response) => {
    const userId: number = req.body.id
    const userUpdate: any = users.find((user: User) => user.id === userId)

    if (userUpdate) {
        const update: any = req.body.updates
        
        Object.keys(update).map((key: string): void => {
            if (typeof key !== "boolean" || typeof key !== "number") {
                userUpdate[key] = update[key]
                
                res.status(200).json({ response: "Usuário atualizado com sucesso" })
            }
        })
    }
    res.status(200).json({ response: "Usuário não encontrado" })
}

const deleteUser = (req: Request, res: Response): void => {
    const userId: number = req.body.id
    const deletedUser: number = users.findIndex((user: User) => user.id === userId);

    if (deletedUser !== -1) {
        users.splice(deletedUser, 1)
        res.status(200).json({ response: "Usuário deletado com sucesso" })
    } else {
        res.status(200).json({ response: "Usuário não encontrado" })
    }

}

export { permissionUser, setUser, updateUser, deleteUser, getUsers }
