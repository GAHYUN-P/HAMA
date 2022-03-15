import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';

import Tag from '../elements/Tag';
import AnswerCard from './AnswerCard';

const RequestAnswer = (props) => {
    const dispatch = useDispatch();
    const [stand, setStand] = useState('최신순');
    const standard = ['최신순', '댓글순', '좋아요순'];
    const answerList = useSelector(state => state.post.answers);

    if(answerList.length === 0){
        return null
        // (
        //     <React.Fragment>
        //     답변이 없습니다! 첫 번째 답변자가 되어주세요!!
        //     </React.Fragment>
        // )
    }

    return (
        <React.Fragment>
            <div style={{width:'100%'}}>
                <div>
                    {standard.map((s,i)=>{
                        return (<Tag 
                                key={i} 
                                _onClick={()=>{
                                    dispatch(postActions.sortAnswer(s));
                                    setStand(s);
                                }}
                                tag={stand} >{s}</Tag>)
                    })}
                </div>
                <div>
                    {answerList.map((a,i)=>{
                        return(<AnswerCard {...a} key={i} />)
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestAnswer;