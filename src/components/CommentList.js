import React, {useState, useRef} from 'react';

import CommentInput from './CommentInput';
import AnswerComments from './AnswerComments';

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import { getTimeStamp } from '../shared/separator';
import { getToken } from '../shared/cookie';

import {FiChevronRight} from 'react-icons/fi';

import styled from 'styled-components';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const { videoRef } =props;
    const commentArray = useSelector(state => state.answer.comments);
    console.log(commentArray);
    const {videoUrl} = useSelector(state => state.answer.answer);

    const [comment,setComment] = useState('');
    const commentRef = useRef();

    const placeholder = videoUrl ? '00:00(타임 스탬프)댓글을 작성해 주세요.' : '댓글을 작성해주세요';

    const add = () => {
        if(!commentRef.current.value){return}
        
        const timeStamp = videoUrl ? getTimeStamp(commentRef.current.value) : null;

        if(commentRef.current.commentId !== undefined){
            // 수정요청
            const data = {
                comment: commentRef.current.value,
                timestamp: timeStamp,
                commentId: commentRef.current.commentId
            }
            dispatch(answerActions.editCommentDB(data));
            cancel()
            return
        }
        // 작성요청
        const data = {
            comment: commentRef.current.value,
            timestamp: timeStamp,
            answerId: props.answerId
        };
        dispatch(answerActions.addCommentDB(data));
        cancel()
    };

    const cancel = () => {
        setComment('')
        commentRef.current.value = '';
        commentRef.current.commentId = undefined;
    };

    return (
        <React.Fragment>
            { getToken() &&
            <CommentInput 
            commentRef={commentRef}
            comment={comment}
            setComment={setComment}
            type='text' 
            add={add}
            placeholder={placeholder}/>}

            <CommentGrid2>
                <OnOffBtn>
                    <Com>
                        댓글
                    </Com>
                    <Num>
                        {props.commentCount}
                    </Num>
                    <Icon>
                        <FiChevronRight />
                    </Icon>
                </OnOffBtn>
            </CommentGrid2>

            <CommentGrid>
                {commentArray.map((c,i)=>{
                    return(<AnswerComments
                         videoRef={videoUrl ? videoRef : null}
                         setComment={setComment}
                         commentRef={commentRef} key={i} {...c} />)
                })}
            </CommentGrid>
        </React.Fragment>
    )
};

const CommentGrid = styled.div`
    padding: .9rem ${({theme})=> theme.paddings.default};
`;

const CommentGrid2 = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
    border-bottom: .08rem solid #efefef;
`;

const OnOffBtn = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    display: flex;
    padding: .5rem 0;
`;

const Com = styled.div`
    font-weight: 600;
`;

const Num = styled.div`
    margin-left: .2rem;
    color: #666;
`;

const Icon = styled.div`
    font-size: ${({theme})=>theme.fontSizes.base};
    color: #9e9e9e;
    padding-top: .1rem;
`;

export default CommentList;