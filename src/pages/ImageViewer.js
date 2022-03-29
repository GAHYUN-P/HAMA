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
    // viewerImages: 요청 또는 답변글의 이미지 리스트를 가져옴
    // idx: 현재 보고있는 이미지의 인덱스를 나타냄
    const { viewerImages, idx } = useSelector((state)=>state.image)

    // type: 현재보고자 하는 리스트가 요청글인지 답변글인지 알게 해주는 params
    // id: 현재보고자 하는 리스트의 요청글이나 답변글의 아이디
    const { type,id } = props.match.params;

    React.useEffect(()=>{
        // 현재 리덕스 상에 viewerImages가 없다면 서버에 다시 요청을 넣어서
        // 데이터를 가져옴
       if(!viewerImages){
            dispatch(imgActions.getImagesDB({type,id}))
        }
        return()=>{
            // 다른 이미지가 남는 것 방지
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

    // 아직 이미지 리스트가 없을 때 보여줄 로딩창
    if(!viewerImages){
        return(
            <WaitForAMoment is_loading />
        )
    }

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