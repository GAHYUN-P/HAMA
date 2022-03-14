import React from "react";
import styled from "styled-components";

import { setAlamContent } from "../shared/setAlamcontent";

import { history } from "../redux/configureStore";

const AlamCard = (props) => {
    const { alamId ,id, nickname, type, title, createdAt, reading } = props;

    const MoveTo = () => {
        if(type === ('likeP'||'answer')){
            history.push(`/requestdeatil/${id}`);
        }
        if(type === ('comment'||'rate'||'rated'||'likeA')){
            history.push(`/answerdetail/${id}`);
        }
        if(type === 'child'){
            history.push(`/comment/${id}`);
        }
        if(type === 'level'){
            history.push('/mypage');
        }
    }

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

const ReadY = styled.div`
    color: ${({theme})=> theme.colors.gray_1};
`;

const ReadN = styled.div`
    color: ${({theme})=> theme.colors.black};
`

export default AlamCard;