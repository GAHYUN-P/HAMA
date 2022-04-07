import React from "react";

import { history } from "../redux/configureStore";

import ReactPlayer from "react-player";

import styled from "styled-components";

const Viewer = (props) => {
    let { fileList, video, is_answer, videoRef, type, id } =props

    // 이미지를 클릭하면 확대 페이지로 이동함
    const ToViewer = (e) => {
        // 타입과 아이디로 요청 또는 응답글의 이미지 리스트를
        // 요청할 수 있도록 만들어줌
        history.push(`/images/${type}/${id}`);
    }

    // 요청글일 경우 보여주는 뷰어
    if(!is_answer){
        return(
            <ViewContainer>
                {fileList.map((f,i)=>{
                    return(<ImgBox onClick={ToViewer} src={f} key={i} />)
                })}
            </ViewContainer>
        )
    }

    // 답변글이라면 대표 이미지 또는 영상을 설정 
    // 만일 비디오가 없다면 이미지 리스트는 첫 번째 제외
    // 오류발생 답변글에 이미지와 영상 둘 다 없는 경우 발생 
    // 대표 이미지에 undefined 주소가 들어가서 망가짐
    // 이를 해결하기위해 영상도 이미지도 없다면 null을 돌려준다.
    if(!video && !fileList.length){
        return null
    }

    // 답변글에서 영상이 있다면 영상이 영상이 없다면 이미지의 0번 인덱스의 사진이 
    // 큰 이미지로 보인다. 이를 정해주기 위한 조건식
    // 1. mainfile은 영상이 있다면 영상이 없다면 이미지 리스트의 0번 째 이미지
    const mainFile = video ? video : fileList[0];
    // 2. 이미지 리스트는 영상이 있다면 그대로지만 없다면 0번 째 인덱스를 제외해준다.
    fileList = video ? fileList : (fileList.filter((f,i)=>{return i !== 0}));
    
    return (
        <React.Fragment>
            <div style={{width:'100%'}} >
                <MainContainer>
                    {/* 영상이 있다면 리액트 플레이어를 없다면 이미지를 나타냄 */}
                    {video ?
                     <ReactPlayer ref={videoRef} controls={true} width='100%' height='90%' url={mainFile} /> 
                    : <MainImg onClick={ToViewer} src={mainFile} />}
                </MainContainer>
                <ViewContainer>
                    {fileList.map((f,i)=>{
                        return(<ImgBox onClick={ToViewer} index={i} src={f} key={i} />)
                    })}
                </ViewContainer>
            </div>
        </React.Fragment>
    )
}

const MainContainer = styled.div`
    width: 100%;
    height: 24rem;
    padding: 0 0 10px;
`;

const MainImg = styled.img`
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

const ViewContainer = styled.div`
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
`;

const ImgBox = styled.img`
    display: inline-block;
    width: 5rem;
    height: 5rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    margin-right: 0.18rem;
`;

export default Viewer;