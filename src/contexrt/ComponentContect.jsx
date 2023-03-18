import { createContext, useContext, useState } from "react"

export const ComponentContext = createContext()

export const ComponentProvider = ({ children }) => {
    const [warning, setWarning] = useState({
        trigger: false,
        message: ""
    })

    const Warning = (message,time=3000) => {
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
        warning
    }}>
        {children}
    </ComponentContext.Provider >
}


export const useComponentContext = () => {
    return useContext(ComponentContext)
}