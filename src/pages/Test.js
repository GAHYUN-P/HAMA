import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import React, { Component } from "react";
import Slider from "react-slick";
import { shortsActions } from "../redux/modules/shorts";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player';

const Test = (props) => {
    const dispatch = useDispatch();
    const idx = useSelector((state) => state.shorts.idx);

    React.useEffect(() => {
        console.log('유즈이펙트');
        dispatch(shortsActions.getShort());
    }, []);

    
    const items = useSelector((state) => state.shorts.shortsList);
    console.log(items);
    const is_loading = useSelector((state) => state.shorts.is_loading);
    
    const item_list = items.slice(-3);
    console.log(item_list);


    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: () => {
            dispatch(shortsActions.setIdx(idx + 1));
            console.log('바뀌기전~'+idx);
            if(idx===2){
                dispatch(shortsActions.setIdx(0));
                dispatch(shortsActions.addShort());
            }
        },
        afterChange: () => {    
            console.log('바뀌고나서~' + idx)},
    };

    
    
    return (
        <Container>
          <h2> Single Item</h2>
          <StyledSlider {...settings}>
            {item_list.map((item, idx) => {
              return (
                <div key={idx}>
                    <div>{item.title}</div> 
                    <ImageContainer>
                        <ReactPlayer 
                            url={item.videoUrl}
                            controls
                            playing={true}
                            muted={true}
                            width={'800px'}
                            height={'500px'}/>
                    </ImageContainer>
                </div>
              );
            })}
          </StyledSlider>
        </Container>
    );
};

const Container = styled.div`
  overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
max-width:100%;
max-height:100%;
`;
  
export default Test;