import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { userAPI } from '../shared/api';
import { history } from '../redux/configureStore';

import { getStatus, setFalse } from '../shared/cookie';
import { Categories, EngCategoryEncoder } from '../shared/categoryEncoder';
import { infoCheck } from '../shared/conditions';

import Header from '../components/Header';
import GenderAndAge from '../components/GenderAndAge';
import NickMaking from '../components/NickMaking';
import Tag from '../elements/Tag';
import CallNumber from '../components/CallNumber';

import styled from 'styled-components';

const UserInfo = (props) => {
  
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');
  const [phone, setPhone] = useState('');
  const [same, setSame] = useState('needCheck');

  React.useEffect(()=>{
    if(!getStatus()){
      window.alert('이미 등록하신 고객님이십니다. 변경을 원하시면 문의를 주세요.');
      history.replace('/')
      return
    }
  },[]);

  const sameCheck = () => {
    if(!nickname){
      window.alert('닉네임을 제대로 작성해주세요.');
      return
    }
    userAPI.sameCheck(nickname)
    .then(res=>{
      setSame(res.data.result);
    })
    .catch(err=>{console.log(err)});
  }

  const onClickSubmit = async () => {
    const data = {
      category: EngCategoryEncoder(interest),
      gender: gender,
      age: age,
      nickname: nickname,
      phone: phone,
    };
    
    // 데이터 체크 한 번 할 것
    if(infoCheck(data,same)){return};

    userAPI.userInfo(data)
    .then(()=>{
      setFalse()
      history.replace('/')
    })
    .catch(err=>{console.log(err)})
  }

  
  return (
  <React.Fragment>
    <Header />
    <Grid>
      <IndiviInfo>성별 및 나이</IndiviInfo>
      <GenderAndAge age={age} gender={gender} setGender={setGender} setAge={setAge} />
    </Grid>
      <IndiviInfo>닉네임 설정</IndiviInfo>
      <NickMaking nickname={nickname} same={same} setSame={setSame} sameCheck={sameCheck} setNickname={setNickname} />
    <Grid>
      <IndiviInfo>전화번호</IndiviInfo>
      <CallNumber phone={phone} setPhone={setPhone} />
    </Grid>
    <Grid>
      <IndiviInfo>관심사 설정</IndiviInfo>
      <SmallAlert>*나의 전문으로 지정할 한 가지 분야를 선택해주세요.</SmallAlert>
      { Categories.map((c,i)=>{return(<Tag key={i} tag={interest} _onClick={(e)=>{setInterest(e.target.innerHTML)}}>{c}</Tag>)}) }
    </Grid>
    <Fang />
    <SubmitBtn onClick={onClickSubmit} >다음</SubmitBtn>
  </React.Fragment>
  );
};

const Grid = styled.div`
  padding: 0 2.5rem;
`;

const IndiviInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  aling-items: center;
  font-size: ${({theme}) => theme.fontSizes.xxxl};
`;

const SmallAlert = styled.div`
  padding: 1rem 0 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  aling-items: center;
  font-size: ${({theme}) => theme.fontSizes.small};
  color: #9e9e9e;
`;

const SubmitBtn = styled.button`
  position: absolute;
  bottom: 0;
  padding: 1.1rem 0;
  width: 100%;
  border: none;
  color: #fff;
  background-color: #ff7a7a;
`;

const Fang = styled.div`
  margin-top: 8rem;
`;

export default UserInfo;