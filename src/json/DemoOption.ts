export interface Option {
  optionID?: string,
  text: string,
  condition?: {
    kind: 'hp' | 'money' | 'item' | 'charateristic' ,
    number: number
  }[] | null,
  result: OptionResult[];
};

export interface OptionResult {
  nextProgress?: string,
  openStroy?: string,
  zombie?: number
  resultItem?: {
    kind: 'hp' | 'money' | 'item' | 'charateristic',
    getOrLose: 'get' | 'lose',
    number: number
  }[],
  random?: number | 'default';
}

function optionID(storyNum: number, progressNum: number) {
  return "opt"+storyNum+"-"+progressNum;
}

function nextProgress(storyNum: number, progressNum: number):string {
  return "progress"+storyNum.toString()+"-"+progressNum.toString();
}

const storyID = (storyNum: number) => {
  return "story-"+storyNum.toString();
}

const options: Option[][][] = [
  [
    [
      {optionID: "next", text: "모험을 계속한다", result: [{}]}
    ],
  ],
  [
    [ 
          {text: "어디에서 잃어버리셨는데요?", result: 
            [{nextProgress: nextProgress(1, 3)}]},
          {text: "바쁜일이 있어서요", result: 
            [
              {
                random: 30,
                resultItem: [{
                  kind: "hp",
                  getOrLose: "lose",
                  number: 1
                }],
                nextProgress: nextProgress(1, 3),
              },
              {
                random: 10,
                resultItem: [{
                  kind: "hp",
                  getOrLose: "get",
                  number: 1
                }],
                nextProgress: nextProgress(1, 4)
              },
              {
                random: "default",
                nextProgress: nextProgress(1, 2)
              },
            ]},
          {text: "네...? 네...", result: 
            [{nextProgress: nextProgress(1, 4)}]},
          {text: "아... 네...", result: 
            [{resultItem: [{kind:"item", getOrLose: "get", number: 2}],
            nextProgress: nextProgress(1, 5)}]},
          {text: "아니 이 망할 할아범이. 내가 얼마나 고생했는데. 가진거 다 내놔!", 
            condition: [
              {kind: "charateristic", number: 1}
            ],
            result: 
            [{resultItem: [
                {kind:"item", getOrLose: "get", number: 2},
                {kind:"money", getOrLose: "lose", number: 10},
            ],
            nextProgress: nextProgress(1, 5),
            openStroy: storyID(2),
            }],
          },
    ],
    [
              {text: "먹이를 준다", 
              condition: [
                {kind: "item", number: 1}
              ],  
              result:
                [{ 
                  resultItem: [
                    {kind: "item", getOrLose: "lose", number: 1},
                  ],
                  nextProgress: nextProgress(2, 2)
                }]},
              {text: "맞서 싸운다", result:
                [{ 
                  resultItem: [
                    {kind: "hp", getOrLose: "lose", number: 1},
                    {kind: "item", getOrLose: "get", number: 6}
                  ],
                  nextProgress: nextProgress(2, 3)
                }]},
              {text: "무시하고 지나간다", result:
                [{ 
                  resultItem: [
                    {kind: "hp", getOrLose: "lose", number: 1}
                  ],
                  nextProgress: nextProgress(2, 4)
                }]},
              {text: "알루미늄 배트로 때린다.", 
                condition: [
                  {kind: "item", number: 3}
                ],
                result:
                  [{ 
                    resultItem: [
                    {kind: "hp", getOrLose: "lose", number: 1},
                    {kind: "item", getOrLose: "lose", number: 3}
                  ],
                  nextProgress: nextProgress(2, 5)
                }]},
    ],
    [
            {text: "도끼로 부순다", 
            condition: [
              {kind: "item", number: 2}
            ],  
            result:
              [{ 
                resultItem: [
                  {kind: "item", getOrLose: "get", number: 1},
                  {kind: "item", getOrLose: "lose", number: 2}
                ],
                nextProgress: nextProgress(3, 2)
              }]},
            {text: "주먹으로 부순다", result:
              [{ 
                resultItem: [
                  {kind: "hp", getOrLose: "lose", number: 1},
                  {kind: "item", getOrLose: "get", number: 1}
                ],
                nextProgress: nextProgress(3, 3)
              }]},
            {text: "그냥 지나간다", result:
              [{ 
                nextProgress: nextProgress(3, 4)
              }]}, 
    ],
    [
            {text: "가방을 약탈한다",
            condition: [
              {kind: "charateristic", number: 3}
            ],
            result:
              [{ 
                resultItem: [
                  {kind: "charateristic", getOrLose: "get", number: 3},
                  {kind: "item", getOrLose: "get", number: 1}
                ],
                nextProgress: nextProgress(4, 2)
              }]},
            {text: "무시하고 지나간다", result:
              [{ 
                nextProgress: nextProgress(4, 3)
              }]}, 
    ],
    [
      {text: "생존자 무리와 정보를 공유한다.",
      condition: [
        {kind: "charateristic", number: 2}
      ], 
      result: [{ 
        resultItem: [
            {kind: "item", getOrLose: "get", number: 2},
          ],
          nextProgress: nextProgress(5, 2)
        }]},
      {text: "생존무리를 공격한다",
      condition: [
        {kind: "charateristic", number: 3}
      ],
      result:
        [{ 
          resultItem: [
            {kind: "hp", getOrLose: "lose", number: 2},
            {kind: "item", getOrLose: "get", number: 4},
          ],
          nextProgress: nextProgress(5, 3)
        }]},
      {text: "삥 뜯는다", 
      condition: [
        {kind: "charateristic", number: 1}
      ],
      result: [{ 
        resultItem: [
            {kind: "item", getOrLose: "get", number: 1},
            {kind: "item", getOrLose: "get", number: 1}
          ],
          nextProgress: nextProgress(5, 4)
        }]},
      {text: "그냥 지나간다", result:
        [{ 
          nextProgress: nextProgress(5, 5)
        }]}
    ],
    [
          {text: "(들어가본다)", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 1},
                {kind: "item", getOrLose: "get", number: 1},
              ],
              nextProgress: nextProgress(6, 2)
            }]},
          {text: "(들어가지 말자)", result:
            [{ 
              nextProgress: nextProgress(6, 3)
            }]},
    ],
    [
          {text: "(쉬었다 가자)", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "get", number: 1},
                {kind: "charateristic", getOrLose: "get", number: 4},
              ],
              nextProgress: nextProgress(7, 2)
            }]},
          {text: "(뭔가 나올지도 모른다. 지나가자)", result:
            [{ 
              nextProgress: nextProgress(7, 3)
            }]},
    ],
    [
          {text: "(들어가본다)", result:
            [{ 
              resultItem: [
                {kind: "item", getOrLose: "get", number: 8},
              ],
              nextProgress: nextProgress(8, 2)
            }]},
          {text: "(너무 위험하다. 지나가자)", result:
            [{ 
              nextProgress: nextProgress(8, 3)
            }]},
    ],
    [
          {text: "(잠시 쉬었다 가자)", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "get", number: 1},
              ],
              nextProgress: nextProgress(9, 2)
            }]},
          {text: "(주변에 사람이 있지 않을까? 찾아보자)", result:
            [{ 
              resultItem: [
                {kind: "item", getOrLose: "get", number: 9},
              ],
              nextProgress: nextProgress(9, 3)
            }]},
          {text: "(그냥 지나가자)", result:
            [{ 
              nextProgress: nextProgress(9, 4)
            }]},
    ],
    [
          { text: "(들어가보자)", result:
            [{ 
              nextProgress: nextProgress(10, 2)
            }]},
          { text: "(그냥 지나가자)", result:
            [{ 
              nextProgress: nextProgress(10, 3)
            }]},
          { text: "(도망가자!)", result:
            [{ 
              nextProgress: nextProgress(10, 4)
            }]},
          { text: "(도끼로 좀비의 머리를 내려 찍는다)",
          condition: [
            {kind: "item", number: 2}
          ],
          result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 1}
              ],
              nextProgress: nextProgress(10, 4)
            }]},
    ],
    [
          { text: "(귀을 기울린다)", result:
            [{ 
              resultItem: [
                {kind: "charateristic", getOrLose: "get", number: 5}
              ],
              nextProgress: nextProgress(11, 2)
            }]},
          { text: "(그냥 지나가자)", result:
            [{ 
              nextProgress: nextProgress(11, 3)
            }]},
    ],
    [
          { text: "통조림이나 먹자",
          condition: [
            {kind: "item", number: 1}
          ],
          result:
            [{ 
              resultItem: [
                {kind: "item", getOrLose: "lose", number: 1}
              ],
              nextProgress: nextProgress(12, 2)
            }]},
          { text: "물이나 한잔 하자",
          condition: [
            {kind: "item", number: 7}
          ],
          result:
            [{ 
              resultItem: [
                {kind: "item", getOrLose: "lose", number: 7}
              ],
              nextProgress: nextProgress(12, 3)
            }]},
          { text: "그냥 자자", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 1}
              ],
              nextProgress: nextProgress(12, 4)
            }]},
          { text: "(명상을 한다)",
          condition: [
            {kind: "charateristic", number: 4}
          ],
          result: [{ 
              nextProgress: nextProgress(12, 5)
            }]},
    ],
    [
          { text: "(목소리 방향으로 따라간다)", result:
            [{ 
              nextProgress: nextProgress(13, 2)
            }]},
          { text: "무시한다", result:
            [{ 
              nextProgress: nextProgress(13, 3)
            }]},
          { text: "(사람들의 소지품을 훔쳐보자)",
          condition: [
            {kind: "charateristic", number: 3}
          ],
          result: [{ 
              nextProgress: nextProgress(13, 4)
            }]},
          { text: "(도와준다)", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 1},
                {kind: "item", getOrLose: "get", number: 6},
                {kind: "item", getOrLose: "get", number: 7},
                {kind: "item", getOrLose: "get", number: 1}
              ],
              nextProgress: nextProgress(13, 5)
            }]},
          { text: "(조용히 지나간다)", result:
            [{ 
              nextProgress: nextProgress(13, 6)
            }]},
    ],
    [
          { text: "이게 지금 뭐하는 겁니까?", result:
            [{ 
              resultItem: [
                {kind: "item", getOrLose: "get", number: 1},
                {kind: "item", getOrLose: "get", number: 7},
              ],
              nextProgress: nextProgress(14, 2)
            }]},
          { text: "어우.. 그냥 무시하자", result:
            [{ 
              
            }]},
    ],
    [
        { text: "좀비를 통제할 수 있는 수단이 있는 걸지도 모른다. 따라가보자.?", result:
          [{ 
            nextProgress: nextProgress(15, 2)
          }]},
        { text: "괜히 위험한 상황을 자초할 필요는 없을 것 같다. 따라가지 말자.", result:
          [{ 
            nextProgress: nextProgress(15, 3)
          }]},
          
    ],
    [
      {text: "아이의 엄마를 찾아준다", result:
        [{ 
          resultItem: [
            {kind: "item", getOrLose: "get", number: 1}
          ],
          nextProgress: nextProgress(16, 2)
        }]},
      {text: "무시하고 지나간다", result:
        [{ 
          nextProgress: nextProgress(16, 3)
        }]}
    ],
    [
          {text: "갱단과 친구가 된다",
          condition: [
            {kind: "charateristic", number: 3}
          ],
          result: [{ 
            resultItem: [
                {kind: "item", getOrLose: "get", number: 3}
              ],
              nextProgress: nextProgress(17, 2)
            }]},
          {text: "보석으로 합의를 본다",
          condition: [
            {kind: "item", number: 5}
          ],
           result: [{ 
              resultItem: [
                {kind: "item", getOrLose: "lose", number: 5}
              ],
              nextProgress: nextProgress(17, 3)
            }]},
          {text: "맞서 싸운다", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 2},
                {kind: "charateristic", getOrLose: "get", number: 1}
              ],
              nextProgress: nextProgress(17, 4)
            }]},
          {text: "도망친다", result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 1},
              ],
              nextProgress: nextProgress(17, 5)
            }]}
    ],
    [
          {text: "도와준다.",
          condition: [
            {kind: "item", number: 4}
          ], result: [{ 
              resultItem: [
                {kind: "item", getOrLose: "lose", number: 4},
                {kind: "item", getOrLose: "get", number: 5},
                {kind: "item", getOrLose: "get", number: 1},
                {kind: "item", getOrLose: "get", number: 1},
                {kind: "item", getOrLose: "get", number: 1},
              ],
              nextProgress: nextProgress(18, 2)
            }]},
          {text: "약탈한다.",
          condition: [
            {kind: "charateristic", number: 3}
          ], result:
            [{ 
              resultItem: [
                {kind: "hp", getOrLose: "lose", number: 2},
                {kind: "item", getOrLose: "get", number: 5},
              ],
              nextProgress: nextProgress(18, 3)
            }]},
          {text: "무시하고 지나간다", result:
            [{ 
              nextProgress: nextProgress(18, 4)
            }]}
    ],
    [
          {text: "보석을 바꾼다.", 
          condition: [
            {kind: "item", number: 5}
          ],
          result: [{ 
              resultItem: [
                {kind: "item", getOrLose: "lose", number: 5},
                {kind: "item", getOrLose: "get", number: 2},
                {kind: "item", getOrLose: "get", number: 3},
                {kind: "item", getOrLose: "get", number: 1},
              ],
              nextProgress: nextProgress(19, 2)
            }]},
          {text: "가죽을 바꾼다.",
          condition: [
            {kind: "item", number: 6}
          ], result: [{ 
             resultItem: [
                {kind: "item", getOrLose: "lose", number: 6},
                {kind: "item", getOrLose: "get", number: 1},
                {kind: "item", getOrLose: "get", number: 1},
              ],
              nextProgress: nextProgress(19, 3)
            }]},
          {text: "번개라고 한다", result:
            [{ 
              nextProgress: nextProgress(19, 4)
            }]}
    ],
    [
      {text: "궁금한건 못 참지", result:
        [{ 
          nextProgress: nextProgress(20, 2)
        }]},
      {text: "딱 봐도 수상해 보인다. 무시하자", result:
        [{ 
          nextProgress: nextProgress(20, 3)
        }]},
      {text: "좀비로 부터 도방치자!", result:
        [{ 
          zombie: 4,
        }]}
    ],
    [
      {text: "식략이 있을지도 모른다. 들어가보자.", result:
        [{ 
          nextProgress: nextProgress(21, 2)
        }]},
      {text: "들짐승이나 좀비가 있을지도 모른다. 그냥 지나가자.", result:
        [{ 
          nextProgress: nextProgress(21, 3)
        }]},
      {text: "이건 정말 참을 수 없다!", result:
        [{ 
          nextProgress: nextProgress(21, 4)
        }]},
      {text: "너무 위험하다. 빨리 빠져 나오자!", result:
        [{ 
          nextProgress: nextProgress(21, 5)
        }]},
      {text: "빨리 도방치자!", result:
        [{ 
          zombie: 3,
        }]}
    ],
    [
      {text: "좀비를 자극하지 않고 천천히 뒷걸음 치며 자리를 뜬다.", result:
        [{ 
          nextProgress: nextProgress(22, 2)
        }]},
      {text: "으악! 좀비다! 도망치자!!", result:
        [{ 
          nextProgress: nextProgress(22, 3)
        }]},
      {text: "빨리 도망쳐서 좀비를 따돌리자!", result:
        [{ 
          zombie: 1,
        }]},
    ],
    [
      {text: "쓸만한 도구나 음식이 있을지도 모른다. 들어가보자.", result:
        [{ 
          nextProgress: nextProgress(23, 2)
        }]},
      {text: "좀비가 있기에 최적의 환경이다. 들어가지 말자.", result:
        [{ 
          nextProgress: nextProgress(23, 3)
        }]},
      {text: "조금만 더 들어가보자...", result:
        [{ 
          nextProgress: nextProgress(23, 4)
        }]},
      {text: "뭔가 느낌이 안 좋다. 빨리 나가자", result:
        [{ 
          nextProgress: nextProgress(23, 4)
        }]},
      {text: "죽을 힘을 다해 도망치자!!", result:
        [{ 
          zombie: 5,
        }]},
    ],
    [
      {text: "천천히 가까이 가보자", result:
        [{ 
          nextProgress: nextProgress(24, 2)
        }]},
      {text: "괜히 끌데없는 짓 하지 말자", result:
        [{ 
          nextProgress: nextProgress(24, 3)
        }]},
      {text: "빨리 도망치자!", result:
        [{ 
          zombie: 4,
        }]},
    ],
  ],
  [
    
  ],
];

    function updateAdditionProperties(options: Option[][][]): Option[][][] {
      options.forEach((_, i) => {
        options[i].forEach((optionGroup: Option[], j) => {
          optionGroup.forEach((option: Option, k) => {
            if(j !== 0 && !option.optionID) {
              option.optionID = optionID(j ,k+1)
            }
          });
        });
      })
      
        return options;
      }

    const updatedOptions: Option[][][] = updateAdditionProperties(options);
    export  const jsonOption = updatedOptions;
