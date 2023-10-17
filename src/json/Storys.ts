import testdata from './testData.json'
import testdata2 from './testData2.json'
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

const Storys: StoryInterface[] = [testdata, testdata2]

export default Storys;