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

    React.useEffect(() => {
        dispatch(utilActions.getSurveyResult())
    }, []);

    const { hippoName, imgUrl, surveyResult } = useSelector((state)=>state.util.result);
    const recommend = useSelector((state)=>state.util.recommend);

    console.log(recommend);

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
