export const Lobby = () => {
    return (
        <div className="absolute w-screen h-screen bg-[url('https://i.pinimg.com/564x/54/59/cd/5459cdf629146ad9710fdd9dab0a562f.jpg')] bg-no-repeat bg-cover">
            <div className="flex items-center justify-start w-full h-full">
                <img className="absolute right-0 w-[300px] bottom-10" 
                    src="/img/여성.png"/>
                <button className="w-36 h-10 ml-8 p-2 bg-red-600 rounded-xl justify-center items-center flex text-white text-[13px] font-semibold active:bg-red-500 active:scale-90 duration-150 ease-out">
                    모험 떠나기
                </button>
            </div>
            
        </div>
    )
}