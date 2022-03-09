import React, {useState} from 'react';

import Tag from '../elements/Tag';
import AnswerCard from './AnswerCard';

const RequestAnswer = (props) => {
    const [stand, setStand] = useState('최신순');
    const standard = ['최신순', '조회수', '댓글순', '좋아요순'];
    const answerList = props.answers;
    console.log(answerList)
    let List = answerList;
    if(stand === '댓글순'){
        // List = answerList.sort((a,b)=>{return b.commentCount - a.commentCount});
    }
    return (
        <React.Fragment>
            <div style={{ width:'90%', margin:'10px auto 0' }}>
                <div>
                    {standard.map((s,i)=>{
                        return (<Tag 
                                key={i} 
                                _onClick={()=>{setStand(s)}}
                                tag={stand} >{s}</Tag>)
                    })}
                </div>
                <div>
                    {List.map((a,i)=>{
                        return(<AnswerCard {...a} key={i} />)
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestAnswer;