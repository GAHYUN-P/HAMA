import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userActions } from '../redux/modules/user';
import { userAPI } from '../shared/api';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Header from '../components/Header';

const UserInfo = (props) => {
  
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [interest, setInterest] = useState();


  const nicknameInput = (e) => {
    console.log(e.target.value);
    setNickname(e.target.value);    
  }

  const genderInput = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);    
  }

  const ageInput = (e) => {
    setAge(e.target.value);    
  }

  const interestInput = (e) => {
    setInterest(e.target.value);    
  }
  
  const data = {
    category: interest,
    gender: gender,
    age: age,
    nickname: nickname
  }
  

  const onClickSubmit = async () => {
    const res = await userAPI.userInfo(data);
  }

  return (
    <div>
      <Header />
      <div>
        <div>성별 및 나이</div>
          <div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={gender||''}
                  onChange={(e) => { genderInput(e) }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    선택해주세요
                  </MenuItem>
                  <MenuItem value={'남'}>남</MenuItem>
                  <MenuItem value={'여'}>여</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <input 
                onChange={ageInput}
                placeholder='입력해주세요'/>  
            </div>
          </div>
      </div>

      <div>
        <div>닉네임 설정</div>
        <div>
          <input onChange={nicknameInput}/>
          <button>중복확인</button>
        </div>
      </div>
      
      <div>
        <div>관심사 설정</div>
        <div>*나의 최초 전문으로 지정할 한 가지 분야를 선택해주세요</div>
        <div></div>
      </div>
      
      <button onClick={onClickSubmit}>submit</button>
    </div>
  );
};

export default UserInfo;
