import React from 'react';

import { useSelector, useDispatch } from 'react-redux'; 

import AnswerContent from '../components/AnswerContent';
import RateBox from '../components/RateBox';
import AnswerComments from '../components/AnswerComments';

const AnswerDetail = (props) => {
    const answerId = props.match.params.answerId;
    const answer = useSelector(state => state.answer.answer);
    const commnetList = useSelector(state => state.answer.comments);

    React.useEffect(()=>{
        
    },[])

    return (
        <React.Fragment>
            <div style={{width:'90%', margin:'0 auto'}}>
                <AnswerContent {...answer} />
                <RateBox />
                {commnetList.map((c,i)=>{
                    return (<AnswerComments {...c} key={i} />)
                })}
            </div>
        </React.Fragment>
    )
}

export default AnswerDetail;