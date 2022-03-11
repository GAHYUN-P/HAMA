import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import React, { useRef } from "react";
import Slider from "react-slick";
import { shortsActions } from "../redux/modules/shorts";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player';
import { history } from "../redux/configureStore";

const Test = (props) => {
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
        <Container>
          <h2> Single Item</h2>
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
                            width={'800px'}
                            height={'500px'}
                            onEnded={handleVideo}
                            />
                    </ImageContainer>
                    <div>
                      <div onClick={() => history.push(`/answerdetail/${item.answerId}`)}>{item.title}</div> 
                      <div>{item.profileUrl} | {item.nickname}</div> 
                    </div>
                </div>
              );
            })} 
          </StyledSlider>
          {lastpg && 
            <div>
              목록에 있는 영상을 다 보셨습니다 옆으로 넘기면 갱신됩니다!
            </div>
            }
        </Container>
    );
    }

    return <></>;
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