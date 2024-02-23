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

const setUser = (req: Request, res: Response) => {
    const createUser: User = req.body.user

    users.push(createUser)
}

const updateUser = (req: Request, res: Response) => {
    const userId: number = req.body.id
    const userUpdate = users.find((user: User) => user.id === userId)

    // if (userUpdate) {
    //     const 
    // }
}

const deleteUser = (req: Request, res: Response): void => {
    const userId: number = req.body.id
    const deletedUser: number = users.findIndex((user: User) => user.id === userId);

    if (deletedUser !== -1) {
        users.splice(deletedUser, 1)
    }

    res.status(200).json({ response: "test" })
}

export { permissionUser, setUser, updateUser, deleteUser }
