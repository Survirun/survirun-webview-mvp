import { createContext } from "react"

interface InventorySelectProps {
    invenSelect: (leftText?: string, rightText?: string) => Promise<number>
}

export const InventorySelectContext = createContext<InventorySelectProps>({
    invenSelect: () => new Promise((_, reject) => reject()),
})