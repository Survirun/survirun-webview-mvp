import { useEffect, useState, Dispatch } from "react";
import { StoryBottom } from ".";
import { StoryInterface } from "../../json/Storys";

export const StoryMiddle = ({
  progressStory,
  setProgress
}: {
  progressStory: StoryInterface["progressStory"][string];
  setProgress: Dispatch<React.SetStateAction<string>>;
}) => {
  const [stroyText, setStroyText] = useState(progressStory.text);
  useEffect(() => {
    console.log(progressStory);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-2 px-5 py-4 overflow-y-scroll">
        <div className="inline-flex flex-col items-start justify-start w-full">
            
            <div className="pb-1 text-base font-medium text-zinc-900">{progressStory.text}</div>
        </div>
      </div>
      <StoryBottom options={progressStory.options} setProgress={setProgress}/>
    </>
  );
};
