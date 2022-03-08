import React from "react";
import { history } from '../redux/configureStore';

import Viewer from "./Viewer";

const RequestContents = (props) => {
    const { category, title, level, content, fileList, postId  } = props;

    return(
        <React.Fragment>
            <div style={{width:'100%'}} >
                <h3>{category}</h3>
                <div style={{ width:'90%', margin:'10px auto 0' }} >
                  <div style={{ display:'flex', justifyContent:'space-between' }} >  
                    <div style={{ display:'flex' }} >
                        <p>마감시간</p>
                        <button>{level}</button>
                    </div>
                    <div style={{ display:'flex' }} >
                        <button onClick={()=>{}} >마감</button>
                        <button onClick={()=>{history.push(`/request/${postId}`)}} >수정</button>
                    </div>
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