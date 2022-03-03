import React from 'react';

const AnswerCard = (props) => {

    return(
        <React.Fragment>
            <div>
                <div style={{display:'inline-block'}} >프로필 하마</div>
                <div style={{display:'inline-block'}} >
                    <div>응답글 제목</div>
                    <div>
                        <div>닉네임, 시간, 조회수</div>
                        <div>사진수, 댓글수,좋아요</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AnswerCard;