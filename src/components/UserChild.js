import React from "react";

import { useDispatch } from "react-redux";

import { getUserId } from "../shared/cookie";

import {BiSubdirectoryRight} from 'react-icons/bi';

import styled from "styled-components";
import { userpageActions } from "../redux/modules/userpage";

const UserChild = (props) => {
    const dispatch = useDispatch();
    const { comment, setComment, commentRef,
         imgUrl, commentWriterId, commentWriter, commentId, parentId, content, modifiedAt } = props
        
    const del = () => {
        const data = {commentId: commentId, parentId: parentId}
        dispatch(userpageActions.delCommentsDB(data))
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
                                        onClick={()=>{
                                            commentRef.current.commentId = commentId;
                                            commentRef.current.parentId = parentId;
                                            commentRef.current.value = content;
                                            commentRef.current.focus();
                                        }}
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