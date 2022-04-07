import React,{ useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { childActions } from '../redux/modules/child';
import { getUserId, getToken } from '../shared/cookie';
import { history } from '../redux/configureStore';

import Header from '../components/Header';
import CommentInput from '../components/CommentInput';

import {BiSubdirectoryRight} from 'react-icons/bi';

import styled from 'styled-components';

const ChildComment = (props) => {
    const dispatch = useDispatch();
    // 댓글인풋을 다루기 위한 state와 ref들 
    const [comment,setComment] = useState('');
    const commentRef = React.useRef();
    // parentId: dispatch시 대댓글임을 알 수 있게하기위한 부모댓글 아이디
    const parentId = props.match.params.commentId;

    // 부모댓글을 나타내기 위한 부모댓글의 데이터
    const parent = useSelector(state => state.child.parentComment);
    // 대댓글 리스트 
    const childs = useSelector(state => state.child.childComments);

    React.useEffect(()=>{
        // 리덕스 상의 부모아이디와 params로 넘겨받은 아이디가 다르다면
        // 해당 부모댓글의 아댓글의 이디로 서버상에 다시 요청을 넣음
        if(parentId !== parent.commentId){
            dispatch(childActions.getChildsDB(parentId));
        }
    },[]);

    // 댓글 작성 시 작동하는 함수
    const add = () => {
        if(!commentRef.current.value){
            window.alert('내용이 비었습니다.')
            return;
        }
        // 댓글의 아이디가 있다면 수정을 의미함
        if(commentRef.current.commentId !== undefined){
            const data = {
                comment: commentRef.current.value,
                commentId: commentRef.current.commentId
            }
            dispatch(childActions.editChildDB(data));
            cancel();
            return;
        }
        const data = {
            answerId: parent.answerId,
            comment: commentRef.current.value,
            parentCommentId: parentId
        }
        dispatch(childActions.addChildDB(data));
        cancel();
    };

    // 작성 후 댓글 인풋을 초기화하는 함수
    const cancel = () => {
        setComment('');
        commentRef.current.commentId = undefined;
    };

    const profileOnClick = () => {
        history.push(`/userpage/${parent.commentWriterId}`)
    };

    return(
        <React.Fragment>
            <Header />
            <WholeGrid>
                {/* 부모댓글 */}
                <Grid>
                    <div onClick={profileOnClick}>
                        <ProHippo src={parent.imgUrl} />
                    </div>
                    <div style={{width:'100%'}} >

                        <CWrieter onClick={profileOnClick}> 
                            {parent.commentWriter}
                        </CWrieter>

                        <ContentDiv>
                            {parent.content}
                        </ContentDiv>
                        <TimeSet>
                            {parent.modifiedAt}
                        </TimeSet>
                    </div>
                </Grid>

                {/* 댓글 없을 때 */}
                {childs.length === 0 &&
                <div>
                아직 대댓글이 없어요 
                첫 작성자가 되어주세요!!
                </div>
                }

                {/* 자식댓글 */}
                {childs.length > 0 &&
                childs.map((k,i)=>{
                    return (
                    <Grid key={i} >
                        <Icon>
                            <BiSubdirectoryRight/>
                        </Icon>

                        <ChildGrid>
                            <div> 
                                <ProHippo src={k.imgUrl} onClick= {() => {history.push(`/userpage/${k.commentWriterId}`)}}/>
                            </div>
                            <div style={{width:'100%'}} >
                                <UserGrid>
                                    <CWrieter onClick= {() => {history.push(`/userpage/${k.commentWriterId}`)}}>
                                        {k.commentWriter}
                                    </CWrieter>
                                    {k.commentWriterId === Number(getUserId())  &&
                                    <div style={{display:'flex'}} > 
                                        <PairBtn id='edit'
                                        onClick={()=>{
                                            commentRef.current.commentId = k.commentId;
                                            commentRef.current.value = k.content;
                                            commentRef.current.focus();
                                        }}
                                        >수정</PairBtn>
                                        <PairBtn
                                        onClick={()=>{
                                            if(window.confirm('댓글을 삭제하겠습니까?')){
                                                dispatch(childActions.delChildDB(k.commentId))
                                            }}} >삭제</PairBtn>
                                    </div>}
                                </UserGrid>
                                <div>
                                    <ContentDiv>
                                        {k.content}
                                    </ContentDiv>
                                    <TimeSet>
                                        {k.modifiedAt}
                                    </TimeSet>
                                </div>
                            </div>
                        </ChildGrid>
                    </Grid>
                    )
                    })}
            </WholeGrid>
            {/* 로그인 상태일 때만 댓글 작성 인풋이 보임 */}
            { getToken() &&
            <CommentInput
                is_child
                add={add}
                commentRef={commentRef} 
                comment={comment}
                setComment={setComment}
                type='text' 
                placeholder='댓글을 작성해 주세요.'/> }
        </React.Fragment>
    )
};

const WholeGrid = styled.div`
    width: 100%;
    padding: 0 ${({theme})=> theme.paddings.default} 4.5rem;
    position: relative;
`;

const Grid = styled.div`
    width: 100%;
    display: flex;
    padding: ${({theme})=> theme.paddings.xl} 0;
    border-bottom: .1rem solid #f5f5f5;
    box-sizing: border-box;
`;

const Icon = styled.div`
    font-size: 1.8rem;
    color: #dcdcdc;
`;

const ChildGrid = styled.div`
    display: flex;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: .3rem;
    padding: ${({theme})=> theme.paddings.small};
`;

const UserGrid = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: ${({theme})=>theme.margins.small};
`;

const ProHippo = styled.img`
    width: 1.6rem;
    height: 1.6rem;
    margin: .2rem .3rem 0 0;
    border-radius: 1.6rem;
`;

const CWrieter = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
`;

const ContentDiv = styled.div`
    font-size: .7rem;
    color: #666;
`;

const TimeSet = styled.div`
    font-size: .7rem;
    color: #9e9e9e;
`;

const PairBtn = styled.button`
    font-size: .4rem;
    padding: 0 .2rem;
    color: #9e9e9e;
    border: none;
    background-color: #f5f5f5;
`;

export default ChildComment;