import { createContext } from "react"

interface AlertProps {
    alert: (message?: string, leftText?: string, rightText?: string) => Promise<boolean>
}

const AlertContext = createContext<AlertProps>({
    alert: () => new Promise((_, reject) => reject()),
})

export default AlertContext;