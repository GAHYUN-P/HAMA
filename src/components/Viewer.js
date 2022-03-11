import React from "react";

import ReactPlayer from "react-player";

import styled from "styled-components";

const Viewer = (props) => {
    let { fileList, video, is_answer, videoRef } =props

    // 요청글일 경우 보여주는 뷰어
    if(!is_answer){
        return(
            <ViewContainer>
                {fileList.map((f,i)=>{
                    return(<ImgBox src={f} key={i} />)
                })}
            </ViewContainer>
        )
    }

    // 답변글이라면 대표 이미지 또는 영상을 설정 
    // 만일 비디오가 없다면 이미지 리스트는 첫 번째 제외
    // 오류발생 답변글에 이미지와 영상 둘 다 없는 경우 발생 
    // 대표 이미지에 undefined 주소가 들어가서 망가짐

    if(!video && !fileList.length){
        return null
    }

    const mainFile = video ? video : fileList[0];
    fileList = video ? fileList : (fileList.filter((f,i)=>{return i !== 0}));
    
    return (
        <React.Fragment>
            <div style={{padding:'0 0 4px',width:'100%',margin:'0 auto 5px'}} >
                <MainContainer>
                    {video ?
                     <ReactPlayer ref={videoRef} controls={true} width='100%' height='90%' url={mainFile} /> 
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