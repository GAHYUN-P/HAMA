import styled from "styled-components";
import React from "react";

const ProfileImg = (props) => {
  //image category
  const { src } = props;

  //shape, size category
  const { shape, size, width, height, margin, position, bgColor } = props;

  //event category
  const { _onClick } = props;

  const {} = props;

  const styles = {
    src,
    size,
    width,
    height,
    margin,
    position,
    bgColor,
  };
  if (shape === "square") {
    return <ImageSquare onClick={_onClick} {...styles}></ImageSquare>;
  }
  if (shape === "imagePost") {
    return <ImagePost onClick={_onClick} {...styles}></ImagePost>;
  }
  if (shape === "circle") {
    return <ImageCircle onClick={_onClick} {...styles}></ImageCircle>;
  }
  return (
    <AspectOutter>
      <AspectInner onClick={_onClick} {...styles}></AspectInner>
    </AspectOutter>
  );
};

Image.defaultProps = {
  shape: null,
  src: "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
  size: "100",
  width: null,
  height: null,
  margin: "5px",
};

const ImageDefault = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  // border-top-left-radius ;
`;

const AspectOutter = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  min-width: 10px;
`;

const AspectInner = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
const ImageCircle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  position: ${(props) => props.position};
  background-color: ${(props) => props.bgColor};
  /* margin: 4px; */
`;
const ImagePost = styled.div`
  margin: 0px 15px;
  width: 150px;
  height: 70px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;
const ImageSquare = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  border: none;
  border-radius: 10px;
`;

export default ProfileImg;