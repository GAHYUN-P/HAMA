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

    // 리덕스 상에 남아있는 요청글의 아이디와 파람스로 
    // 넘겨받은 아이디가 다르다면 로딩창을 띄워주도록 만들어줌
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
                {/* 요청글의 내용을 전부 보여주는 컴포넌트 따라서 요청글 데이터를 넘겨줌 */}
                <RequestContents {...request}/>
                {/* 좋아요와 작성하기 버튼을 사용하는 컴포넌트 따라서 요청글의 아이디와
                좋아요한 유저들의 리스트를 넘겨줌 */}
                <RequestCenter postId={postId} request={request} like={likeUserIdList} />
                {/* 해당 요청글에 달린 답변글들의 리스트를 보여주는 컴포넌트 따라서 요청글들의
                정보들이 담긴 리스트를 넘겨줌 이 때 평가상태를 판단하기 위하여 해당 요청글의
                작성자의 아이디를 넘겨줌 */}
                <RequestAnswer answers = {answers} requestWriterId={request.user_id} />
            </DetailContainer>
        </React.Fragment>
    )
}

const DetailContainer = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

export default RequestDetail;