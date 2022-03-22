import React,{ useState, useRef } from 'react';

import Header from '../components/Header';
import ImageDetail from '../components/ImageDetail';

import Slider from 'react-slick';

import styled from 'styled-components';

import { imgActions } from '../redux/modules/image';
import { useDispatch, useSelector } from 'react-redux';

const ImageViewer = (props) => {
    const dispatch = useDispatch();
    
    const url ='https://image.utoimage.com/preview/cp872655/2017/08/201708004472_500.jpg';


    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            dispatch(imgActions.setIdx(next));
        }
    };

    const index = useSelector((state)=>state.image.idx);
    console.log(index);

    return(
        <React.Fragment>
        <Header/>
		<style>{cssstyle}</style>
            <Slider {...settings}>
                {[url,url,url,url,url].map((u,i)=>{
                    return (
                    <Grid key={i} >
                        <div>
                            <ImageDetail
                                idx={i} 
                                src={u}
                                />
                        </div>
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