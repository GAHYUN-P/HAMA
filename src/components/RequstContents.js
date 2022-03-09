import React from "react";
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";

import Viewer from "./Viewer";

const RequestContents = (props) => {
    const dispatch = useDispatch();
    const { category, title, level, content, fileList, postId, timeSet } = props;
    
    const _conclusion = useSelector(state => state.post.request.status);
    console.log(_conclusion);
    const conclusion = () => {
        if(window.confirm('마감을 누르시면 되돌릴 수 없습니다. 마감하시겠습니까?')){
            dispatch(postActions.concluseRequestDB(postId));
            return;
        };
        console.log('마감이 취소되었습니다.');
    }

    return(
        <React.Fragment>
            <div style={{width:'100%'}} >
                <h3>{category}</h3>
                <div style={{ width:'90%', margin:'10px auto 0' }} >
                  <div style={{ display:'flex', justifyContent:'space-between' }} >  
                    <div style={{ display:'flex' }} >
                        <p>{timeSet}</p>
                        <button>{level}</button>
                    </div>
                    { _conclusion === 'true' &&
                    <div style={{ display:'flex' }} >
                        <button onClick={conclusion} >마감</button>
                        <button onClick={()=>{history.push(`/request/${postId}`)}} >수정</button>
                    </div>}
                  </div>  
                    <br />

                    <div>
                        <p>{title}</p>
                        <hr/>
                        <p>{content}</p>
                    </div>
                    
                    <Viewer fileList={fileList}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestContents;