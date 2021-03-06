import React from "react";

import UserChild from "./UserChild";

import { userpageActions } from "../redux/modules/userpage";
import { useDispatch } from "react-redux";

import { getUserId } from "../shared/cookie";

import styled from "styled-components";

const UserComment = (props) => {
    // 댓글 하나의 데이터를 넘겨받음
    // childComments: 해당 댓글이 지니고 있는 대댓글들의 리스트
    // set: 댓글인풋의 접근하기 ref와 스테이트를 넘겨받음
    const { commentId, commentWriterId, commentWriter, content, modifiedAt, imgUrl, childComments, set } = props;
    const dispatch = useDispatch();

    // 댓글 삭제 요청 함수
    const delcom = () => {
        const data = {
            commentId: commentId,
        }
        dispatch(userpageActions.delCommentsDB(data));
    };

    // 댓글 수정 준비 함수
    const _setEdit = () => {
        // 댓글 내용을 넣어줌
        set.setComment(props.content);
        // 댓글의 아이디를 넣어줌
        set.commentRef.current.commentId = commentId;
        set.commentRef.current.focus();
    };

    return(
        <React.Fragment>
            <Grid flex >
                <div>
                    <ProHippo src={imgUrl} />
                </div>

                <div style={{width:'100%'}} >
                    {/* 상단부 */}
                    <UserGrid>
                        <CWrieter>
                            {commentWriter}
                        </CWrieter>
                        {commentWriterId === getUserId() &&
                        <div style={{display:'flex'}} >
                            <PairBtn id='edit' style={{marginRight:'.4rem'}} onClick={_setEdit} >수정</PairBtn>
                            <PairBtn onClick={delcom} >삭제</PairBtn>
                        </div>}
                    </UserGrid>

                    <ContentDiv>
                       {content}
                    </ContentDiv>

                    <TimeSet>
                        {modifiedAt}
                    </TimeSet>

                    <ChildOpen
                    id='edit'
                     onClick={()=>{
                        set.commentRef.current.parentId = commentId;
                        set.commentRef.current.focus();
                    }}>
                        답글쓰기
                    </ChildOpen>
                </div>
            </Grid>
            <Grid>
                {childComments.map((c,i)=>{return <UserChild key={i} parentId={commentId} {...c} {...set} />})}
            </Grid>
        </React.Fragment>
    )
};

const Grid = styled.div`
    ${props => props.flex ? 'display: flex;' : ''}
    padding: ${({theme})=> theme.paddings.xl} ${({theme})=> theme.paddings.default};
    border-bottom: .1rem solid #f5f5f5;
    box-sizing: border-box;
    background-color: #fff;
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
    background-color: #dcdcdc;
`;

const PairBtn = styled.button`
    font-size: .5rem;
    color: #9e9e9e;
    padding: 0;
    border: none;
    background-color: #fff;
`;

const CWrieter = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #666;
`;

const ContentDiv = styled.div`
    font-size: .7rem;
    color: #666;
`;

const TimeSet = styled.div`
    font-size: .7rem;
    color: #9e9e9e;
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

export default UserComment;