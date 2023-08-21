import React, { useState } from "react";
import AlertContext from "./AlertContext";
import { Alert } from "./Alert";

export interface AlertState {
    message: string;
    leftText: string;
    rightText: string;
    onClickLeft: () => void;
    onClickRight: () => void;
}

const AlertDialog = ({ children }: {children: React.ReactNode}) => {
    const [state, setState] = useState<AlertState>();

    const alert = (message?: string, leftText?: string, rightText?: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                message: message ?? '',
                leftText: leftText ?? '취소',
                rightText: rightText ?? '확인',
                onClickLeft: () => {
                    setState(undefined);
                    resolve(false);
                },
                onClickRight: () => {
                    setState(undefined);
                    resolve(true);
                },
            });
        });
    };

    return(
        <AlertContext.Provider value={{ alert }}>
            {children}
            {state && (
                <Alert
                    message={state.message}
                    leftText={state.leftText}
                    rightText={state.rightText}
                    onClickLeft={state.onClickLeft}
                    onClickRight={state.onClickRight}
                />
            )}
        </AlertContext.Provider>
    )
}

export default AlertDialog;