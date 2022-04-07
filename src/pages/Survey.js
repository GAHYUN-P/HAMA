import React, {useState} from 'react';

import { history } from '../redux/configureStore';
import { utilAPI } from '../shared/api';

import ProgressBar from '../components/ProgressBar';

import { question, answer1, answer2 } from '../shared/surveyList';

import styled from 'styled-components';

const Survey = (props) => {
    //[a,aSet] 만들어서 답변하나 선택했을때
    //aSet에 신호를 준다
    // a로 리턴 바꿔가면서 준다
    const [q, qSet] = useState(1);
    const [a, aSet] = useState([]);

    const onClickHandler = async (e) => {
      if(e.target.value === '0') {
        a.push(0);
      } else {
        a.push(1);
      }
      if(q!==9){
        qSet(q+1);
      }

      if(q === 9) {
        const res = await utilAPI.submitSurvey({result: a});
        console.log(res);
        history.push('/result');
      }
    }

  
  return (
    <Grid>
      <ProgressBar q={q} />
      <Qrid>
        {/* Q1. */}
        <QNum>
          Q{q}.
        </QNum>
        {/* 질문 */}
        <QString>
          {question[q]}
        </QString>
        {/* 대답 1 */}
        <Btn onClick={(e) => { onClickHandler(e) }} value = '0'>
          {answer1[q]}
        </Btn>
        {/* 대답 2 */}
        <Btn onClick={(e) => { onClickHandler(e) }} value = '1'>
          {answer2[q]}
        </Btn>
      </Qrid>
    </Grid>
  );
  
};

const Grid = styled.div`
  padding: 0 ${({theme})=> theme.paddings.default};
`;

const Qrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

const QNum = styled.div`
  color: #fe6664;
  font-size: ${({theme})=> theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: 2rem;
`;

const QString = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 3.5rem;
  color: #212121;
  font-size: ${({theme})=> theme.fontSizes.lg};
  margin-bottom: ${({theme})=> theme.margins.divGap};
`;

const Btn = styled.button`
  width: 100%;
  height: 6rem;
  margin-bottom: ${({theme})=> theme.margins.xxxl};
  border-radius: .3rem;
  color: #212121;
  font-size: ${({theme})=> theme.fontSizes.small};
  &:active{
    background-color: #ff7a7a;
    color: #fff;
  }
`;

export default Survey;