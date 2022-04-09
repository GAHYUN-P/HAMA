import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, {keyframes} from "styled-components";
import React, { useRef } from "react";
import Slider from "react-slick";
import { shortsActions } from "../redux/modules/shorts";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player';
import { history } from "../redux/configureStore";
import Header from "../components/Header";
import ProfileImg from "../elements/ProfileImg";
import { BiComment } from "react-icons/bi";
import { AiOutlineDoubleRight as DoubleArrow } from "react-icons/ai";


const Shorts = (props) => {
    const dispatch = useDispatch();
    const slider = useRef();
    const player = useRef();

    const [play, setPlay] = React.useState(false);
    const [firstpg, setFirstpg] = React.useState(true);

    // 비디오 리스트 불러오기
    React.useEffect(() => {
        console.log('유즈이펙트');
        dispatch(shortsActions.getShort());
    }, []);

    
    const items = useSelector((state) => state.shorts.shortsList);
    console.log(items);

    // react-slick slider Setting
    // 슬라이드가 바뀌고 나서 play라는 state를 true로
    // 만들어 주어 영상을 재생시킨다.
    const settings = {
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: () => {
            console.log('바뀌기전~')
            if(player.current.props.idx === 0) {
              setFirstpg(false); 
            }
        },
        afterChange: () => { 
            setPlay(true);
          },
        onEdge: () => {
          window.location.reload();
          // 맨앞으로 이동
        }
    };

    
    // React-player의 OnEnded라는 이벤트 리스너에
    // 영상이 끝나면 1초간 멈춘 후에 다음 페이지로 넘어가게 한다.
    const handleVideo = () => {
      console.log('영상끝');
      setTimeout(() => {
          slider.current.slickNext();
        }, 1000);
    }

    // play라는 status가 슬라이드가 바뀔때만 true가 되기때문에
    // 슬라이드가 넘어갈때부터 영상이 재생된다.
    const handlePlaying = () => {
      if(play === true) {
        return true;
      }
      return false;
    }

    const is_loading = useSelector((state) => state.shorts.is_loading);
    
    if(is_loading) {
      return (
        <Wrap>
          <Header />
          <Container>
          <StyledSlider {...settings} ref={slider}>
            {items.map((item, idx) => {
              return (
                <Map key={idx}>
                    <ImageContainer>
                        <ReactPlayer 
                            ref={player}
                            idx={idx}
                            url={item.videoUrl}
                            // controls
                            playing={handlePlaying}
                            muted={true}
                            width={'100%'}
                            height={'100%'}
                            onEnded={handleVideo}
                            />
                    </ImageContainer>
                {firstpg && 
                  <SlideGuide>
                    다음 영상 <StyledArrow/><StyledArrow/><StyledArrow/>
                  </SlideGuide>
                }
                <CommentWrap>
                  <Comment onClick={() => history.push(`/answerdetail/${item.answerId}`)}>
                    <BiComment style={{fontSize: '1.5rem', display:'inline-block'}}/>
                    <div style={{marginLeft: '3px'}}>{item.commentCnt}</div>
                  </Comment>
                </CommentWrap>
                <TitleWrap>
                  <Title onClick={() => history.push(`/answerdetail/${item.answerId}`)}>{item.title}</Title>
                  <NickWrap onClick={() => history.push(`/userpage/${item.userId}`)}>
                    <div style={{display: 'flex', paddingTop:'1rem'}}>
                      <ProfileImg shape='circle' size='40px' src={item.imgUrl}/>
                      <div style={{ padding: '0.6rem 0.7rem'}}>{item.nickname}</div>
                    </div>
                  </NickWrap> 
                </TitleWrap>
                </Map>
              );
            })} 
          </StyledSlider>
        </Container>
      </Wrap>
    );
    }

    return <></>;
};

const Wrap = styled.div`
  background-color: black;
  height: 100vh;
  width: 100wh;
`;

const Container = styled.div`

`;

const StyledSlider = styled(Slider)`
`;

const Map = styled.div`
  position: relative;
`;

const SlideGuide = styled.div`
  color: white;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  top: 20%;
  font-size: 2rem;
  margin: ${({ theme }) => theme.paddings.default};
`;

const StyledArrow = styled(DoubleArrow)`
  display: inline;
  vertical-align: text-bottom;
  margin-bottom: 5px;
`;

const CommentWrap = styled.div`
  margin: ${({ theme }) => theme.paddings.default};
  position: absolute;
  right: 0px;
  top: 0px;
`;


const Comment = styled.div`
  color: white;
  display: flex;
  font-size: 1.5rem;
  /* background-color: red; */
`;

const TitleWrap = styled.div`
  margin: ${({ theme }) => theme.paddings.default};
  color: #fff;
  width: 100wh;
`;

const move = keyframes`
	0% {
    left: 0px;
    opacity: 0.5;
  }
  50% {
    left: 3px;
    opacity: 1;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  70% {
    left: 3px;
    opacity: 0.8;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  100% {
    left: 0px;
    opacity: 0.5;
  }
`;

const Title = styled.div`
  font-family: 'Noto-Sans-KR-M';
  font-size: ${({ theme }) => theme.fontSizes.lg};
  animation: ${move} 1s 1s infinite;
`;

const NickWrap = styled.div`
   display: flex;
   justify-content : space-between;
   height: 50px;
   position: relative;
`;



const ImageContainer = styled.div`
  /* background-color: red; */
  height: 80vh;
  /* padding: 0% 0px; */
`;
  
export default Shorts;