import React, { useState } from "react";
import ReactPlayer from "react-player";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import pre_video from '../assets/video.svg'

import styled from "styled-components";

const VideoUploader = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector(state => state.image.videoPreview);
    const videoRef = React.useRef();
    const is_edit = props.is_edit;

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

    const edit = () => {
        const file = videoRef.current.files[0];
        if(file){
            const formdata = new FormData();
            formdata.append('file',null);
            formdata.append('video',file);
            dispatch(imgActions.uploadToVideo(formdata));
            return
        }
        console.log('not get')
    }

    return(
        <React.Fragment>
            <div>
                <div style={{display:'flex', justifyContent:'space-between'}} >
                    <Selections>동영상 등록</Selections>
                    {preview &&
                    <Ellabel htmlFor='videoupload' >변경</Ellabel>}
                    <input id='videoupload' type='file' ref={videoRef} accept='video/*' onChange={!is_edit ? change : edit} style={{display:'none'}}/>
                </div>
                <div style={{height:'11.3rem'}} >
                    {!preview &&
                    <ElLabel url={pre_video} htmlFor='videoupload'></ElLabel>}
                    {preview &&
                    <ReactPlayer url={preview} muted={true} playing={true} width='100%' height='100%' />}
                </div>
            </div>
        </React.Fragment>
    )
};

const Ellabel = styled.label`
    margin: 3rem 0 ${({theme})=>theme.paddings.small};
    display: display: block;
    width: auto;
    font-size: ${({theme})=> theme.fontSizes.base};
    color: #9e9e9e;
    background-color: #fff;
`;

const ElLabel = styled.label`
    display: block;
    background-image: url(${props => props.url});
    background-size: cover;
    border-radius: .3rem;
    width: 100%;
    height: 100%;
`;

const Selections = styled.div`
    margin: 3rem 0 ${({theme})=>theme.paddings.small};
    font-size: 1.15rem;
`;

export default VideoUploader;