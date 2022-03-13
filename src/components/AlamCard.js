import React from "react";

const AlamCard = (props) => {
    const { id, nickname, type, title, createdAt, reading } = props;

    return (
        <React.Fragment>
            <div style={{display:'flex',padding:'1rem 0',borderBottom:'1px solid #ccc'}} >
                <div style={{width:'20%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    {type}
                </div>
                <div style={{width:'70%'}}>
                    {nickname}님이 [{title}]글에 댓글을 남겼습니다.
                    <span>  {createdAt}</span>
                </div>
                <div style={{width:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>X</div>
            </div>
        </React.Fragment>
    )
}

export default AlamCard;