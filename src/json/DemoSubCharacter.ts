interface Condition {
    kind: 'hp' | 'money' | 'item' | 'charateristic',
    number: number
}

interface OptionAddition {
    result?: {
        kind: 'hp' | 'money' | 'item' | 'charateristic',
        getOrLose: 'get' | 'lose',
        number: number
    }[] | null,
    condition?: Condition[] | null,
    nextProgress?: string | null,
    openStroy?: string | null,
    zombie?: number,
    toUpSubProgess?: true | null,
    togetherSubCharacter?: true | null,
}

export interface Option {
    optionID: string,
    text: string,
    addition: OptionAddition
}

interface SubCharaterStoryProgressProps{
    storyText: string,
    option: Option[],
}

interface SubCharaterStoryProps{
    storyTitle: string,
    storys: SubCharaterStoryProgressProps[]
}

interface SubCharacterProps{
    [key: string]: {
        name: string,
        subCharId: number,
        img: string,
        property: string,
        charateristic: {
            age: number,
            sex: "male" | "female",
            backgroundSetting: string
        },
        story: SubCharaterStoryProps[]
    }   
}

function nextProgress(storyNum: number, progressNum: number){
    return "progress"+storyNum.toString()+"-"+progressNum.toString();
}

const subCharacter: SubCharacterProps = {
    "테스트 캐릭터1": {
        name: "테스트 캐릭터1",
        subCharId: 1,
        img: "/subCarater1",
        property: "압도",
        charateristic: {
            age: 10,
            sex: "male",
            backgroundSetting: "어쩌구 저쩌구 설명 설명"
        },
        story: [
            {
                storyTitle: "테스트1",
                storys: [
                    {
                        
                        storyText: "스토리1 테스트 테스트",
                        option: [
                            {
                                optionID: "opt_1-1",
                                text: "옵션1 테스트 테스트",
                                addition: {
                                    nextProgress: nextProgress(1, 2),
                                    result: [
                                        {kind:"item", getOrLose: "get", number: 2},
                                    ],
                                    condition: [
                                        {kind: "charateristic", number: 1}
                                    ],
                                }
                            },
                            {
                                optionID: "opt_1-2",
                                text: "다음으로",
                                addition: {
                                    
                                }
                            }
                        ],
                    },
                    {
                        storyText: "스토리2 테스트 테스트",
                        option: [
                            {
                                optionID: "opt_2-1",
                                text: "다음으로",
                                addition: {
                                    toUpSubProgess: true
                                }
                            }
                        ],
                    }
                ],
            },
            {
                storyTitle: "테스트 2",
                storys: [
                    {
                        storyText: "스토리1 테스트 테스트",
                        option: [
                            {
                                optionID: "opt_1-1",
                                text: "옵션1 테스트 테스트",
                                addition: {
                                    nextProgress: nextProgress(1, 2)
                                }
                            },
                            {
                                optionID: "opt_1-2",
                                text: "옵션2 테스트 테스트",
                                addition: {
                                    
                                }
                            }
                        ],
                    },
                    {
                        storyText: "스토리2 테스트 테스트",
                        option: [
                            {
                                optionID: "opt_2-1",
                                text: "옵션2 테스트 테스트",
                                addition: {
                                    togetherSubCharacter: true
                                }
                            }
                        ],
                    }
                ]
            }
        ]
    }
}

function updateAdditionProperties(subCharacter: SubCharacterProps): SubCharacterProps {
    for (const charKey in subCharacter) {
        const character = subCharacter[charKey];
    
        for (const story of character.story) {
            for (const chater of story.storys) {
                for (const option of chater.option) {
                    option.addition ??= {};
                    option.addition.result ??= null;
                    option.addition.condition ??= null;
                    option.addition.nextProgress ??= null;
                    option.addition.openStroy ??= null;
                    option.addition.toUpSubProgess ??= null;
                    option.addition.togetherSubCharacter ??= null;
                }
            }
        }
    }
    return subCharacter;
}

const updateSubCharacter = updateAdditionProperties(subCharacter);
export const jsonSubCharacter = updateSubCharacter;