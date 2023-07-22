export interface ProgressStory {
  progressID?: string;
  storyText: string;
  optionNumber: string[];
}

export interface StoryData {
  storyID?: string;
  storyTitle: string;
  addition?: OptionAddition;
  progressStory: ProgressStory[];
}

export interface OptionAddition {
  open?: boolean | null;
  once?: boolean | null;
}

function optionID(storyNum: number, progressNum: number) {
  return "opt"+storyNum+"-"+progressNum;
}

const storyID = (storyNum: number) => {
  return "story-"+storyNum.toString();
}

const progressID = (storyNum: number, progressNum: number) => {
  return "progress"+storyNum.toString()+"-"+progressNum.toString();
}

const storys: StoryData[] = [
  {
    storyID: storyID(1),
    storyTitle: "도끼를 찾아달라는 노인",
    progressStory: [
      {
        progressID: progressID(1, 1),
        storyText: "길을 가다가 누군가 당신에게 말을 겁니다. '거기 젊은이 잠시만기다려보게나!'. 깜짝 놀라 뒤를 돌아보니 한 노인이 있습니다. 그 노인은 당신에게 간절한 눈빛으로 바로보고 있습니다. '거기 젊은이 혹시 부탁하나만 들어줄 수 있겠나? 내가 이 근처에 아주 소중한 도끼를 잃어버렸다네. 그 도끼좀 찾아주면 안되겠나?'",
        optionNumber: [optionID(1, 1), optionID(1, 2)]
      },
      {
        progressID: progressID(1, 2),
        storyText: "당신은 할아버지를 뒤로한체 가던길을 갑니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(1, 3),
        storyText: "내 집에서 잃어버렸다네. 아무리 찾아봐도 안 보여. 같이 좀 찾아주게나.",
        optionNumber: [optionID(1, 3)]
      },
      {
        progressID: progressID(1, 4),
        storyText: "할아버지 집에 도착하자 당신은 깜짝 놀랍니다. 바로 할아버지의 집이 궁전으로 되어있었거든요. '어이 젊은이 빨리 안 찾고 뭐해'. 한참을 도끼를 찾아지만 도끼는 나오지가 않았습니다. '아니 할아버지 도끼가 안보여요.' '잔소리 말고 찾게나.' 그때 당신은 할아버지 옆 소매에 도끼가 있는 것을 발견했습니다. '어! 할아버지! 옆구리에 그거 도끼 아닌가요?' '어라 유레카! 드디어 찾아구만 고맙구만 젊으니. 근데 이제 필요 없어졌어. 전기톱을 찾았거든. 이 도끼는 너 가져'",
        optionNumber: [optionID(1, 4), optionID(1, 5)]
      },
      {
        progressID: progressID(1, 5),
        storyText: "당신은 손에 도끼를 든체로 계속 모험을 떠납니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(1, 6),
        storyText: "당신은 할아버지에게 덤벼보지만 UDT출신 할아버지를 이이기엔 역 부족이였습니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyID: storyID(2),
    storyTitle: "들개 출물",
    addition: {
      open: false,
      once: true,
    },
    progressStory: [
      {
        progressID: progressID(2, 1),
        storyText: "마트로 가는 길 굶주린 들개들과 눈을 마주쳤습니다.",
        optionNumber: [optionID(2, 1), optionID(2, 2), optionID(2, 3), optionID(2, 4)]
      },
      {
        progressID: progressID(2, 2),
        storyText: "들개들이 통조림을 먹는 사이에 당신은 빠져나갑니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(2, 3),
        storyText: "들개 3마리를 죽이자 나머지 들개들이 도망을 갑니다. 하지만 손에 피가 흐르고 있습니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(2, 4),
        storyText: "알루미늄 방망이로 들개들을 때리고 있을 때 들개 중 한마리가 당신의 손을 물고 방망이를 들고 도망치기 시작합니다. 들개를 쫒아가기엔 무리가 있어 보입니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(2, 5),
        storyText: "애써 무시하체 들개 무리를 피할려고 했지만 당신이 생각했던 것 보다 개의 후각이 좋답니다. 결국 간신히 빠져나왔지만 상처만 입겨 되었습니다.",
        optionNumber: ["next"]
      },
    ]
  },
  {
    storyTitle: "바리게이트 쳐진 편의점",
    progressStory: [
      {
        progressID: progressID(3, 1),
        storyText: "어느 저녁 바리게이트 쳐진 편의점을 발견했습니다.",
        optionNumber: [optionID(3, 1), optionID(3, 2), optionID(3, 3)]
      },
      {
        progressID: progressID(3, 2),
        storyText: "도끼를 이용해 바리게이트를 부셨습니다. 도끼는 부서졌지만 편의점안에 있는 아이템을 얻었습니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(3, 3),
        storyText: "주먹으로 바리게이트를 쳐 바이게이트를 부셨습니다. 편의점 안에 있는 아이템을 얻었지만 손이 얼얼합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(3, 4),
        storyText: "당신은 편의점을 무시한체 길을 떠납니다.",
        optionNumber: ["next"]
      },
    ]
  },
  {
    storyTitle: "구걸하는 부랑자",
    progressStory: [
      {
        progressID: progressID(4, 1),
        storyText: "'통조림 하나만요...' 한 떠돌이가 당신에게 구걸을 합니다.",
        optionNumber: [optionID(4, 1), optionID(4, 2)]
      },
      {
        progressID: progressID(4, 2),
        storyText: "당신은 가방을 약탈해서 가방안의 아이템을 획득합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(4, 3),
        storyText: "당신은 길을 알려줍니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "울고 있는 아이",
    progressStory: [
      {
        progressID: progressID(5, 1),
        storyText: "'응애~!' 아기가 당신에게 구걸을 합니다.",
        optionNumber: [optionID(5, 1), optionID(5, 2)]
      },
      {
        progressID: progressID(5, 2),
        storyText: "아이의 엄마가 고맘다고 감사의 선물을 줍니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(5, 3),
        storyText: "당신은 가던길을 갑니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "갱단의 위협",
    progressStory: [
      {
        progressID: progressID(6, 1),
        storyText: "'돈내놔!' 갱단이 당신에게 구걸을 합니다.",
        optionNumber: [optionID(6, 1), optionID(6, 2), optionID(6, 3), optionID(6, 4)]
      },
      {
        progressID: progressID(6, 2),
        storyText: "갱단과 깐부가 됩니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(6, 3),
        storyText: "갱단에게 보석을 바칩니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(6, 4),
        storyText: "갱단과 싸워서 이깁니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(6, 5),
        storyText: "도망치다 다쳤습니다.",
        optionNumber: ["next"]
      },
    ]
  },
  {
    storyTitle: "좀비와 여성",
    progressStory: [
      {
        progressID: progressID(7, 1),
        storyText: "좀비를 해치우면서 길을 가던 도중 뒤에서 무엇인가 다가오는 소리가 들릅니다. 깜짝 놀란 당신은 뒤로 돌아보자 한 유모차 안에는 좀비가 된 아이가 있고 유모차를 있끄는 한 여성이 보입니다. '저기요! 제발 한번만 도와주세요!' 여성이 무릎을 꿇고 빌고 있습니다.",
        optionNumber: [optionID(7, 1), optionID(7, 2), optionID(7, 3)]
      },
      {
        progressID: progressID(7, 2),
        storyText: "당신은 여성에게 백신을 줍니다. 여성이 가지고 있던 모든 물건을 줍니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(7, 3),
        storyText: "당신은 정말 나쁩니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(7, 4),
        storyText: "무시하고 가던 길이나 갑니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "물물교환",
    progressStory: [
      {
        progressID: progressID(8, 1),
        storyText: "당근이세요...?",
        optionNumber: [optionID(8, 1), optionID(8, 2), optionID(8, 3)]
      },
      {
        progressID: progressID(8, 2),
        storyText: "당신은 보석을 주고 물건을 얻어옵니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(8, 3),
        storyText: "당신은 가죽을 주고 물건을 얻어옵니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(8, 4),
        storyText: "상대는 당신에게 사과하고 떠납니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "약국과 갱단",
    progressStory: [
      {
        progressID: progressID(9, 1),
        storyText: "한 생존자 무리가 약국 앞을 지키고 있습니다.",
        optionNumber: [optionID(9, 1), optionID(9, 2), optionID(9, 3), optionID(9, 4)]
      },
      {
        progressID: progressID(9, 2),
        storyText: "당신은 생존자와 정보를 공유합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(9, 3),
        storyText: "당신은 생존무리를 공객해서 성공합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(9, 4),
        storyText: "삥을 뜯고 통조림을 먹습니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(9, 5),
        storyText: "그냥 지나갑니다.",
        optionNumber: ["next"]
      },
    ]
  },
  {
    storyTitle: "패허 발견",
    progressStory: [
      {
        progressID: progressID(10, 1),
        storyText: "당신은 패허를 발견했습니다.",
        optionNumber: [optionID(10, 1), optionID(10, 2)]
      },
      {
        progressID: progressID(10, 2),
        storyText: "노숙자가 튀어나와 당신의 통조림을 훔쳐 달아갑니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(10, 3),
        storyText: "세상을 위험한거 천지입니다. 에써 무시하고 발을 돌립니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "공원",
    progressStory: [
      {
        progressID: progressID(11, 1),
        storyText: "텅빈 공원을 발견합니다. 근처에 사람이 없는 것 같고 좀비도 사람도 보이지 않습니다.",
        optionNumber: [optionID(11, 1), optionID(11, 2)]
      },
      {
        progressID: progressID(11, 2),
        storyText: "한숨 자고 나니 마음이 편안해 집니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(11, 3),
        storyText: "세상을 위험한거 천지입니다. 다른곳으로 향합니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "빌라 발견",
    progressStory: [
      {
        progressID: progressID(12, 1),
        storyText: "빈 빌라를 발견합니다.",
        optionNumber: [optionID(12, 1), optionID(12, 2)]
      },
      {
        progressID: progressID(12, 2),
        storyText: "들어갔는데 녹슨 칼을 발견합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(12, 4),
        storyText: "세상을 위험한거 천지입니다. 다른곳으로 향합니다.",
        optionNumber: ["next"]
      },
    ]
  },
  {
    storyTitle: "야영지 발견",
    progressStory: [
      {
        progressID: progressID(13, 1),
        storyText: "빈 텐트가 가득있는 야영지를 발견합니다.",
        optionNumber: [optionID(13, 1), optionID(13, 2), optionID(13, 3)]
      },
      {
        progressID: progressID(13, 2),
        storyText: "잠시 쉰 당신은 컨디션이 좋아집니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(13, 3),
        storyText: "야영지 주변에는 사람 그림자도 보이지 않았가. 야영지 구석에 있는 제일 큰 텐트에서 편지를 발견합니다. 야영지의 주인이 쓴 것으로 보이는 편지는 멀리 있는 동생에게 안부를 묻는 내용을 답고 있습니다. 동생의 이름은 '은영'으로 생존자 캠프에서 지내고 있는 듯 합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(13, 4),
        storyText: "다른곳으로 발을 돌립니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "고가원 발견",
    progressStory: [
      {
        progressID: progressID(14, 1),
        storyText: "고아원을 발견한 당신은 조용히 안을 들여다보자 아이의 형태를 한 좀비들이 보입니다.",
        optionNumber: [optionID(14, 1), optionID(14, 2)]
      },
      {
        progressID: progressID(14, 2),
        storyText: "조용히 움직이며 물건들을 챙기는 와중, 토끼 인형을 손에 든 좀비와 눈을 마추칩니다.",
        optionNumber: [optionID(14, 3), optionID(14, 4)]
      },
      {
        progressID: progressID(14, 3),
        storyText: "다른곳으로 발을 돌립니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(14, 4),
        storyText: "나는 정신없이 도망쳐나왔습니다. 좀비들은 따라오지 않고 멍하니 바라보기만 합니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(14, 5),
        storyText: "도끼로 좀비를 내려찍자 주변에 가만히 있던 좀비들이 일제히 소리지르며 달려오기 시작합니다. 좀비들을 피해 고아운에 빠져나왔지만 성처를 입고 말았습니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "하수구",
    progressStory: [
      {
        progressID: progressID(15, 1),
        storyText: "하수구 안에 무슨 소리가 들릅니다.",
        optionNumber: [optionID(15, 1), optionID(15, 2)]
      },
      {
        progressID: progressID(15, 2),
        storyText: "갱단과의 거래에 대한 내용을 듣습니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(15, 3),
        storyText: "다른곳으로 발을 돌립니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "모닷불",
    progressStory: [
      {
        progressID: progressID(16, 1),
        storyText: "모닷을 앞에서 쉬고 있는 당신. 많이 외롭습니다.",
        optionNumber: [optionID(16, 1), optionID(16, 2), optionID(16, 3), optionID(16, 4)]
      },
      {
        progressID: progressID(16, 2),
        storyText: "통조림을 먹습니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(16, 3),
        storyText: "물을 마십니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(16, 4),
        storyText: "그냥 잘려고 하는데 잠을 잘 못잔 상태로 컨디션만 안좋아 집니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(16, 5),
        storyText: "명상을 통해 마음을 다시 잡습니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "도움",
    progressStory: [
      {
        progressID: progressID(17, 1),
        storyText: "어디선가 도움을 요청하는 목소리가 들립니다.",
        optionNumber: [optionID(17, 1), optionID(17, 2)]
      },
      {
        progressID: progressID(17, 2),
        storyText: "목소리 방향으로 따라간 당신은 2~3명 정도 돼 보이는 좀비 무리에게 둘러싸인 사람을 발견합니다.",
        optionNumber: [optionID(17, 3), optionID(17, 4), optionID(17, 5),]
      },
      {
        progressID: progressID(17, 3),
        storyText: "비명 소리가 들리고 이내 잠잠해 집니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(17, 4),
        storyText: "혼란을 틈타 사람들의 주머니를 털어보지만 아무것고 건지지 못했습니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(17, 5),
        storyText: "좀비를 모두 쓰러트리지만 약간의 부상을 입었습니다. 생존자들은 감사의 뜻을 전하며 가족과 물, 통조림을 조금 나눠줍니다.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(17, 6),
        storyText: "당신은  조용히 무시하고 지나갑니다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "좀권 주장 단체",
    progressStory: [
      {
        progressID: progressID(18, 1),
        storyText: "피켓을 들고 거리를 횡보하는 사람들이 보인다. 피켓에는 좀비의 좀권을 주장하는 문구가 적혀있다.",
        optionNumber: [optionID(18, 1), optionID(18, 2)]
      },
      {
        progressID: progressID(18, 2),
        storyText: "대화를 나눠보니, 이 시위, 혹은 집회 비슷한 것에 참석한 사람들의 대다수는 좀비가 된 가족을 타인에 의해 잃은 사람들이라고 한다. 그들을 죽은 좀비 가족들이 ‘살해’ 당했다고 주장했다. 내가 이야기를 잘 들어주자, 물과 통조림을 주며 홍보를 부탁했다.",
        optionNumber: ["next"]
      }
    ]
  },
  {
    storyTitle: "좀비를 이끄는 남자",
    progressStory: [
      {
        progressID: progressID(19, 1),
        storyText: "좀비 무리가 떼 지어 걸어가고 있다. 뭔가에 홀린 듯한 느낌인데 몰래 따라가볼까?.",
        optionNumber: [optionID(19, 1), optionID(19, 2)]
      },
      {
        progressID: progressID(19, 2),
        storyText: "좀비 무리를 조심히 따라가자, 장발의 남성이 눈에 들어왔다. 남성은 좀비 무리를 이끌고 다니는 것 같다. 섬뜩한 느낌이 든다. 더 이상 쫓아가진 말자.",
        optionNumber: ["next"]
      },
      {
        progressID: progressID(19, 3),
        storyText: "뒤를 돌자 가까운 위치에 있는 좀비들이 눈에 들어왔다! 깜짝 놀라 전투 태세를 취하고 있었지만 좀비들은 나에게 눈길조차 주지 않고 대규모 무리를 향해 걸어갔다. 나는 재빨리 자리를 떴다.",
        optionNumber: ["next"]
      }
    ]
  }
];

function addID(storys: StoryData[]) {
  storys.forEach((story, i) => {
    if (story.storyID) {
      story.storyID = storyID(i+1);
    }
    if(!story.addition) {
      story.addition = {
        open: true,
      };
    }
    if(story.addition.open === null) {
      story.addition.open = true;
    }
    story.progressStory.forEach((progress, j) => {
      if (!progress.progressID) {
        progress.progressID = progressID(i+1, j+1);
      }
    });
  });

  return storys
}

const updateStroy: StoryData[] = addID(storys);
export const jsonStory = updateStroy;