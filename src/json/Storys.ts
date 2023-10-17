import testdata from './testData.json'

export interface OptionsInterface {
  optionID: string;
  optionText: string;
}
export interface StoryInterface {
    title: string;
    startID: string;
    progressStory: Record<string, {
      text: string;
      options: OptionsInterface[];
    }>;
}

const Storys: StoryInterface[] = [testdata]

export default Storys;