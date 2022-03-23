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
    background-color: white;
    display: relative;
`;

const Image = styled.img`
    width: 100%;
    background-color: white;
    display: inline-block;
    padding: 20% 0px;
`;


export default ImageDetail;