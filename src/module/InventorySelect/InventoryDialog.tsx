import React, { useState } from "react";
import InventorySelectContext from "./InventoryContext";
import { InventorySelect } from "./InventorySelect";

export interface InventorySelectProps {
    leftText: string;
    rightText: string;
    onClickLeft: () => void;
    onClickRight: (index: number) => void;
}

const InventorySelectDialog = ({ children }: {children: React.ReactNode}) => {
    const [state, setState] = useState<InventorySelectProps>();

    const invenSelect = (leftText?: string, rightText?: string): Promise<number> => {
        return new Promise((resolve) => {
            setState({
                leftText: leftText ?? '취소',
                rightText: rightText ?? '버리기',
                onClickLeft: () => {
                    setState(undefined);
                    resolve(-1);
                },
                onClickRight: (index: number) => {
                    setState(undefined);
                    resolve(index);
                },
            });
        });
    };

    return(
        <InventorySelectContext.Provider value={{ invenSelect }}>
            {children}
            {state && (
                <InventorySelect
                    leftText={state.leftText}
                    rightText={state.rightText}
                    onClickLeft={state.onClickLeft}
                    onClickRight={state.onClickRight}
                />
            )}
        </InventorySelectContext.Provider>
    )
}

export default InventorySelectDialog;