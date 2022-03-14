import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import Slider from "react-slick";

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
				<h2>Center Mode</h2>
				<Slider {...settings}>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Slider>
			</div>
		);
};

const cssstyle = `
.container {
  margin: 0 auto;
  width: 100%;
}
h3 {
    background: #5f9ea0;
    height: 13rem;
    width: 13rem;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    right: -1rem; 
    text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
.center .slick-center h3 {
    color: #e67e22;
    opacity: 1;
    -ms-transform: scale(1.2);
    transform: scale(1.2);
}
.center h3 {
    transition: all .3s ease;
}
`

export default Banner;