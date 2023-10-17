import {useEffect, useState} from 'react'
import { StoryBottom } from "."
import { StoryInterface } from '../../json/Storys'

export const StoryMiddle = ({ progressStory }: { progressStory: StoryInterface['progressStory'][string] }) => {
  const [stroyText, setStroyText] = useState(progressStory.text)
  useEffect(()=>{
    console.log(progressStory)
  },[])
    return(
         <div className="h-[260px] w-full flex-col justify-start items-start flex">
          <h3 className="px-5 pt-6 pb-3 inline-flex text-zinc-900 text-[17px] font-semibold">
            
          </h3>
          <div className="w-full px-5 pb-3 overflow-y-scroll">
            {stroyText}
            <div className="pb-1 text-base font-medium text-zinc-900">
            </div>
          </div>
          <StoryBottom options={progressStory.options}/>
        </div>
    )
}