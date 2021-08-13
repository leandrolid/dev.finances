import { createContext, ReactNode, useState } from 'react'

interface TransactionsPoviderProps {
    children: ReactNode
}
interface TransactionsContextData {
    tableUpdate: number,
    setTableUpdate: (number: number) => void,
    isInflowsActive: boolean,
    setIsInflowsActive: (boolean: boolean) => void,
    isOutflowsActive: boolean,
    setIsOutflowsActive: (boolean: boolean) => void
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsPoviderProps) {

    const [tableUpdate, setTableUpdate] = useState(0)

    const [isInflowsActive, setIsInflowsActive] = useState(false)
    const [isOutflowsActive, setIsOutflowsActive] = useState(false)

    return (
        <TransactionsContext.Provider value={{
            tableUpdate,
            setTableUpdate,
            isInflowsActive,
            setIsInflowsActive,
            isOutflowsActive,
            setIsOutflowsActive
        }} >
            {children}
        </TransactionsContext.Provider>
    )
}