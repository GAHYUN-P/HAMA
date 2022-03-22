import React,{ useState, useRef } from 'react';

import Header from '../components/Header';

import Slider from 'react-slick';

import styled from 'styled-components';

const ImageViewer = (props) => {
    const ref= useRef();
    const [num,setNum] = ('1');
    const url ='https://image.utoimage.com/preview/cp872655/2017/08/201708004472_500.jpg';

    const change = () => {
        
    }

    return(
        <React.Fragment>
        <Header  />
		<style>{cssstyle}</style>
            <Slider >
                {[url,url,url,url,url].map((u,i)=>{
                    return (
                    <Grid key={i} >
                        <Img ref={ref} src={url} idx={i} id='box'/>
                    </Grid>
                    )
                })
                }
            </Slider>
        </React.Fragment>
    )
};

const  Grid = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

const Img = styled.img`

`;

const cssstyle = `
#box {
	display: block;
    height: 50%;
    width: 100%;
    margin-top: 4rem;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
.slick-list:focus {
    outline: none;
}
.center .slick-center #box {
    color: #e67e22;
    opacity: 1;
}
.center #box {

}
`;

export default ImageViewer;