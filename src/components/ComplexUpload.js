import React from "react";
import ReactPlayer from "react-player";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ComplexUpload = (props) => {
    const preview = useSelector(state => state.image.preview);
    const files = useSelector(state => state.image.files);
    const dispatch = useDispatch();

    const previewmake = (event) => {
        const file = event.target.files[0];
        const _type = file.type.split('/')[0];
        console.log(_type);
        if(_type === 'image'){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const pre = reader.result;
                dispatch(imgActions.setFiles(file));
                dispatch(imgActions.setPreview(pre));
            }
            return
        }
        if(_type === 'video'){
            const pre = URL.createObjectURL(file);
            dispatch(imgActions.setFiles(file));
            dispatch(imgActions.setPreview(pre));
            return
        }
        window.alert('올바른 형식의 데이터가 아닙니다.')
    }

    console.log(preview,files);

    return (
        <React.Fragment>
          <div style={{width:'100%', padding:'8px', display:'flex', justifyContent:'center', alignItems:'center'}} >  
            <Ellabel htmlFor="complex" >+</Ellabel>
            <input onChange={previewmake} id='complex' type='file' accept='image/*, video/*' style={{display:'none'}} />
          </div>
            {preview.map((p,i)=>{
                const _type = files[i].type.split('/')[0];
                if(_type === 'image'){
                    return(<div style={{padding:'0 8px'}} key={i} >
                        <Elpre url={p} />
                    </div>) 
                }
                return (
                    <ReactPlayer src={p} />
                )
            })}            
        </React.Fragment>
    )
}

const Ellabel = styled.label`
    display: block;
    margin: 0;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 40px;
    border: solid 2px black;
    border-radius: 8px;
    box-sizing: 'border-box;
`;

const Elpre = styled.div`
    width: 100px;
    height: 100px;
    border: solid 2px black;
    border-radius: 8px;
    box-sizing: 'border-box;
    background-image: url(${props => props.url});
    background-size: cover;
`

export default ComplexUpload;