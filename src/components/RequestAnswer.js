import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../redux/modules/post';

import Tag from '../elements/Tag';
import AnswerCard from './AnswerCard';

const RequestAnswer = (props) => {
    const dispatch = useDispatch();
    // 요청글에 달린 답변글은 정렬하기 위한 기준
    const [stand, setStand] = useState('최신순');
    // 답변글을 정렬하기위한 기준을 담은 배열
    const standard = ['최신순', '댓글순', '좋아요순'];
    // 요청글에 달린 답변글들의 데이터가 담긴 배열
    const answerList = useSelector(state => state.post.answers);

    // 작성된 답변글이 없다면 빈칸이 되도록 만들어줌
    if(answerList.length === 0){
        return null
    }

    return (
        <React.Fragment>
            <div style={{width:'100%'}}>
                <div>
                    {standard.map((s,i)=>{
                        // 답변글을 분류하는 기준을 나눠주는 버튼 선택된 것을 
                        // 알 수 있도록 태그에 stand 스테이트를 넘겨줌
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
                        // 요청글을 작성한 유저가 해당 답변글을 평가했는지 알 수 있게 하기위해 
                        // 요청글 작성자의 아이디를 넘겨줌
                        return(<AnswerCard {...a} key={i} requestWriterId={props.requestWriterId} />)
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestAnswer;