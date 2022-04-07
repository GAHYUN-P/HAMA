import React from 'react';

import { useDispatch } from 'react-redux';
import { answerActions } from '../redux/modules/answer';
import { history } from '../redux/configureStore';

import { getUserId } from '../shared/cookie';
import { getComment, getBtnString } from '../shared/separator';

import Div from '../elements/Div';

import styled from 'styled-components';

const AnswerComments = (props) => {
    const dispatch = useDispatch();
    const { videoRef, timestamp, content, imgUrl, childCnt, commentWriterId } = props;
    // 댓글 삭제를 누를 시 작동하는 함수
    const delcom = () => {
        const data = {
            commentId: props.commentId,
            // 댓글 갯수의 차감을 위한 숫자
            cnt: 1 + (childCnt ? childCnt : 0)
        }
        dispatch(answerActions.deleteCommentDB(data));
    }

    // 댓글 수정을 누를 시 작동하는 함수
    const _setEdit = () => {
        props.setComment(props.content);
        props.commentRef.current.commentId = props.commentId;
        props.commentRef.current.focus();
    };

    // 타임스탬프를 누를 시 작동하는 함수
    const pushStamp = () => {
        // ReactPlayer에 들어 있는 seekTo함수를 사용하여 작동
        videoRef.current.seekTo(timestamp);
    }

    const profileOnClick = () => {
        history.push(`/userpage/${commentWriterId}`)
    }

    return (
        <React.Fragment>
            <Div display='flex' padding='.8rem 0' borderB='.1rem solid #f5f5f5' Bsizing='border-box' >
                <div onClick={profileOnClick}>
                    <ProHippo src={imgUrl} />
                </div>

                <Div width='100%' >
                    {/* 상단부 */}
                    <Div display='flex' justify='space-between' padding='.6rem 0 0' >
                        <Div fontSize='.8rem'  _onClick={profileOnClick}>
                            {props.commentWriter}
                        </Div>
                        {props.commentWriterId === getUserId() &&
                        <div style={{display:'flex'}} >
                            <PairBtn id='edit' style={{marginRight:'.4rem'}} onClick={_setEdit} >수정</PairBtn>
                            <PairBtn onClick={delcom} >삭제</PairBtn>
                        </div>}
                    </Div>

                    {/* 타임스탬프가 있을 때 나올 댓글 */}
                    {timestamp &&
                    <Div fontSize='.7rem' color='#666' >
                        {/* 타임스탬프를 얻기위한 함수 getBtnString,
                        타임스탬프를 제외한 댓글을 얻기위한 getComment 자세한 점은 separator 참조 */}
                        <TimeStampBtn onClick={pushStamp}>{getBtnString(content)}</TimeStampBtn>
                        {getComment(content)}
                    </Div>}

                    {/* 타임스탬프가 없을 때 나올 댓글 */}
                    {!timestamp &&
                    <Div fontSize='.7rem' color='#666' >
                        {content}
                    </Div>}

                    <Div fontSize='.7rem' color='#9e9e9e' >
                        {props.modifiedAt}
                    </Div>

                    <ChildOpen onClick={()=>{history.push(`/comment/${props.commentId}`)}} >
                        답글{childCnt ? childCnt : ''}
                    </ChildOpen>
                </Div>
            </Div>
        </React.Fragment>
    )
}

const TimeStampBtn = styled.button`
    border: none;
    border-radius: 0.4rem;
    background-color: #f5f5f5;
    color: #ff7a7a;
`;

const ProHippo = styled.img`
    width: 1.6rem;
    height: 1.6rem;
    margin: .2rem .3rem 0 0;
    border-radius: 1.6rem;
    background-color: #dcdcdc;
`;

const PairBtn = styled.button`
    font-size: .5rem;
    color: #9e9e9e;
    padding: 0;
    border: none;
    background-color: #fff;
`;

const ChildOpen = styled.button`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #9e9e9e;
    padding: .2rem .4rem;
    margin-top: ${({theme})=> theme.margins.base};
    border: none;
    background-color: #f5f5f5;
    border-radius: .3rem;
`;

export default AnswerComments;