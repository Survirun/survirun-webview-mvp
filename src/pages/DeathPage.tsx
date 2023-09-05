export const DeathPage = () => {
    return (
        <div className="w-screen h-screen relative bg-white">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[360px] h-[300px] min-w-[360px] bg-black text-white" 
                    src="https://i.pinimg.com/564x/90/19/d0/9019d063a1437f4b48d840fba739f1b7.jpg"/>
                <div className="h-[260px] w-full flex-col justify-start items-start flex">
                    <h3 className="px-5 pt-6 pb-3 inline-flex text-zinc-900 text-[17px] font-semibold">
                        죽음
                    </h3>
                    <div className="overflow-y-scroll px-5 pb-3">
                        <div className="pb-1 text-zinc-900 text-base font-medium">
                            유감
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="absolute bottom-0">
                <div className="h-3 w-screen bg-gray-100 border-b"/>
                <div className="w-screen px-5 py-4 flex-col justify-start items-start gap-3 flex">
                        <button className="self-stretch p-3.5 bg-stone-300  rounded-xl justify-between items-center inline-flex">
                            <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
                                제목제목
                                <span className="m-1 text-gray-500 text-[15px] font-semibold">
                                    ㅇㄴㅁㅇㅇㄴㅁ
                                </span>
                            </p>
                        </button>
                </div>
            </div>
        </div>
    )
}