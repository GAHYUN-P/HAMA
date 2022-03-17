import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";
import { history } from '../redux/configureStore';
import { getUserId } from "../shared/cookie";

// 각 항목의 컴포넌트
import Header from "../components/Header";
import RequestContents from "../components/RequstContents";
import RequestCenter from "../components/RequestCenter";
import RequestAnswer from "../components/RequestAnswer";
import AnswerWriteBtn from "../elements/AnswerWriteBtn";

import styled from "styled-components";

const RequestDetail = (props) => {
    const dispatch =useDispatch();
    const postId = props.match.params.postId;
    
    const { request, likeUserIdList, answers } = useSelector(state => state.post);
    const can_write = request.status === 'true' && props.user_id === getUserId() ? true : false;
    React.useEffect(()=>{
        dispatch(postActions.getOneRequest(postId));
    },[])

    return (
        <React.Fragment>
            <Header />
            <DetailContainer>
                <RequestContents {...request}/>
                <RequestCenter request={request} like={likeUserIdList} />
                <RequestAnswer answers = {answers} />
                {
                <AnswerWriteBtn postId={postId} />}
            </DetailContainer>
        </React.Fragment>
    )
}

const DetailContainer = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default};
`;

export default RequestDetail;