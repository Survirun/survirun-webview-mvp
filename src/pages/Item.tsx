import {useEffect} from 'react';
import { userItem } from '../recoil/atom';
import { useRecoilState } from 'recoil';

declare var Android: any;

export const Item = () => {
    const [UserItem, SetUserItem] = useRecoilState(userItem); 

    useEffect(() => {
        const handleClick = () => {
            const item = Android.show();
            console.log(item);
            console.log(Android.show());
            SetUserItem(pre => [...pre, item])
        }
        // 이벤트 리스너 등록
          window.addEventListener('message', handleClick);
      
          // 언마운트 시 이벤트 리스너 제거
          return () => {
            window.removeEventListener('message', handleClick);
          };
    }, [])

    const click = () => {
        console.log(UserItem);
    }

    return(
        <button onClick={click}>test</button>
    )
}