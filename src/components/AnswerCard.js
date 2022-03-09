import React from 'react';

import { history } from '../redux/configureStore';

const AnswerCard = (props) => {
    const { answerWritter, modifiedAt, title, commentCount, answerId, imageCount, answerLikeCount } = props;
    console.log(props)
    return(
        <React.Fragment>
            <div>
                <div style={{display:'inline-block',padding:'0 4px'}} >프로필 하마</div>
                <div onClick={()=>{history.push(`/answerdetail/${answerId}`)}} style={{display:'inline-block'}} >
                    <div>{title}</div>
                    <div>
                        <div>{answerWritter} {modifiedAt} 조회수</div>
                        <div>사진수{imageCount} 댓글{commentCount} 좋아요{answerLikeCount}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AnswerCard;