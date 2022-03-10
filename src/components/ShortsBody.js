import React, {useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import ReactPlayer from 'react-player';
import { shortsActions } from '../redux/modules/shorts';

const ShortsBody = (props) => {
    
    const dispatch = useDispatch();

    const shortsList = useSelector((state)=>state.shorts.shortsList);
    console.log(shortsList);

    const [playIndex, setPlayIndex] = useState(1);

    if(!shortsList) {
        return <div>ㄱㄷㄱㄷ</div>;
    }
    
    const handleNextVideo = () => {
        setPlayIndex(playIndex + 1);
    }

  return (
    <div>
        <div>ㅎㅇㅎㅇ?</div>
        
        <ReactPlayer 
            url={shortsList[playIndex].videoUrl}
            controls
            onEnded={() => {handleNextVideo()}}
            width={'800px'}
            height={'500px'}/>
        <div>
            <div>{shortsList[playIndex].title}</div>
            <div>{shortsList[playIndex].nickname}</div>
        </div>
    </div>
  );
};

export default ShortsBody;
