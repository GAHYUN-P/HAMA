import React from "react";

import ToggleBox from '../components/ToggleBox';

import styled from 'styled-components';

const GenderAndAge = (props) => {
    const { age, gender, setAge, setGender } = props;

    return(
        <GandA>
          <div>
            <InvidPart>성별</InvidPart>
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