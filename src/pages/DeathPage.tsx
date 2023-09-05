export const DeathPage = () => {
    return (
        <div className="w-screen h-screen relative bg-white">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[360px] h-[300px] min-w-[360px] bg-black text-white" 
                    src="https://i.pinimg.com/564x/90/19/d0/9019d063a1437f4b48d840fba739f1b7.jpg"/>
                <div className="h-[260px] w-full flex-col justify-start items-start flex">
                    <h3 className="px-5 pt-6 pb-3 inline-flex text-zinc-900 text-[17px] font-semibold">
                        사망하셨습니다.
                    </h3>
                    <div className="overflow-y-scroll px-5 pb-3">
                        <div className="pb-1 text-zinc-900 text-base font-medium">
                            유감입니다.
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="absolute bottom-0">
                <div className="h-3 w-screen bg-gray-100 border-b"/>
                <div className="w-screen px-5 py-4 flex-col justify-start items-start gap-3 flex">
                    <button className="self-stretch p-3.5 bg-gray-100 rounded-xl justify-between items-center inline-flex active:bg-gray-200 active:scale-95 duration-150 ease-out">
                        <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
                            다시하기
                        </p>
                        
                        <div className="origin-top-left rotate-180 w-5 h-5 relative">
                            <svg className="w-5 h-5 left-0 top-0 absolute origin-top-left rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <mask id="mask0_1118_8405" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                    <rect width="20" height="20" transform="matrix(-1 0 0 1 20 0)" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1118_8405)">
                                    <path d="M10.7533 15.9071L16.1331 10.5272C16.2111 10.4493 16.2661 10.367 16.2981 10.2805C16.3302 10.1939 16.3462 10.1005 16.3462 10C16.3462 9.89959 16.3302 9.80611 16.2981 9.71958C16.2661 9.63304 16.2111 9.55078 16.1331 9.47279L10.7453 4.08498C10.6299 3.96959 10.4883 3.90976 10.3206 3.90548C10.1528 3.90121 10.0043 3.96371 9.87507 4.09298C9.7458 4.2137 9.67903 4.35793 9.67475 4.52567C9.67049 4.69339 9.73299 4.84189 9.86225 4.97117L14.2661 9.37504H4.59303C4.41568 9.37504 4.26718 9.43487 4.14753 9.55452C4.02787 9.67417 3.96805 9.82267 3.96805 10C3.96805 10.1774 4.02787 10.3259 4.14753 10.4455C4.26718 10.5652 4.41568 10.625 4.59303 10.625H14.2661L9.85423 15.0369C9.73886 15.1523 9.67903 15.296 9.67475 15.468C9.67049 15.64 9.73299 15.7863 9.86225 15.9071C9.98298 16.0363 10.1293 16.101 10.3013 16.101C10.4734 16.101 10.624 16.0363 10.7533 15.9071Z" fill="#1C1B1F"/>
                                </g>
                            </svg>
                        </div>
                    </button> 
                    <button className="self-stretch p-3.5 bg-gray-100 rounded-xl justify-between items-center inline-flex active:bg-gray-200 active:scale-95 duration-150 ease-out">
                        <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
                            부활하기
                            <span className="m-1 text-gray-500 text-[15px] font-semibold">
                                (치료제 필요)
                            </span>
                        </p>
                        
                        <div className="origin-top-left rotate-180 w-5 h-5 relative">
                            <svg className="w-5 h-5 left-0 top-0 absolute origin-top-left rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <mask id="mask0_1118_8405" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                    <rect width="20" height="20" transform="matrix(-1 0 0 1 20 0)" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1118_8405)">
                                    <path d="M10.7533 15.9071L16.1331 10.5272C16.2111 10.4493 16.2661 10.367 16.2981 10.2805C16.3302 10.1939 16.3462 10.1005 16.3462 10C16.3462 9.89959 16.3302 9.80611 16.2981 9.71958C16.2661 9.63304 16.2111 9.55078 16.1331 9.47279L10.7453 4.08498C10.6299 3.96959 10.4883 3.90976 10.3206 3.90548C10.1528 3.90121 10.0043 3.96371 9.87507 4.09298C9.7458 4.2137 9.67903 4.35793 9.67475 4.52567C9.67049 4.69339 9.73299 4.84189 9.86225 4.97117L14.2661 9.37504H4.59303C4.41568 9.37504 4.26718 9.43487 4.14753 9.55452C4.02787 9.67417 3.96805 9.82267 3.96805 10C3.96805 10.1774 4.02787 10.3259 4.14753 10.4455C4.26718 10.5652 4.41568 10.625 4.59303 10.625H14.2661L9.85423 15.0369C9.73886 15.1523 9.67903 15.296 9.67475 15.468C9.67049 15.64 9.73299 15.7863 9.86225 15.9071C9.98298 16.0363 10.1293 16.101 10.3013 16.101C10.4734 16.101 10.624 16.0363 10.7533 15.9071Z" fill="#1C1B1F"/>
                                </g>
                            </svg>
                        </div>
                    </button> 
                </div>
            </div>
        </div>
    )
}