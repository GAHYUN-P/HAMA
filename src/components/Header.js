import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const Header = (props) => {

  // 로그인 상태 체크
  const is_login = useSelector((state) => state.user.is_login);


  return (
    <div>
      헤더
    </div>
  );
};

export default Header;
