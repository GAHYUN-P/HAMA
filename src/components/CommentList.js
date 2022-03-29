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
    // 영상과 댓글의 연계를 도와줄 videoRef
    const { videoRef } =props;
    // 댓글의 배열과 영상의 유무를 알게해 줄 videoUrl
    const commentArray = useSelector(state => state.answer.comments);
    const { videoUrl } = useSelector(state => state.answer.answer);

    // 댓글 작성과 작성 수정의 역할을 도와줄 commentRef
    const [comment,setComment] = useState('');
    // ref로 작성과 수정을 나눈 이유는 스테이트가 아니기에 리렌더링에 다른 영향을 
    // 끼치지않았기 때문이다.
    const commentRef = useRef();

    // 영상의 유무에 따라 placeholder는 타임스탬프를 쓸 수 있는지 없는지 
    // 알려주어야 하기에 조건식을 걸어줌
    const placeholder = videoUrl ? '00:00(타임 스탬프)댓글을 작성해 주세요.' : '댓글을 작성해주세요';

    const add = () => {
        // 댓글의 내용이 없다면 작성할 수 없음(수정이든 작성이든)
        if(!commentRef.current.value){return}
        
        // 영상이 있다면 타임스탬프를 얻어야 하기에 getTimeStamp함수를 사용 
        // 타임스탬프를 얻는 로직이 알고싶다면 separator를 참조할 것
        const timeStamp = videoUrl ? getTimeStamp(commentRef.current.value) : null;

        // 현재 commentRef에 따로 설정된 commentId가 있다면 이는 댓글 수정을 의미함
        // 따로 boolean값으로 판단하지 않은 것은 undefined로 판단할 때만 내 선에서 
        // 통제 가능했기 때문
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
        // 현재 commentRef에 따로 설정된 commentId가 없다면 이는 댓글 작성을 의미함
        const data = {
            comment: commentRef.current.value,
            timestamp: timeStamp,
            answerId: props.answerId
        };
        dispatch(answerActions.addCommentDB(data));
        cancel()
    };

    // 댓글 작성 또는 수정 후 commentRef를 초기화 시켜주는 함수
    const cancel = () => {
        setComment('')
        commentRef.current.value = '';
        commentRef.current.commentId = undefined;
    };

    return (
        <React.Fragment>
            {/* 댓글은 현재 로그인한 상태일 때만 작성할 수 있음 */}
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
                    // 영상 유무에 따라 videoRef를 넘겨줄지 말지 정함
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