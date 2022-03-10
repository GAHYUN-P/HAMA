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
    React.useEffect(() => {
        dispatch(shortsActions.getShort());
    }, []);

    const items = useSelector((state) => state.shorts.shortsList);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 15000,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: () => {console.log('바뀌기전~')},
        afterChange: () => {console.log('바뀌고나서~')},
    };
        
    return (
        <Container>
          <h2> Single Item</h2>
          <StyledSlider {...settings}>
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                    <div>{item.title}</div> 
                    <ImageContainer>
                        <ReactPlayer 
                            url={item.videoUrl}
                            controls
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