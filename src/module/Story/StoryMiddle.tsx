import {useState} from 'react'
import { StoryBottom } from "."

export const StoryMiddle = (progressStory) => {

    return(
         <div className="h-[260px] w-full flex-col justify-start items-start flex">
          <h3 className="px-5 pt-6 pb-3 inline-flex text-zinc-900 text-[17px] font-semibold">
            
          </h3>
          <div className="w-full px-5 pb-3 overflow-y-scroll">
            {storyNumber !== undefined &&
            progressNumber !== undefined &&
            jsonStory[storyParts][storyNumber]?.progressStory[progressNumber]
            .img !== undefined ? (
            
            ) : null}
            <div className="pb-1 text-base font-medium text-zinc-900">
              {story.map((story, index) => (
                <Fragment key={index}>{story}</Fragment>
              ))}
            </div>
          </div>
          <StoryBottom/>
        </div>
    )
}