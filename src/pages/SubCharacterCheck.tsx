import { useEffect, useState } from 'react'
import styled from "@emotion/styled";

import { jsonSubCharacter } from '../json/DemoSubCharacter';

export const SubCharacterCheck = () => {
    const [userSubCharacter, setSubCharacter] = useState<string[]>([]);

    const GetUserData = () => {
        try {
            const userDataSub = JSON.parse(localStorage.getItem('userData') || '[]').subCharater
            
            console.log(userDataSub)
            for (const characterName in userDataSub) {
                const characterData = userDataSub[characterName];
                if (characterData.open) {
                    setSubCharacter(pre => [...pre, characterName])
                }
            }

        } catch(e) {
            console.error("Error: GetUserData()");
            console.error(e)
        }
    }
    useEffect(() => {
        GetUserData()
    }, [])
    return(
        <Frame>
            <Container>
                {userSubCharacter.map((character, index) => (
                    <CharacterBox key={index}>
                        <Img/>
                        <Text>
                            <Info>
                                <p>{jsonSubCharacter[character].name} /</p>
                                <p>{jsonSubCharacter[character].charateristic.age}살 /</p>
                                <p>{jsonSubCharacter[character].charateristic.sex} /</p>
                                <p>{jsonSubCharacter[character].property} /</p>
                            </Info>
                            <Description>
                                <p>{jsonSubCharacter[character].charateristic.backgroundSetting}</p>
                            </Description>
                        </Text>    
                    </CharacterBox>
                ))}
            </Container>
        </Frame>
    );
}

const Frame = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
`
const CharacterBox = styled.div`
    display: flex;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    margin: 10px;
`
const Img = styled.div`
    width: 100px;
    height: 100px;
    margin-right: 20px;
    background-color: #4e4e4e;
`
const Text = styled.div`
    display: flex;
    flex-direction: column;
`
const Info = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    &>p{
        margin: 5px 0;
    }
`
const Description = styled.div`
    width: 230px;
    &>p{
        word-wrap: break-word;
        margin: 0;
        line-height: 1.5;
    }
`