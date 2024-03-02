import { users } from "src/models/users"
import { Request, Response } from "express"
import { sign } from 'jsonwebtoken'

interface User {
	id: number,
	email: string
	username: string,
	password: string,
	nivel: 'administrador' | 'usuário comum',
	isAdmin: boolean
}

interface Login {
	email: string,
	password: string
}

const secretKey = 'skljaksdj9983498327453lsldkj@@#'

const login = (req: Request, res: Response) => {
  const login: Login = req.body

	if (login) {
		const userAlvo = users.find((user: User) => user.email === login.email)

		console.log(userAlvo)
		console.log(login)

		if (!userAlvo || userAlvo === undefined) {
			res.status(401).json({menssage: 'Email ou senha invalido'})
		} else if (!userAlvo.password || userAlvo?.password !== login.password) {
			res.status(401).json({menssage: 'Email ou senha invalido'})
		}

		const token = sign(login, secretKey)

		res.status(200).json({
			statusCode: 200,
			message: 'Login realizado com sucesso',
			toke: token
		})
	} else res.status(200).json({message: 'Erro: campos de email e senha não podem ser vazio'})
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
    const createUser: User = req.body

    users.push(createUser)
    res.status(200).json({ response: "Usuário criado com sucesso" })
}

const updateUser = (req: Request, res: Response) => {
    const userId: number = req.body.id
    const userUpdate: any = users.find((user: User) => user.id === userId)

    if (userUpdate) {
        const update: any = req.body.updates
        
        Object.keys(update).map((key: string): void => {
            if (key === "id" || key === "isAdmin") {
                res.status(200).json({ response: "Campo inválido" })
            } else if (key === "username" || key === "password" || key === "email") {
                userUpdate[key] = update[key]
                
                res.status(200).json({ response: "Usuário atualizado com sucesso" })
            } else {
                res.status(200).json({ response: "Campo inexistente" })
            }
        })
    } else res.status(200).json({ response: "Usuário não encontrado" })
}

const deleteUser = (req: Request, res: Response): void => {
    const userId: number = req.body.id
    const deletedUser: number = users.findIndex((user: User) => user.id === userId)

    if (userId !== 1) {
        if (deletedUser !== -1) {
            users.splice(deletedUser, 1)
            res.status(200).json({ response: "Usuário deletado com sucesso" })
        } else {
            res.status(200).json({ response: "Usuário não encontrado" })
        }
    } else res.status(200).json({ response: "Erro: Insira um id valido" })
}

export { permissionUser, setUser, updateUser, deleteUser, getUsers, login }
