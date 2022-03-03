import React from 'react';

const AnswerCard = (props) => {
    const { answerWritter, modifiedAt, title, commentCount  } = props;

    return(
        <React.Fragment>
            <div>
                <div style={{display:'inline-block'}} >프로필 하마</div>
                <div style={{display:'inline-block'}} >
                    <div>{title}</div>
                    <div>
                        <div>{answerWritter} {modifiedAt} 조회수</div>
                        <div>사진수, {commentCount},좋아요</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AnswerCard;