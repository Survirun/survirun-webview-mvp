import { AlertState } from "./AlertDialog";
import { useButtonDelay } from "../../hooks";

export const Alert = ({message, subMessage, leftText, rightText, onClickLeft, onClickRight}: AlertState) => {
    return(
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full">
            <div className="fixed w-full h-full bg-black bg-opacity-30"></div>
            <div className="w-80 h-44 p-4 bg-white rounded-lg flex-col justify-start items-start gap-5 inline-flex z-[11]">
                <div className="flex flex-col items-start justify-start gap-3">
                    <div className="text-zinc-900 text-[17px] font-bold">{message}</div>
                    <div className="text-gray-500 text-[14px] font-semibold whitespace-pre-line">{subMessage}</div>
                </div>
                <div className="inline-flex items-start justify-start gap-2 w-72">
                    <button onClick={() => useButtonDelay(onClickLeft)} className="w-36 h-10 p-2 bg-gray-100 rounded-xl justify-center items-center flex text-zinc-900 text-[13px] font-semibold active:bg-gray-200 active:scale-90 duration-150 ease-out">{leftText}</button>
                    <button onClick={() => useButtonDelay(onClickRight)} className="w-36 h-10 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold active:bg-red-500 active:scale-90 duration-150 ease-out">{rightText}</button>
                </div>
            </div>
        </div>
    );
}