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

    const 내용 = '큰 걱정없이 언제나 모든일을 해결하는 당신은 세상 시원시원한 하마 당신이 곁에만 있다면 언제나 답을 찾아줄 것을 알기에 도움이 필요한 이들의 구세주!!'

  return (
    <Grid>
      <Head>
        <button onClick={()=>{history.replace('/')}} >닫기</button>
      </Head>
      {/* 내용 */}
      <ContentGrid>
        <div id='res' >나의 결과는?</div>
        <div id='hame' >{hippoName}</div>
        <img id='img' src={surveyResult} />
        {/* {surveyResult} */}
        <div id='con' >{내용}</div>
      </ContentGrid>
      {/* 추천 */}
      <Recomment>
        <div id='exp' >이런 도움이 적합한 하마입니다!</div>
        {[1,2].map((n,i)=>{return(<RecommendCard {...n} />)})}
      </Recomment>
      {/* 버튼들 */}
      <ResultBtns />
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
