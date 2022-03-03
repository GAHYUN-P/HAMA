import React from "react";

// 각 항목의 컴포넌트
import RequestContents from "../components/RequstContents";
import RequestCenter from "../components/RequestCenter";
import RequestAnswer from "../components/RequestAnswer";

const RequestDetail = (props) => {

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'16px'}} >
                <RequestContents/>
                <RequestCenter />
                <RequestAnswer />
            </div>
        </React.Fragment>
    )
}

export default RequestDetail;