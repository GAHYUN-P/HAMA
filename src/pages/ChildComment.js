import React,{ useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { childActions } from '../redux/modules/child';
import { getUserId } from '../shared/cookie';

import Header from '../components/Header';

import PP from '../assets/Paper_Plane.svg';
import {BiSubdirectoryRight} from 'react-icons/bi';

import styled from 'styled-components';

const ChildComment = (props) => {
    const dispatch = useDispatch();
    const commentRef = React.useRef();
    const [comment,setComment] = useState('');
    const parentId = props.match.params.commentId;
    const parent = useSelector(state => state.child.parentComment);
    const childs = useSelector(state => state.child.childComments);

    React.useEffect(()=>{
        if(parentId !== parent.commentId){
            dispatch(childActions.getChildsDB(parentId));
        }
    },[]);

    const add = () => {
        if(!commentRef.current.value){
            window.alert('내용이 비었습니다.')
            return;
        }
        if(commentRef.current.commentId !== undefined){
            const data = {
                comment: commentRef.current.value,
                commentId: commentRef.current.commentId
            }
            console.log(data);
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

    const cancel = () => {
        commentRef.current.commentId = undefined;
        setComment('');
    };

    return(
        <React.Fragment>
            <Header />
            <WholeGrid>
                {/* 부모댓글 */}
                <Grid>
                    <div>
                        <ProHippo />
                    </div>
                    <div style={{width:'100%'}} >

                        <CWrieter> 
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
                <div>아직 대댓글이 없어요 
                첫 작성자가 되어주세요!!</div>
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
                                <ProHippo />
                            </div>
                            <div style={{width:'100%'}} >
                                <UserGrid>
                                    <CWrieter>
                                        {k.commentWriter}
                                    </CWrieter>
                                    {k.commentWriterId === Number(getUserId())  &&
                                    <div style={{display:'flex'}} > 
                                        <PairBtn
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
                <div style={{position:'fixed',width:'23.2rem', bottom:'2rem' }} >        
                    <InputGrid>
                        <ElInput 
                        ref={commentRef}
                        value={comment} onChange={(e)=>{setComment(e.target.value)}}
                        type='text'
                        placeholder='댓글을 작성해 주세요.' />
                        <PPHolder url={PP} onClick={add} />
                    </InputGrid>
                </div>
            </WholeGrid>
        </React.Fragment>
    )
};

const WholeGrid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default} 4.5rem;
    position: relative;
`;

const Grid = styled.div`
    display: flex;
    padding: ${({theme})=> theme.paddings.xl} 0;
    border-bottom: .1rem solid #f5f5f5;
    box-sizing: border-box;
`
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

const ProHippo = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    margin: .2rem .3rem 0 0;
    border-radius: 1.6rem;
    background-color: #dcdcdc;
`;

const PPHolder = styled.div`
    width: 1.35rem;
    height: 1.35rem;
    background-image: url(${props => props.url});
    background-size: cover;
    position: absolute;
    right: .7rem;
    top: .7rem;
`;

const InputGrid = styled.div`
    position: relative;
`;

const ElInput = styled.input`
    width: 100vw;
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