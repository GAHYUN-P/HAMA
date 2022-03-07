import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";
import { history } from '../redux/configureStore';
import { chatAPI } from "../shared/api";

// 각 항목의 컴포넌트
import RequestContents from "../components/RequstContents";
import RequestCenter from "../components/RequestCenter";
import RequestAnswer from "../components/RequestAnswer";
import EnterChattingBtn from "../elements/EnterChattingBtn";

const RequestDetail = (props) => {
    const dispatch =useDispatch();
    const postId = props.match.params.postId;

    const request = useSelector(state => state.post.request);
    const like = useSelector(state => state.post.likeUserIdList);
    const answers = useSelector(state => state.post.answers);
    const roomId = useSelector(state => state.post.request.roomId);
    console.log(roomId);

    React.useEffect(()=>{
        dispatch(postActions.getOneRequest(postId));
    },[])

    const onClickChat = async() => {
        const res = await chatAPI.connectChat(roomId);
        history.push('/chatlist');
    }

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'16px'}} >
                <RequestContents {...request}/>
                <RequestCenter request={request} like={like} />
                <RequestAnswer answers = {answers} />
                <div>
                    <button
                    onClick={()=>{history.push(`/answer/${postId}`)}}
                    style={{border:'none',backgroundColor:'#fff'}} >글쓰기</button>
                </div>
            </div>
            {/* <button onClick = {onClickChat}>채팅방</button>
            <EnterChattingBtn
             roomId = {roomId}
             /> */}
        </React.Fragment>
    )
}

export default RequestDetail;