import React from "react";

import { userpageActions } from "../redux/modules/userpage";
import { useDispatch } from "react-redux";

import { getUserId } from "../shared/cookie";

import styled from "styled-components";

const UserComment = (props) => {
    const { commentWriterId, commentWriter, content, modifiedAt, imgUrl } = props;
    const dispatch = useDispatch();

    // 댓글 삭제 요청
    const delcom = () => {
        const data = {
            commentId: props.commentId,
        }
        dispatch();
    };

    // 댓글 수정 준비
    const _setEdit = () => {
        props.setComment(props.content);
        props.commentRef.current.commentId = props.commentId;
        props.commentRef.current.focus();
    };

    return(
        <React.Fragment>
            <Grid>
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

                    <ChildOpen onClick={()=>{}} >
                        답글
                    </ChildOpen>
                </div>
            </Grid>
        </React.Fragment>
    )
};

const Grid = styled.div`
    display: flex;
    padding: ${({theme})=> theme.paddings.xl} 0;
    border-bottom: .1rem solid #f5f5f5;
    box-sizing: border-box;
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