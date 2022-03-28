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

import { FiInfo } from 'react-icons/fi';


import styled from 'styled-components';

const UserInfo = (props) => {
  
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');
  const [phone, setPhone] = useState('');
  const [same, setSame] = useState('needCheck');
  const [open,setOpen] = useState(false);
  const [open2,setOpen2] = useState(false);

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
    .catch((err)=>{console.log(err)})
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
      <IndiviInfo>
        전화번호
        <Icon onMouseOver={()=>{setOpen2(true)}} onMouseLeave={()=>{setOpen2(false)}} >
          <FiInfo />
          { open2 &&
          <Message>배달의 민족 상품권 및 인스타 인증 시 지급되는 아이스 아메리카노 등을 받으실 수 없게됩니다. 자세한것은 이벤트 페이지를 참고해주세요.</Message>}
        </Icon>
      </IndiviInfo>
      <CallNumber phone={phone} setPhone={setPhone} />
    </Grid>
    <Grid>
      <IndiviInfo>
        관심사 설정
        <Icon onMouseOver={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}} >
          <FiInfo />
          { open &&
          <Message>
             관심사는 답변글 작성시 경험치를 추가로 얻을 수 있는 항목으로 1명당 1가지만 고를 수 있습니다.
            <br/> 추후 한 분야에서 다섯개 이상의 답변을 남기면 숙련도 뱃지를 얻을 수 있습니다.
          </Message>}
        </Icon>
      </IndiviInfo>
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

const Icon = styled.div`
  position: relative;
  display: flex;
  margin-left: ${({theme})=>theme.margins.small};
  justify-content: center;
  align-items: center;
  color: #ff7a7a;
  font-size: ${({theme})=>theme.fontSizes.lg};
`;

const Message = styled.div`
  width: 12.5rem;
  padding: 1rem;
  position: absolute;
  top: 1.5rem;
  right: 0;
  font-size: ${({theme})=> theme.fontSizes.base};
  background-color: rgba( 252,252,252,0.8 );
  border: 1px solid #ff7a7a;
  border-radius: .3rem;
  box-sizing: border-box;
`;

const SmallAlert = styled.div`
  padding: 1rem 0 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  aling-items: center;
  font-size: ${({theme}) => theme.fontSizes.small};
  color: #9e9e9e;
  white-space: pre-line;
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