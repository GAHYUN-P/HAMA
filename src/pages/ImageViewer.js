import React from 'react';

import Header from '../components/Header';
import ImageDetail from '../components/ImageDetail';
import WaitForAMoment from '../components/WaitForAMoment';

import Slider from 'react-slick';

import styled from 'styled-components';

import { imgActions } from '../redux/modules/image';
import { useDispatch, useSelector } from 'react-redux';

const ImageViewer = (props) => {
    const dispatch = useDispatch();

    // image, index 불러오기
    const { viewerImages, idx } = useSelector((state)=>state.image)
    const { type,id } = props.match.params;

    React.useEffect(()=>{
       if(!viewerImages){
            dispatch(imgActions.getImagesDB({type,id}))
        }
        return()=>{
            dispatch(imgActions.reset());
        }
    },[])
    
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            dispatch(imgActions.setIdx(next));
        }
    };

    if(!viewerImages){
        return(
            <WaitForAMoment is_loading />
        )
    }

    console.log(idx);

    return(
        <React.Fragment>
        <Header length={viewerImages.length} index={idx} />
		<style>{cssstyle}</style>
            <Slider {...settings}>
                {viewerImages.map((u,i)=>{
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

const cssstyle = `
#box {
	display: block;
    height: 100%;
    width: 100%;
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