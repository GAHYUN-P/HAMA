import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";

// 각 항목의 컴포넌트
import RequestContents from "../components/RequstContents";
import RequestCenter from "../components/RequestCenter";
import RequestAnswer from "../components/RequestAnswer";

const RequestDetail = (props) => {
    const dispatch =useDispatch();
    const request = useSelector(state => state.post.request);
    const like = useSelector(state => state.post.likeUserIdList);
    const answers = useSelector(state => state.post.answers);

    React.useEffect(()=>{
        dispatch(postActions.getOneRequest(1));
    },[])

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'16px'}} >
                <RequestContents {...request}/>
                <RequestCenter request={request} like={like} />
                <RequestAnswer answers = {answers} />
            </div>
        </React.Fragment>
    )
}

export default RequestDetail;