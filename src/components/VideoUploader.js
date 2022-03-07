import React, { useState } from "react";
import ReactPlayer from "react-player";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const VideoUploader = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector(state => state.image.videoPreview);
    const videoRef = React.useRef();

    const change = () => {
        const file = videoRef.current.files[0];
        if(file){
            const prevideo = URL.createObjectURL(file);
            const data = {
                file,prevideo
            }
            dispatch(imgActions.setVideo(data));
            return
        }
        console.log('not get')
    }

    return(
        <React.Fragment>
            <div>
                <div style={{display:'flex', justifyContent:'space-between'}} >
                    <h3>동영상</h3>
                    <Ellabel htmlFor='videoupload' >업로드</Ellabel>
                    <input id='videoupload'
                    type='file' ref={videoRef}
                    accept='video/*'
                    onChange={change}
                    style={{display:'none'}}/>
                </div>
                <div style={{height:'15rem'}} >
                    <ReactPlayer url={preview} muted={true} playing={true} width='100%' height='80%' />
                </div>
            </div>
        </React.Fragment>
    )
};

const Ellabel = styled.label`
    width: auto;
    font-size: 0.7rem;
    background-color: #eee;
`;

export default VideoUploader;