import React from "react";
import { useSelector } from "react-redux";
import { history } from '../redux/configureStore';

import styled from "styled-components";

const RequestContents = (props) => {
    const { category, title, level, content, fileList, postId  } = props;

    return(
        <React.Fragment>
            <div>
                <h3>{category}</h3>
                <div style={{ width:'90%', margin:'10px auto 0' }} >

                    <div style={{ display:'flex', justifyContent:'space-between' }} >
                        <p>{title}</p>
                        <p>{level}</p>
                    </div>
                    
                    <hr />

                    <div>
                        <p>{content}</p>
                        <button onClick={()=>{history.push(`/request/${postId}`)}} >수정</button>
                    </div>
                    
                    <WhiteSpace>
                        {fileList.map((f,i)=>{
                            return (
                                <Frame key={i} >
                                    <Elpreview src={f}/>
                                </Frame>
                            )
                        })}
                    </WhiteSpace>

                </div>
            </div>
        </React.Fragment>
    )
}

const WhiteSpace = styled.div`
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display:none;
    }
    padding: 0 4px 0 0;
`;

const Elpreview = styled.img`
    width: 5rem;
    height: 5rem;
`

const Frame = styled.div`
    display: inline-block;
    position: relative;
    width: 5rem;
    height: 5rem;
    padding: 0 2px;
`;

export default RequestContents;