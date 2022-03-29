import React from "react";

import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import picture from '../assets/picture.svg';

import styled from "styled-components";

const ImageUploader = (props) => {
    const dispatch = useDispatch();
    // 인풋에 들어오는 데이터를 감지하기위한 ref
    const inputRef = React.useRef();
    // 인풋에 넣어놓은 데이터를 다루기 위한 스테이트들
    const { preview, uploading, count } = useSelector(state => state.image);
    // 수정페이지에서 넘겨받는 props로 업로드 시 발생하는 함수를 바꿔주기 위함
    const is_edit = props.is_edit;

    // 작성 시 인풋의 이미지 업로드 시 발생하는 함수
    const change = () => {
        // 사진 갯수제한 현재 올라와 있는 갯수에 따라 업로드 가능한 이미지를 알려줌
        if(inputRef.current.files.length > count){
            window.alert(`현재 업로드 가능한 이미지는 ${count}장 입니다.`)
            return
        }
        // 파일은 객체로 담겨 있기에 이를 배열로 다루기위한 공정과정
        const file = [...inputRef.current.files];

        if(file){
            // 이미지를 올리는 버튼을 disabled하기위한 디스패치를 작동
            dispatch(imgActions.uploading());
            // 이미지의 갯수만큼 반복하여 프리뷰를 만들어줌
            file.map( async (f) =>{
                const reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onloadend = () => {
                    const data = {file: f,preview: reader.result}
                    dispatch(imgActions.setImage(data)); 
                }
                return f
            })
            // 만일 현재 남은 업로드 가능한 프리뷰의 갯수가 0이 아니라면
            // disabled시켜주는 스테이트를 다시 해제하기위한 디스패치를 보냄
            if(count !== 0){
                dispatch(imgActions.uploading());
            }
            // 같은 이미지 또는 기존에 있는 이미지가 배열에 있으면 업로드가 안됨
            // 따라서 그러한 경우를 방지하기 위하여 다시 인풋을 비워줌
            inputRef.current.value = '';
            return
        }
        console.log('Not get')
    }

    const edit = () => {
        const file = inputRef.current.files[0];
        if(file){
            dispatch(imgActions.uploading());
            const formdata = new FormData();
            formdata.append('file',file);
            formdata.append('video',null);
            dispatch(imgActions.uploadToDB(formdata));
            if(count !== 0){
                dispatch(imgActions.uploading());
            }
            return
        }
        console.log('Not get')
    }
    
    React.useEffect(()=>{
        return()=>{
            dispatch(imgActions.reset());
        }
    },[])


    return (
        <React.Fragment>
            <div style={{padding:'8px 0', display:'flex'}} >
                <ElLabel htmlFor='imgup'><UpImg src={picture} /></ElLabel>
                <input id='imgup' ref={inputRef} onChange={!is_edit ? change : edit}
                type='file' accept='image/*' multiple={!is_edit}
                disabled={uploading} style={{display:'none'}} />
                {preview &&
                <WhiteSpace>
                    {preview.map((p,i)=>{
                        return (
                            <Frame key={i} >
                                <Elpreview src={p}/>
                                <Elex onClick={()=>{dispatch(imgActions.delImage(i))}} >
                                    <SlashL/>
                                    <SlashR/>
                                </Elex>
                            </Frame>
                        )
                    })}
                </WhiteSpace>}
            </div>
        </React.Fragment>
    )
};

const ElLabel = styled.label`
    display: inline-block;
    width: 10.3rem;
    background-image: url(${props => props.url});
    background-size: cover;
`;

const UpImg = styled.img`
    width: 100%;
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