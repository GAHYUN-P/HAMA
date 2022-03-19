import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { userAPI } from '../shared/api';
import { history } from '../redux/configureStore';

import { Categories, categoryEncoder } from '../shared/categoryEncoder';

import Header from '../components/Header';
import GenderAndAge from '../components/GenderAndAge';
import NickMaking from '../components/NickMaking';
import Tag from '../elements/Tag';

import styled from 'styled-components';

const UserInfo = (props) => {
  
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');  

  const onClickSubmit = async () => {
    const data = {
      category: interest,
      gender: gender,
      age: age,
      nickname: nickname
    }
    userAPI.userInfo(data)
    .then(()=>{
      history.replace('/')
    })
    .catch(err=>{console.log(err)})
  }
  const SAlert = '*나의 전문으로 지정할 한 가지 분야를 선택해주세요.'
  // <Header />
  return (
  <>
    <Header />
    <Grid>
    {/* const [gender, setGender] = useState(); */}
  {/* const [age, setAge] = useState(); */}
      <IndiviInfo>성별 및 나이</IndiviInfo>
        <GenderAndAge age={age} gender={gender} setGender={setGender} setAge={setAge} />
    </Grid>
      <IndiviInfo>닉네임 설정</IndiviInfo>
        <NickMaking nickname={nickname} setNickname={setNickname} />
    <Grid>
      <IndiviInfo>관심사 설정</IndiviInfo>
      <SmallAlert>{SAlert}</SmallAlert>
      { Categories.map((c,i)=>{return(<Tag key={i} tag={interest} _onClick={(e)=>{setInterest(e.target.innerHTML)}}>{c}</Tag>)}) }
    </Grid>
    <SubmitBtn onClick={onClickSubmit} >다음</SubmitBtn>
  </>
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
  margin-top: 8rem;
  padding: 1.1rem 0;
  width: 100%;
  border: none;
  color: #fff;
  background-color: #ff7a7a;
`;

export default UserInfo;

// {/* <div>
// <div>성별 및 나이</div>
//   <div>
//     <div>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <Select
//           value={gender||''}
//           onChange={(e) => { genderInput(e) }}
//           displayEmpty
//           inputProps={{ 'aria-label': 'Without label' }}
//         >
//           <MenuItem value="">
//             선택해주세요
//           </MenuItem>
//           <MenuItem value={'남'}>남</MenuItem>
//           <MenuItem value={'여'}>여</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//     <div>
//       <input 
//         onChange={ageInput}
//         placeholder='입력해주세요'/>  
//     </div>
//   </div>
// </div>

// <div>
// <div>닉네임 설정</div>
// <div>
//   <input onChange={nicknameInput}/>
//   <button>중복확인</button>
// </div>
// </div>

// <div>
// <div>관심사 설정</div>
// <div>*나의 최초 전문으로 지정할 한 가지 분야를 선택해주세요</div>
// <div></div>
// </div>

// <button onClick={onClickSubmit}>submit</button> */}