import React, {useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import ReactPlayer from 'react-player';
import { shortsActions } from '../redux/modules/shorts';
import ShortsBody from '../components/ShortsBody';

const Shorts = (props) => {
    
    const dispatch = useDispatch();

    const [playIndex, setPlayIndex] = useState(0);
    React.useEffect(() => {
        dispatch(shortsActions.getShort());
    }, []);
    
    React.useEffect(() => {
        if(playIndex===1) {
            dispatch(shortsActions.addShort());
        }
    }, [playIndex]);


    const shortsList = useSelector((state)=>state.shorts.shortsList);
    console.log(shortsList);

    

    if(!shortsList) {
        return <div>ㄱㄷㄱㄷ</div>;
    }
    
    // playIndex가 1이되면 setPlayIndex를 실행하고 그다음에
    // playIndex를 다시 0으로 바꿔준다
    const handleNextVideo = () => {
        setPlayIndex(playIndex + 1);
    }
    

  return (
    <div>
        <div>ㅎㅇㅎㅇ?</div>
        
        <ReactPlayer 
            url={shortsList[playIndex].videoUrl}
            controls
            oenEnded={() => {handleNextVideo()}}
            width={'800px'}
            height={'500px'}/>
        <div>
            <div>{shortsList[playIndex].title}</div>
            <div>{shortsList[playIndex].nickname}</div>
        </div>
    </div>
  );
};

export default Shorts;
