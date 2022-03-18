import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import Slider from "react-slick";
import bannerBackground from '../assets/bannerBackground.svg';
import vector9 from '../assets/vector9.svg';

import ban_1 from '../assets/banner_1.png';
import ban_2 from '../assets/banner_2.png';
import ban_3 from '../assets/banner_3.png';
import ban_4 from '../assets/banner_4.png';

const Banner = (props) => {

  const settings = {
    className: "center",
		centerMode: true,
		infinite: true,
		centerPadding: "80px",
		slidesToShow: 1,
		speed: 500
  } 

  return (
    <div className="container">
		<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
		<style>{cssstyle}</style>
		<StyledSlider {...settings}>
			<div>
				<BannerBox id='banner_box' src={ban_1} />
			</div>
			<div>
				<BannerBox id='banner_box' src={ban_2} />
			</div>
			<div>
				<BannerBox id='banner_box' src={ban_3} />
			</div>
			<div>
				<BannerBox id='banner_box' src={ban_4} />
			</div>
		</StyledSlider>
		<Shade src={vector9}/>
	</div>
	);
};

const cssstyle = `
.container {
  margin: 0 auto;
  width: 100%;
  height: 18rem;
  position: relative;
  background: linear-gradient(rgba(245, 245, 245, 1) 80%, #fff 10%);
  z-index: 0;
}
#banner_box {
	display: block;
    height: 13rem;
    width: 13rem;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 3.5rem 10px 10px 10px;
    padding: 2%;
    position: relative;
    right: -1rem; 
    text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
.center .slick-center #banner_box {
    color: #e67e22;
    opacity: 1;
    -ms-transform: scale(1.2);
    transform: scale(1.2);
}
.center #banner_box {
    transition: all .3s ease;
}
`;


const BannerBox = styled.img`
`;

const Shade = styled.img`
	position: absolute;
	width: 22rem;
	height: 4rem;
	left: 2rem;
	bottom: -0.5rem;
	z-index: 0;
	;
`;

const StyledSlider = styled(Slider)`
    z-index: 1;
`;

export default Banner;