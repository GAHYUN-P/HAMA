import React from "react";

import { useDispatch } from "react-redux";

import { getUserId } from "../shared/cookie";

import {BiSubdirectoryRight} from 'react-icons/bi';

import styled from "styled-components";
import { userpageActions } from "../redux/modules/userpage";

const UserChild = (props) => {
    const dispatch = useDispatch();
    // commentRef: 댓글창에 접근하기 위한 ref 
    // 이 외는 각 댓글의 내용 및 정보들
    const { commentRef, imgUrl, commentWriterId, commentWriter,
         commentId, parentId, content, modifiedAt } = props
        
    // 대댓글을 삭제하기 위한 함수
    const del = () => {
        const data = {commentId: commentId, parentId: parentId}
        dispatch(userpageActions.delCommentsDB(data))
    }

    // 수정버튼 누른다면 ref에 대댓글 수정을 위한 값들을 넣어주는 함수
    const Edit = () => {
        // 해당 대댓글의 아이디
        commentRef.current.commentId = commentId;
        // 해당 대댓글의 부모 댓글 아이디
        commentRef.current.parentId = parentId;
        // 해당 대댓글의 내용
        commentRef.current.value = content;
        commentRef.current.focus();
    }

    return(
        <React.Fragment>
            <Grid>
                <Icon>
                    <BiSubdirectoryRight/>
                </Icon>

                <ChildGrid>
                    <div> 
                        <ProHippo src={imgUrl} />
                    </div>
                    <div style={{width:'100%'}} >
                        <UserGrid>
                            <CWrieter>
                                {commentWriter}
                            </CWrieter>
                            {commentWriterId === getUserId()  &&
                            <div style={{display:'flex'}} > 
                                <PairBtn id='edit'
                                onClick={Edit}
                                >수정</PairBtn>
                                <PairBtn
                                onClick={()=>{
                                    if(window.confirm('댓글을 삭제하겠습니까?')){
                                        del()
                                    }}} >삭제</PairBtn>
                            </div>}
                        </UserGrid>
                        <div>
                            <ContentDiv>
                                {content}
                            </ContentDiv>
                            <TimeSet>
                                {modifiedAt}
                            </TimeSet>
                        </div>
                    </div>
                </ChildGrid>
            </Grid>
        </React.Fragment>
    )
};

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

const PairBtn = styled.button`
    font-size: .4rem;
    padding: 0 .2rem;
    color: #9e9e9e;
    border: none;
    background-color: #f5f5f5;
`;


export default UserChild;