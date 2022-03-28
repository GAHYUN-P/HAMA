import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";
import { answerActions } from "../redux/modules/answer";

import { getUserId } from "../shared/cookie";
import { canWrite } from '../shared/conditions';

// 각 항목의 컴포넌트
import Header from "../components/Header";
import RequestContents from "../components/RequstContents";
import RequestCenter from "../components/RequestCenter";
import RequestAnswer from "../components/RequestAnswer";
import AnswerWriteBtn from "../elements/AnswerWriteBtn";
import WaitForAMoment from "../components/WaitForAMoment";

import styled from "styled-components";

const RequestDetail = (props) => {
    const dispatch =useDispatch();
    const postId = Number(props.match.params.postId);
    
    const { request, likeUserIdList, answers } = useSelector(state => state.post);

    React.useEffect(()=>{
        dispatch(postActions.getOneRequest(postId));
    },[])

    if(request.postId !== postId){
        return(
        <div style={{width:'100%',height:'100vh',position:'relative'}} >
            <WaitForAMoment is_loading />
        </div>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <DetailContainer>
                <RequestContents {...request}/>
                <RequestCenter postId={postId} request={request} like={likeUserIdList} />
                <RequestAnswer answers = {answers} requestWriterId={request.user_id} />
                {/* {canWrite(request.status,request.user_id) &&
                <AnswerWriteBtn postId={postId} />} */}
            </DetailContainer>
        </React.Fragment>
    )
}

const DetailContainer = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

export default RequestDetail;