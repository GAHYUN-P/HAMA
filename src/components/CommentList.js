import React, {useState, useRef} from 'react';

import AnswerComments from './AnswerComments';

import { useDispatch, useSelector } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import { getTimeStamp } from '../shared/separator';
import { getToken } from '../shared/cookie';

import PP from '../assets/Paper_Plane.svg';

import styled from 'styled-components';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const { videoRef } =props;
    const commentArray = useSelector(state => state.answer.comments);
    const {videoUrl} = useSelector(state => state.answer.answer);

    const [content,setContent] = useState('');
    const commentRef = useRef();

    const placeholder = videoUrl ? '00:00(타임 스탬프)댓글을 작성해 주세요.' : '댓글을 작성해주세요';

    const commenting = () => {
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
    }

    const cancel = () => {
        setContent('')
        commentRef.current.commentId = undefined;
    }

    return (
        <React.Fragment>
            { getToken() &&
            <InputGrid>
                <ElInput 
                ref={commentRef}
                value={content}
                onChange={(e)=>{setContent(e.target.value)}}
                type='text' 
                placeholder={placeholder}/>
                <PPHolder onClick={commenting} url={PP} />
            </InputGrid>}
            
            <CommentGrid>
                {commentArray.map((c,i)=>{
                    return(<AnswerComments
                         videoRef={videoUrl ? videoRef : null}
                         setContent={setContent} 
                         commentRef={commentRef} key={i} {...c} />)
                })}
            </CommentGrid>
        </React.Fragment>
    )
};

const CommentGrid = styled.div`
    padding: .9rem ${({theme})=> theme.paddings.default};
`;

const PPHolder = styled.div`
    width: 1.35rem;
    height: 1.35rem;
    background-image: url(${props => props.url});
    background-size: cover;
    position: absolute;
    right: 2.12rem;
    top: 2rem;
`;

const InputGrid = styled.div`
    position: relative;
    padding: ${({theme})=> theme.paddings.default};
    background-color: #efefef;
`;

const ElInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: ${({theme})=> theme.paddings.lg} .8rem ;
    border-radius: .3rem;
    box-shadow: 0 .15rem .4rem  #d5d5d5;
    &::placeholder{
        font-size: .7rem;
        color:  #9e9e9e;
    }
`

export default CommentList;