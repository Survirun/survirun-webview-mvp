import { useEffect, useState } from "react";
import { StoryMiddle } from ".";
import { StoryInterface } from "../../json/Storys";

export const StoryTop = ({ story }: { story: StoryInterface }) => {
  const [progress, setProgress] = useState<string>(story.startID);
  const [storyTitle, setStoryTitle] = useState(story.title);
  useEffect(() => {
    console.log(story);
  });
  return (
    <>
      <div className="inline-flex flex-col items-start justify-center w-full gap-1 px-5 py-4">
        <h1 className="text-xl font-bold leading-loose text-stone-900">
          {storyTitle}
        </h1>
        <p className="text-base font-medium leading-normal text-gray-500">
          위치에 대한 설명 한줄 짜리
        </p>
      </div>
      <StoryMiddle progressStory={story.progressStory[progress]} setProgress={setProgress}/>
    </>
  );
};
