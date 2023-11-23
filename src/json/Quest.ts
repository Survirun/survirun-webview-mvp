export const QuestName = ["처치", "거리"]

class Quest {
    static 처치 = (n: number) => {
        return {
            name: QuestName[0],
            number: n,
            explanation: `좀비 ${n}마리 처치`
        }
    }
    static 거리 = (n: number) => {
        return {
            name: QuestName[1],
            number: n,
            explanation: `${n}km 달리기`
        }
    }
}

export default Quest;