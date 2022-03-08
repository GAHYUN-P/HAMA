import React from "react";

import ReactPlayer from "react-player";

import styled from "styled-components";

const Viewer = (props) => {
    let { fileList, video, is_answer, videoRef } =props

    if(!is_answer){
        return(
            <ViewContainer>
                {fileList.map((f,i)=>{
                    return(<ImgBox src={f} key={i} />)
                })}
            </ViewContainer>
        )
    }

    const mainFile = video ? video : fileList[0];
    fileList = video ? fileList : (fileList.filter((f,i)=>{return i !== 0}));
    
    return (
        <React.Fragment>
            <div style={{padding:'0 0 4px',width:'100%',margin:'0 auto 5px'}} >
                <MainContainer>
                    {video ?
                     <ReactPlayer controls={true} width='100%' height='90%' url={mainFile} /> 
                    : <MainImg src={mainFile} />}
                </MainContainer>
                <ViewContainer>
                    {fileList.map((f,i)=>{
                        return(<ImgBox src={f} key={i} />)
                    })}
                </ViewContainer>
            </div>
        </React.Fragment>
    )
}

const MainContainer = styled.div`
    width: 100%;
    height: 20rem;
    padding: 0 0 10px;
`;

const MainImg = styled.img`
    width: 80%;
    height: 100%;
    margin: 0 auto;
`;

const ViewContainer = styled.div`
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display:none;
    }
`;

const ImgBox = styled.img`
    display: inline-block;
    width: 5rem;
    height: 5rem;
    border: 1px solid #eee;
    box-sizing: border-box;
    margin: 0 4px;
`;

export default Viewer;