import React from "react";

const AlamCard = (props) => {

    return (
        <React.Fragment>
            <div style={{display:'flex',padding:'1rem 0',borderBottom:'1px solid #ccc'}} >
                <div style={{width:'20%',display:'flex',justifyContent:'center',alignItems:'center'}}>타입</div>
                <div style={{width:'70%'}}>
                    소보로빵님이 [빵을 야무지게 먹어보겠..]글에 댓글을 남겼습니다.
                    <span>  48분전</span>
                </div>
                <div style={{width:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>X</div>
            </div>
        </React.Fragment>
    )
}

export default AlamCard;