import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import React, { useRef } from "react";
import Slider from "react-slick";
import { shortsActions } from "../redux/modules/shorts";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player';
import { history } from "../redux/configureStore";
import Header from "../components/Header";
import ProfileImg from "../elements/ProfileImg";

const Shorts = (props) => {
    const dispatch = useDispatch();
    const slider = useRef();
    const player = useRef();

    const [play, setPlay] = React.useState(false);
    const [lastpg, setLastpg] = React.useState(false);

    React.useEffect(() => {
        console.log('유즈이펙트');
        dispatch(shortsActions.getShort());
    }, []);

    
    const items = useSelector((state) => state.shorts.shortsList);
    console.log(items);

    const settings = {
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: () => {
            console.log('바뀌기전~')
            if(player.current.props.idx < items.length - 1) {
              setLastpg(false); 
            }
        },
        afterChange: () => { 
            setPlay(true);
            console.log('바뀌고나서~');
            if(player.current.props.idx === items.length - 1) {
              setLastpg(true);
            }
            if(player.current.props.idx < items.length - 1) {
              setLastpg(false); 
            }
          },
        onEdge: () => {
          window.location.reload();
          // 맨앞으로 이동
          // 배열 length만큼 초고속으로 계속 앞으로가
          // dispatch(shortsActions.getShort());
          // slider.current.slick(0);
        }
    };

    const handleVideo = () => {
      console.log('영상끝');
      setTimeout(() => {
          slider.current.slickNext();
        }, 1000);
    }

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
                <div key={idx}>
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
                    {lastpg && 
                      <div>
                        {/* 목록에 있는 영상을 다 보셨습니다 옆으로 넘기면 갱신됩니다! */}
                      </div>
                    }
                <TitleWrap>
                  <Title onClick={() => history.push(`/answerdetail/${item.answerId}`)}>{item.title}</Title> 
                  <div style={{display: 'flex', paddingTop:'1rem'}}>
                    <ProfileImg shape='circle' size='40px' src='https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800'/>
                    <div style={{ padding: '0.6rem 0.7rem'}}>{item.nickname}</div>
                  </div>
                </TitleWrap>
                </div>
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
  /* position: relative; */
`;

const StyledSlider = styled(Slider)`

`;

const TitleWrap = styled.div`
  margin: ${({ theme }) => theme.paddings.default};
  color: #fff;
`;

const Title = styled.div`
  font-family: 'Noto-Sans-KR-M';
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ImageContainer = styled.div`
  /* background-color: red; */
  height: 80vh;
  padding: 45% 0px;
`;
  
export default Shorts;