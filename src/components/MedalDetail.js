import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../elements/ProfileImg';

const MedalDetail = (props) => {

    // Mypage에서 Medal을 map을 돌려
    // value값에 따라서 return을 해줘 매달 색칠 아니면 색칠 ㄴㄴ로
    console.log(props);
    const idx = props.idx;

    const imgArr = [
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/me.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/satisfied.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/inquire.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/congratu.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/analyze.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/reaction.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/search.png',
      'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/moreeffort.png',
    ];

    const achievementName = [
        '내가HAMA', '만족HAMA', '잘부탁HAMA', '축하HAMA', '분석HAMA', '리액션HAMA', '서치HAMA', '더노력HAMA'
    ];

    const achievementContent = [
        '최초로 답변을 남겼습니다!',
        '최초로 답변에 만족도 평가를 남겼습니다!', 
        '최초로 요청을 작성하셨습니다!', 
        '최초로 5점 만족도를 받으셨습니다!', 
        '최초로 하마 테스트를 완료하셨습니다!', 
        '최초로 답변에 만족도 평가를 남기셨습니다!', 
        '최초로 검색을 하셨습니다!', 
        '최초로 1점 만족도를 받으셨습니다ㅠㅠ!'
    ];

    const blackImgArr = [
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/me0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/satisfied0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/inquire0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/congratu0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/analyze0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/reaction0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/search0.png',
        'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/effort0.png',
    ];
    
  
  if(props.value === 0) {
    return (
      <Wrap>
        <Contain>
          <ProfileImg shape='circle' size='5rem' src={blackImgArr[idx]}/>
          <TitleWrap>
              <Name>{achievementName[idx]}</Name>
              <Contents>{achievementContent[idx]}</Contents>
          </TitleWrap>
        </Contain>
      </Wrap>
    );
  }

  return (
    <Wrap>
        <Contain>
          <ProfileImg shape='circle' size='5rem' src={imgArr[idx]}/>
          <TitleWrap>
              <Name>{achievementName[idx]}</Name>
              <Contents>{achievementContent[idx]}</Contents>
          </TitleWrap>
        </Contain>
    </Wrap>
  );
};

const Wrap = styled.div`
    width: 100%;
    margin: 0.5rem 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px 2px rgba(0, 0, 0, 0.08);
`;

const Contain = styled.div`
    padding: 0.5rem 0px;
    margin: 0px 1rem;
    display: flex;
`;

const TitleWrap = styled.div`
    width: 60%;
    padding: 1rem 1rem;
`;

const Name = styled.div`
    font-family: 'Noto-Sans-KR-M';
    font-weight: 550;
    padding-bottom: 0.2rem;
`;

const Contents = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.small};;
`;

export default MedalDetail;
