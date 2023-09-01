import { AlertState } from "./AlertDialog";

export const Alert = ({message, leftText, rightText, onClickLeft, onClickRight}: AlertState) => {
    return(
        // <Frame>
        //     <Background/>
        //     <AlertStyle>
        //         <AlertMessage>{message}</AlertMessage>
        //         <AlertButtons>
        //             <Button onClick={onClickLeft}>{leftText}</Button>
        //             <Button onClick={onClickRight}>{rightText}</Button>
        //         </AlertButtons>
        //     </AlertStyle>
        // </Frame>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
            <div className="fixed w-full h-full bg-black bg-opacity-30"></div>
            <div className="w-80 h-44 p-4 bg-white rounded-lg flex-col justify-start items-start gap-5 inline-flex z-[11]">
                <div className="flex-col justify-start items-start gap-3 flex">
                    <div className="text-zinc-900 text-[17px] font-bold">{message}</div>
                    <div className="text-gray-500 text-[14px] font-semibold">가방이 가득 찼어요.<br/>아이템을 버려야 해요.</div>
                </div>
                <div className="w-72 justify-start items-start gap-2 inline-flex">
                    <button onClick={onClickLeft} className="h-10 p-2 bg-gray-100 rounded-xl justify-center items-center flex text-zinc-900 text-[13px] font-semibold hover:opacity-80">{leftText}</button>
                    <button onClick={onClickRight} className="h-10 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold hover:opacity-80">{rightText}</button>
                </div>
            </div>
        </div>
    );
}