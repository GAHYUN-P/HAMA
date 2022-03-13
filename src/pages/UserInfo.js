import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userActions } from '../redux/modules/user';
import { userAPI } from '../shared/api';

import Header from '../components/Header';

const UserInfo = (props) => {
  
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [interest, setInterest] = useState();


  const nicknameInput = (e) => {
    setNickname(e.target.value);    
  }

  const genderInput = (e) => {
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
      <input onChange={nicknameInput}/>
      <input onChange={genderInput}/>
      <input onChange={ageInput}/>
      <input onChange={interestInput}/>
      <button onClick={onClickSubmit}>submit</button>
    </div>
  );
};

export default UserInfo;
