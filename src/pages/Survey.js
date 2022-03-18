import React, {useState} from 'react';
import { history } from '../redux/configureStore';
import { utilAPI } from '../shared/api';
import axios from 'axios';

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
      console.log(a);
      qSet(q+1);
      console.log(q);
      if(q === 9) {
        const res = await utilAPI.submitSurvey({result: a});
        console.log(res);
        history.push('/result');
      }
    }

  if(q===1) {
    return (
      <div>
        <div>일어나보니 오랜만에 깨끗한 하늘이 보인다면?</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>"화창한데 오늘 뭐하지?" 뭐할지 고민한다.</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>“기분 좋은 일들이 생길 것 같은 날이야!” 일단 기분이 좋다.</button>
      </div>
    );
  }

  if(q===2) {
    return (
      <div>
        <div>숲속으로 외출하기 전, </div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>생각나는 대로 챙겨 나간다.</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>미리 준비해둔 옷과 가방을 챙겨 나간다.</button>
      </div>
    );
  }

  if(q===3) {
    return (
      <div>
        <div>처음 온 숲속을 산책할 때,</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>지도를 한번 슥 보고 발길 닿는 대로 간다.</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>입구에 있는 지도를 보고 어디 갈지 무엇을 볼지 정한다.</button>
      </div>
    );
  }

  if(q===4) {
    return (
      <div>
        <div>귀여운 다람쥐들을 만난다면,</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>귀여워서 심멎이지만 멀리서 지켜본다.</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>처음 보는 동물들도 모두 친구 친구! 먼저 가서 반갑게 말건다.</button>
      </div>
    );
  }

  if(q===5) {
    return (
      <div>
        <div>다람쥐 친구가 피부병이 났다고 하소연을 했다.</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>“피부에 좋은 친환경 제품을 써보는 건 어때?” 해결방안을 제시한다.</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>“아프겠다...어떡해ㅠㅠㅠ” 같이 아픔에 공감해준다.</button>
      </div>
    );
  }

  if(q===6) {
    return (
      <div>
        <div>숲속 환경 문제로 급하게 동물 회의가 열렸다.</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>다른 동물들은 어떻게 생각하는지 먼저 들어본다.</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>그동안 내가 보고 느낀 것들을 적극적으로 설명한다.</button>
      </div>
    );
  }

  if(q===7) {
    return (
      <div>
        <div>질문7</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }

  if(q===8) {
    return (
      <div>
        <div>질문8</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }
  
  return (
    <div>
      <div>질문9</div>
      <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
      <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
    </div>
  );
  
};

export default Survey;