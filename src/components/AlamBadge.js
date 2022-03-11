import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { alamActions } from '../redux/modules/alam';

const AlamBadge = (props) => {
    const { notCheck } = useSelector(state => state.alam);

    React.useEffect(()=>{
        if(!notCheck){
            // 요청을 채워줄 미들웨어 요청
        }
    },[])

    return(
        <React>
            <div></div>
        </React>
    )
}

export default AlamBadge;