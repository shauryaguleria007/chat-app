import { createContext, useContext, useState } from "react"

export const ComponentContext = createContext()

export const ComponentProvider = ({ children }) => {
    const [showContacts, setShowContacts] = useState(true)
    const [displaySearch, setDisplaySearch] = useState({
        display: false,
        x: 0,
        y: 0,
        z: 0
    })
    const [warning, setWarning] = useState({
        trigger: false,
        message: ""
    })

    const Warning = (message, time = 3000) => {
        setWarning({
            trigger: true,
            message
        })
        setTimeout(() => setWarning({
            trigger: false,
            message: ""
        }), time)
    }
    return <ComponentContext.Provider value={{
        Warning,
        warning,
        showContacts,
        setShowContacts,
        displaySearch,
        setDisplaySearch
    }}>
        {children}
    </ComponentContext.Provider >
}


export const useComponentContext = () => {
    return useContext(ComponentContext)
}