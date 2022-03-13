import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";
import { history } from '../redux/configureStore';
import { getUserId } from "../shared/cookie";
import { chatAPI } from "../shared/api";

// 각 항목의 컴포넌트
import RequestContents from "../components/RequstContents";
import RequestCenter from "../components/RequestCenter";
import RequestAnswer from "../components/RequestAnswer";
import EnterChattingBtn from "../elements/EnterChattingBtn";

import Header from "../components/Header";

const RequestDetail = (props) => {
    const dispatch =useDispatch();
    const postId = props.match.params.postId;
    
    const { request, likeUserIdList, answers } = useSelector(state => state.post);
    // const roomId = useSelector(state => state.post.request.roomId);
    const can_write = request.status === 'true' && props.user_id === getUserId() ? true : false;
    React.useEffect(()=>{
        dispatch(postActions.getOneRequest(postId));
    },[])

    // const onClickChat = async() => {
    //     const res = await chatAPI.connectChat(roomId);
    //     history.push('/chatlist');
    // }

    return (
        <React.Fragment>
            <div style={{}} >
                <Header />
                <RequestContents {...request}/>
                <RequestCenter request={request} like={likeUserIdList} />
                <RequestAnswer answers = {answers} />
                { can_write && 
                <div>
                    <button
                    onClick={()=>{history.push(`/answer/${postId}`)}}
                    style={{border:'none',backgroundColor:'#fff'}} >글쓰기</button>
                </div>}
            </div>
            {/* <button onClick = {onClickChat}>채팅방</button>
            <EnterChattingBtn
             roomId = {roomId}
             /> */}
        </React.Fragment>
    )
}

export default RequestDetail;