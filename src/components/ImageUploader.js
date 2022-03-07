import React from "react";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const ImageUploader = (props) => {
    const dispatch = useDispatch();
    const inputRef = React.useRef();
    const preview = useSelector(state => state.image.preview);

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

    return (
        <React.Fragment>
            <div style={{padding:'8px 0', display:'flex'}} >
                <ElLabel htmlFor='imgup' >+</ElLabel>
                <input id='imgup' ref={inputRef} onChange={change}
                type='file' accept='image/*' 
                disabled={false} style={{display:'none'}} />
                <WhiteSpace>
                    {preview.map((p,i)=>{
                        return <Elpreview key={i} src={p} />
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
    width: 5rem;
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
    display: inline-block;
    width: 5rem;
    height: 5rem;
    padding: 0 2px;
`

export default ImageUploader;