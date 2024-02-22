interface User {
    id: number,
    email: string
    username: string,
    password: string,
    nivel: 'administrador' | 'usuário comum',
    isAdmin: boolean
}

const users: User[] = [
    {
        id: 1,
        email: 'ti@atlantis-ssz.com.br',
        username: 'ti',
        password: 'ti1234',
        nivel: 'administrador',
        isAdmin: true
    },
    {
        id: 2,
        email: 'ti@atlantis-ssz.com.br',
        username: 'Zé',
        password: '1234',
        nivel: 'usuário comum',
        isAdmin: false
    }
]

export { users }
