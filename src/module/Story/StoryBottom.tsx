import { useEffect, Dispatch } from "react";
import { useButtonDelay } from "../../hooks";
import { OptionInterface } from "../../pages";

export const StoryBottom = ({ options, setProgress  }: { options: OptionInterface[], setProgress: Dispatch<React.SetStateAction<string>>; }) => {
  const handleOptinoButtonClik = (option: OptionInterface) => {
    useButtonDelay(async() =>{
      clickNextProgress(option.nextProgressStory)
    })
  }
  const sendMapPosstMassage = () => {
    const data = {
      endStory: true,
      battle: true,
    }
    try {
      return window.parent.postMessage(data, '*');
    } catch (err) {
      console.error("Error: sendMapPosstMassage"+err);
    }
  }
  const clickNextProgress = (nextProgressStory: string | undefined) => {
    if(nextProgressStory !== undefined){
      setProgress(nextProgressStory)
    } else {
      sendMapPosstMassage();
      console.log("끝");
    }
  }
  useEffect(() => {
    console.log(options);
  }, []);
  return (
    <div className="absolute bottom-0">
      <div className="w-screen h-3 bg-gray-100 border-b" />
      <div className="flex flex-col items-start justify-start w-screen gap-3 px-5 py-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptinoButtonClik(option)}
            className="self-stretch p-3.5 bg-gray-100 rounded-xl justify-between items-center inline-flex active:bg-gray-200 active:scale-95 duration-150 ease-out"
          >
            <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
              {option.optionText}
              <span className="m-1 text-gray-500 text-[15px] font-semibold"></span>
            </p>

            <div className="relative w-5 h-5 origin-top-left rotate-180">
              <svg
                className="absolute top-0 left-0 w-5 h-5 origin-top-left rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <mask
                  id="mask0_1118_8405"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                >
                  <rect
                    width="20"
                    height="20"
                    transform="matrix(-1 0 0 1 20 0)"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_1118_8405)">
                  <path
                    d="M10.7533 15.9071L16.1331 10.5272C16.2111 10.4493 16.2661 10.367 16.2981 10.2805C16.3302 10.1939 16.3462 10.1005 16.3462 10C16.3462 9.89959 16.3302 9.80611 16.2981 9.71958C16.2661 9.63304 16.2111 9.55078 16.1331 9.47279L10.7453 4.08498C10.6299 3.96959 10.4883 3.90976 10.3206 3.90548C10.1528 3.90121 10.0043 3.96371 9.87507 4.09298C9.7458 4.2137 9.67903 4.35793 9.67475 4.52567C9.67049 4.69339 9.73299 4.84189 9.86225 4.97117L14.2661 9.37504H4.59303C4.41568 9.37504 4.26718 9.43487 4.14753 9.55452C4.02787 9.67417 3.96805 9.82267 3.96805 10C3.96805 10.1774 4.02787 10.3259 4.14753 10.4455C4.26718 10.5652 4.41568 10.625 4.59303 10.625H14.2661L9.85423 15.0369C9.73886 15.1523 9.67903 15.296 9.67475 15.468C9.67049 15.64 9.73299 15.7863 9.86225 15.9071C9.98298 16.0363 10.1293 16.101 10.3013 16.101C10.4734 16.101 10.624 16.0363 10.7533 15.9071Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
            </div>
          </button>
        ))}

        <button className="self-stretch p-3.5 bg-stone-300  rounded-xl justify-between items-center inline-flex">
          <p className="justify-start items-center text-zinc-700 text-[15px] font-semibold">
            <span className="m-1 text-gray-500 text-[15px] font-semibold"></span>
          </p>
        </button>
      </div>
    </div>
  );
};
