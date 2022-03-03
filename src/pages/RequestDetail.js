import React from "react";

// 각 항목의 컴포넌트
import RequestContents from "../components/RequstContents";

const RequestDetail = (props) => {

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'16px'}} >
                <RequestContents/>
            </div>
        </React.Fragment>
    )
}

export default RequestDetail;