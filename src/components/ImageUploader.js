import React from "react";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

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
                <ElLabel htmlFor='imgup' >+</ElLabel>
                <input id='imgup' ref={inputRef} onChange={!is_edit ? change : edit}
                type='file' accept='image/*' 
                disabled={uploading} style={{display:'none'}} />
                <WhiteSpace>
                    {preview.map((p,i)=>{
                        return (
                            <Frame key={i} >
                                <Elpreview src={p}/>
                                <Elex onClick={()=>{dispatch(imgActions.delImage(i))}} >x</Elex>
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
    width: 6rem;
    height: 5rem;
    background-color: #ddd;
    border-radius: 0.3rem;
    &:active{
        background-color: coral;
    }
`;

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

const Elex = styled.div`
    font-size: 0.75rem;
    font-weight: 600;
    color: #000;
    width: 1rem;
    height: 1rem;
    line-height: 0.7rem;
    text-align: center;
    border: 1px solid #000;
    border-radius: 1rem;
    background-color: #fff;
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    box-sizing: border-box;
`;

export default ImageUploader;