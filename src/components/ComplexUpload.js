import React, { useState } from "react";
import ReactPlayer from "react-player";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const ComplexUpload = (props) => {
    const [preview,setPreview] = useState([]);
    const files = useSelector(state => state.image.files);
    const dispatch = useDispatch();

    const previewmake = async (event) => {
        const file = event.target.files[0];
        if(file){
            
            return
        }
        console.log('안들어옴')
    }

    return (
        <React.Fragment>
              <div style={{width:'80%', margin:'0 auto', padding:'4px'}} >
                {/* 이미지 업로드 버튼 */}
                <Grid width='auto'>
                    <label htmlFor='upload'
                    style={{width:'75px',height:'75px',border:'1px solid black',display:'block'}}
                    >+</label>
                    <input onChange={previewmake} id='upload' type='file' accept='image/*, video/*' style={{display:'none'}} />
                </Grid>
                
                {/* 이미지 리스트 정리 */}
                <Grid width='60%'>
                    {preview.map((p,i)=>{
                        const is_data = p.split(':')[0] === 'data' ? true : false;
                        if(is_data){
                            return (<Eldiv key={i} url={p} ></Eldiv>)
                        }
                        return (<ReactPlayer style={{display:'inline-block',margin:'0 4px'}} url={p} key={i} width='75px' height='75px' playing={true} muted={true} />)
                    })}
                </Grid>

            </div>     
        </React.Fragment>
    )
}

const Grid = styled.div`
    width: ${props => props.width};
    display: inline-block;
    padding: 4px;
    white-space: nowrap;
    overflow-x: scroll;
`;

const Eldiv = styled.div`
    width: 75px;
    height: 75px;
    margin: 0 4px;
    border-radius: 8px;
    display: inline-block;
    background-image: url(${props => props.url});
    background-size: cover;
`

export default ComplexUpload;