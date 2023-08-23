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
    condition?: Condition,
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
    condition?: Condition,
    storyText: string,
    option: Option[],
    alternativeStoryText: string,
    alternativeOption: Option[],
}

interface SubCharaterProps{
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

const subCharater: SubCharaterProps = {
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
                condition: {
                    kind: "item",
                    number: 1,
                },
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
                alternativeStoryText: "대체 스토리1 테스트 테스트",
                alternativeOption: [
                    {
                        optionID: "opt_1-3",
                        text: "대체 옵션1 테스트 테스트",
                        addition: {

                        }
                    },
                    {
                        optionID: "opt_1-4",
                        text: "대체 옵션1 테스트 테스트",
                        addition: {

                        }
                    }
                ],
            },
            {
                condition: {
                    kind: "item",
                    number: 2,
                },
                storyText: "스토리2 테스트 테스트",
                option: [
                    {
                        optionID: "opt_2-1",
                        text: "옵션2 테스트 테스트",
                        addition: {

                        }
                    }
                ],
                alternativeStoryText: "대체 스토리1 테스트 테스트",
                alternativeOption: [
                    {
                        optionID: "opt_2-1",
                        text: "대체 옵션2 테스트 테스트",
                        addition: {

                        }
                    }
                ],
            }
        ]
    }
}