import testdata from './testData.json'

export interface StoryInterface {
    title: string;
    startID: string;
    progressStory: Record<string, {
      text: string;
      options: {
        optionID: string;
        optionText: string;
      }[];
    }>;
}

const Storys: StoryInterface[] = [testdata]

export default Storys;