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
    condition?: Condition | null,
    nextProgress?: string | null,
    openStroy?: string | null,
    zombie?: number
}

interface Option {
    optionID: string,
    text: string,
    addition: OptionAddition
}

interface SubCharaterStoryProps{
    storyTitle: string,
    storyText: string,
    option: Option[],
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
                storyText: "스토리1 테스트 테스트",
                option: [
                    {
                        optionID: "opt_1-1",
                        text: "옵션1 테스트 테스트",
                        addition: {

                        }
                    },
                    {
                        optionID: "opt_1-2",
                        text: "옵션1 테스트 테스트",
                        addition: {

                        }
                    }
                ],
            },
            {
                storyTitle: "테스트2",
                storyText: "스토리2 테스트 테스트",
                option: [
                    {
                        optionID: "opt_2-1",
                        text: "옵션2 테스트 테스트",
                        addition: {

                        }
                    }
                ],
            }
        ]
    },
    "테스트 캐릭터2": {
        name: "테스트 캐릭터2",
        subCharId: 1,
        img: "/subCarater2",
        property: "압도",
        charateristic: {
            age: 10,
            sex: "male",
            backgroundSetting: "어쩌구 저쩌구 설명 설명2"
        },
        story: [
            {
                storyTitle: "2테스트 1",
                storyText: "스토리1 테스트 테스트2",
                option: [
                    {
                        optionID: "opt_1-1",
                        text: "옵션1 테스트 테스트2",
                        addition: {

                        }
                    },
                    {
                        optionID: "opt_1-2",
                        text: "옵션1 테스트 테스트2",
                        addition: {

                        }
                    }
                ],
            },
            {
                storyTitle: "2test 2",
                storyText: "스토리2 테스트 테스트2",
                option: [
                    {
                        optionID: "opt_2-1",
                        text: "옵션2 테스트 테스트2",
                        addition: {

                        }
                    }
                ],
            }
        ]
    }
}

function updateAdditionProperties(subCharacter: SubCharacterProps): SubCharacterProps {
    for (const charKey in subCharacter) {
        const character = subCharacter[charKey];
    
        for (const story of character.story) {
            for (const option of story.option) {
                option.addition ??= {};
                option.addition.result ??= null;
                option.addition.condition ??= null;
                option.addition.nextProgress ??= null;
                option.addition.openStroy ??= null;
            }
        }
    }
    return subCharacter;
}

const updateSubCharacter = updateAdditionProperties(subCharacter);
export const jsonSubCharacter = updateSubCharacter;