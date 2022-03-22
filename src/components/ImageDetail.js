import React,{ useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imgActions } from '../redux/modules/image';

import Header from './Header';

import Slider from 'react-slick';

import styled from 'styled-components';



const ImageDetail = (props) => {
    const dispatch = useDispatch();

    return(
        <Container>
            {/* <Header idx={props.idx}/> */}
            <Image src={props.src}/>
        </Container>
    )
};

const Container = styled.div`
    /* background-color: black; */
    width: 100vw;
    height: 100vh;
    background-color: black;
`;

const Image = styled.div`
    background-image: url("${(props) => props.src}");
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: relative;
    top: 28%;
    background-color: black;
`;


export default ImageDetail;