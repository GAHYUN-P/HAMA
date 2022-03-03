import React, {useState} from 'react';
import { history } from '../redux/configureStore';
import { utilAPI } from '../shared/api';

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
      if(q === 8) {
        const res = await utilAPI.submitSurvey({result: a});
        console.log(res);
        // history.push('/result');
      }
    }

  if(q===1) {
    return (
      <div>
        <div>질문1</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }

  if(q===2) {
    return (
      <div>
        <div>질문2</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }

  if(q===3) {
    return (
      <div>
        <div>질문3</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }

  if(q===4) {
    return (
      <div>
        <div>질문4</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }

  if(q===5) {
    return (
      <div>
        <div>질문5</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
      </div>
    );
  }

  if(q===6) {
    return (
      <div>
        <div>질문6</div>
        <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
        <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
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
  
  return (
    <div>
      <div>질문8</div>
      <button onClick={(e) => { onClickHandler(e) }} value = '0'>응답1</button>
      <button onClick={(e) => { onClickHandler(e) }} value = '1'>응답2</button>
    </div>
  );
  
};

export default Survey;