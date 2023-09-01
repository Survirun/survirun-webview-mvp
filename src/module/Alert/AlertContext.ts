import { createContext } from "react"

interface AlertProps {
    alert: (message?: string, subMessage?: string, leftText?: string, rightText?: string) => Promise<boolean>
}

export const AlertContext = createContext<AlertProps>({
    alert: () => new Promise((_, reject) => reject()),
})
