import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';

const Footer = (props) => {

  // 로그인 상태 체크
  const is_login = useSelector((state) => state.user.is_login);


  return (
    <div>
      Footer
    </div>
  );
};

export default Footer;