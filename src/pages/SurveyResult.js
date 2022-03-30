import React from 'react';

import { utilAPI } from '../shared/api';
import { utilActions } from '../redux/modules/util';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

import RecommendCard from '../components/RecommendCard';
import ResultBtns from '../components/ResultBtns';

import styled from 'styled-components';

const SurveyResult = (props) => {
    // 데이터 불러와서 깔때 util.js에
    // thunk 만들어서 깔아주면 될듯?!
    const dispatch = useDispatch();

    // 설문조사 검색결과를 가져오는 함수 따로 보내는 데이터가 
    // 없는 이유는 해당 유저가 설문을 마친 시점에서 결과가 유저별로 
    // 고정이 되기 때문 따라서 유저의 토큰으로 해당 경로로 요청을 보내면
    // 해당하는 결과의 데이털르 받아옴
    React.useEffect(() => {
        dispatch(utilActions.getSurveyResult())
    }, []);

    // 검색결과들
    // hippoName: 해당유저의 하마 캐릭터의 이름
    // imgUrl: 해당 유저의 하마 캐릭터 이미지 주소
    // surveyResult: 해당 유저의 하마 캐릭터 설명 문구
    const { hippoName, imgUrl, surveyResult } = useSelector((state)=>state.util.result);
    // 해당 유저의 하마 캐릭터에게 추천하는 요청글 리스트(단 2 개임)
    const recommend = useSelector((state)=>state.util.recommend);

  return (
    <Grid>
      <Head>
        <button onClick={()=>{history.replace('/')}} >닫기</button>
      </Head>
      {/* 내용 */}
      <ContentGrid>
        <div id='res' >나의 결과는?</div>
        <div id='hame' >{hippoName}</div>
        <img id='img' src={imgUrl} />
        {/* {surveyResult} */}
        <div id='con' >{surveyResult}</div>
      </ContentGrid>
      {/* 추천 */}
      <Recomment>
        <div id='exp' >{hippoName}에게 추천하는 요청입니다.</div>
        {recommend.map((r,i)=>{return(<RecommendCard key={i} {...r} />)})}
      </Recomment>
      {/* 버튼들 */}
      <ResultBtns imgUrl={imgUrl} hippoName={hippoName} surveyResult={surveyResult} />
    </Grid>
  );
};

const Grid = styled.div`
  padding: 0 ${({theme})=> theme.paddings.default};
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding: ${({theme})=> theme.paddings.default} 0;
  button{
    font-size: ${({theme})=> theme.fontSizes.base};
    color: #666;
    background-color: #fff;
  }
`;

const ContentGrid = styled.div`
  width: 100%;
  padding: 3rem ${({theme})=> theme.paddings.default};
  div{
    display: flex;
    justify-content: center;
  }
  #res{
    color: #fe6664;
    font-size: ${({theme})=> theme.fontSizes.base};
  }
  #hame{
    margin-top: ${({theme})=> theme.margins.small};
    color: #212121;
    font-size: ${({theme})=> theme.fontSizes.xl};
  }
  #img{
    margin-top: ${({theme})=> theme.margins.xxxl};
    width: 100%;
    height: 14rem;
    background-color: #efefef;
  }
  #con{
    margin-top: ${({theme})=> theme.margins.xxxl};
    color: #666;
    line-height: 1.2rem;
    font-size: ${({theme})=> theme.fontSizes.small};
  }
`;

const Recomment = styled.div`
  width: 100%;
  #exp{
    color: #666;
    font-size: ${({theme})=> theme.fontSizes.base};
  }
`;

export default SurveyResult;
