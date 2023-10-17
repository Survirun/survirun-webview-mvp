import testdata from './testData.json'
import { OptionInterface } from '../pages';

export interface StoryInterface {
    title: string;
    startID: string;
    progressStory: Record<string, {
      text: string;
      options: OptionInterface[];
    }>;
}

const Storys: StoryInterface[] = [testdata]

for (const story of Storys) {
  // Iterate through each progressStory within the story
  for (const progressKey in story.progressStory) {
    if (story.progressStory.hasOwnProperty(progressKey)) {
      const progressItem = story.progressStory[progressKey];
      for (const option of progressItem.options) {
        if (!option.nextProgressStory) {
          option.nextProgressStory = undefined;
        }
      }
    }
  }
}

export default Storys;