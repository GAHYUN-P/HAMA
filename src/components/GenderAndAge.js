import React from "react";

import ToggleBox from '../components/ToggleBox';

import styled from 'styled-components';

const GenderAndAge = (props) => {
  // 나이와 성별의 스테이트를 프롭스로 받아와서 사용
    const { age, gender, setAge, setGender } = props;

    return(
        <GandA>
          <div>
            <InvidPart>성별</InvidPart>
            {/* 토글 박스에 다시금 넘겨주어 성별을 정하는 기능을 최종적으로 사용함 */}
            <ToggleBox gender={gender} setGender={setGender} />
          </div>
          <div>
            <InvidPart>나이</InvidPart>
            <AgeInput value={age} onChange={(e)=>{setAge(e.target.value)}} type='number' placeholder='입력해주세요' />
          </div>
        </GandA>
    )
}

const GandA = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10rem;
  align-items: center;
`;

const AgeInput = styled.input`
  display: block;
  width: 7rem;
  padding: .7rem .8rem;
  border: 1px solid #dcdcdc;
  border-radius: .3rem;
  outline: none;
`;

const InvidPart = styled.div`
  margin-bottom: .4rem;
`;

export default GenderAndAge;