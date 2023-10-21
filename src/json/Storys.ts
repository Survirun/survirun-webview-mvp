import { OptionInterface } from '../pages';
import testStory from './Story/json.json';

export interface StoryInterface {
    title: string;
    startID: string;
    progressStory: Record<string, {
      text: string;
      options: OptionInterface[];
    }>;
}

function transformJsonData(data: any): StoryInterface {
  const transformedData: StoryInterface = {
    title: data.title,
    startID: data.startID,
    progressStory: {}
  };

  for (const key in data.progressStory) {
    if (data.progressStory.hasOwnProperty(key)) {
      const storyData = data.progressStory[key];
      const transformedStory = {
        ...storyData,
        options: storyData.options.map((option: OptionInterface) => {
          return {
            ...option,
            resultItem: option.resultItem?.map(result => {
              return {
                kind: result.kind as "item" | "hp" | "hunger",
                getOrLose: result.getOrLose as "get" | "lose",
                number: result.number as number | string
              };
            })
          };
        })
      };
      transformedData.progressStory[key] = transformedStory;
    }
  }

  return transformedData;
}

const Storys = [testStory];
const newArray: StoryInterface[] = [];

Storys.forEach(story => {
  const transformedStory = transformJsonData(story);
  newArray.push(transformedStory);
});

for (const story of newArray) {
  for (const progressKey in story.progressStory) {
    if (story.progressStory.hasOwnProperty(progressKey)) {
      const progressItem = story.progressStory[progressKey];
      for (const option of progressItem.options) {
          option.nextProgressStory ??= undefined;
      }
    }
  }
  console.log(newArray)
}

export default newArray;