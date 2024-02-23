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

const callList: Call[] = [
    {
        id: 1,
        name: 'Jp',
        category: 'senior',
        date: new Date().toLocaleDateString(),
        description: 'testestes',
        sector: 'TI',
        status: "pendente",
        subject: 'Senior error'
    },
    {
        id: 2,
        name: 'Jp',
        category: 'senior',
        date: new Date().toLocaleDateString(),
        description: 'testestes',
        sector: 'TI',
        status: "pendente",
        subject: 'Senior error'
    },
]

export { callList }
