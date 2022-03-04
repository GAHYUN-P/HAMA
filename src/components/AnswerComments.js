import React from 'react';
import ChildComment from './ChildComment';

const AnswerComments = (props) => {
    const [childComment,setChild] = React.useState(props.childComment);
    
    return (
        <React.Fragment>
            <div>

                <div style={{display:'flex'}} >
                    <div>프로필</div>
                    <div>{props.commentWriter}</div>
                </div>
                <div>{props.content}</div>
                <div style={{display:'flex'}} >
                    <div>{props.modifiedAt}</div>
                    <button>답글쓰기</button>
                </div>
                {childComment.map((c,i)=>{
                    return <ChildComment key={i} {...c} />
                })}
            </div>
        </React.Fragment>
    )
}

export default AnswerComments;