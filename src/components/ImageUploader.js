import React from "react";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import picture from '../assets/picture.svg';

import styled from "styled-components";

const ImageUploader = (props) => {
    const dispatch = useDispatch();
    const inputRef = React.useRef();
    const preview = useSelector(state => state.image.preview);
    const uploading = useSelector(state => state.image.uploading);
    const is_edit = props.is_edit;

    const change = () => {
        const file = inputRef.current.files[0];
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const data = {
                    file: file,
                    preview: reader.result
                }
                dispatch(imgActions.setImage(data));
            }
            return
        }
        console.log('Not get')
    }

    const edit = () => {
        console.log('edit')
        const file = inputRef.current.files[0];
        if(file){
            const formdata = new FormData();
            formdata.append('file',file);
            formdata.append('video',null);
            dispatch(imgActions.uploadToDB(formdata));
            return
        }
        console.log('Not get')
    }

    return (
        <React.Fragment>
            <div style={{padding:'8px 0', display:'flex'}} >
                <ElLabel htmlFor='imgup' url={picture} />
                <input id='imgup' ref={inputRef} onChange={!is_edit ? change : edit}
                type='file' accept='image/*' 
                disabled={uploading} style={{display:'none'}} />
                <WhiteSpace>
                    {preview.map((p,i)=>{
                        return (
                            <Frame key={i} >
                                <Elpreview src={p}/>
                                <Elex onClick={()=>{dispatch(imgActions.delImage(i))}} >
                                    <SlashL />
                                    <SlashR />
                                </Elex>
                            </Frame>
                        )
                    })}
                </WhiteSpace>
            </div>
        </React.Fragment>
    )
};

const ElLabel = styled.label`
    display: inline-block;
    text-align: center;
    line-height: 5rem;
    width: 10.3rem;
    height: 7.5rem;
    background-image: url(${props => props.url});
    background-size: cover;
`;

const WhiteSpace = styled.div`
    display: inline-block;
    width: 100%;
    height: 7.8rem;
    white-space: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display:none;
    }
`;

const Elpreview = styled.img`
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 0.3rem;
`

const Frame = styled.div`
    display: inline-block;
    position: relative;
    width: 7.5rem;
    height: 7.5rem;
    margin: 0 4px;
`;

const Elex = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: rgba(245,245,245,0.77);
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    box-sizing: border-box;
`;

const SlashL = styled.div`
    width: 0.65rem;
    border: 0.05rem solid #9e9e9e;
    border-radius: 0.65rem;
    background-color: #9e9e9e;
    transform: rotate(45deg);
    position: absolute;
    right: 0.165rem;
    top: 0.435rem;
`;

const SlashR = styled.div`
    width: 0.65rem;
    border: 0.05rem solid #9e9e9e;
    border-radius: 0.65rem;
    background-color: #9e9e9e;
    transform: rotate(135deg);
    position: absolute;
    right: 0.165rem;
    top: 0.435rem;
`;

export default ImageUploader;