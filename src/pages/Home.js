import React from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { utilActions } from '../redux/modules/util';

import Header from '../components/Header';
import RankList from '../components/RankList';
import Banner from '../components/Banner';
import Category from '../elements/Category';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

import { Wrapper } from '../elements';
import IntroPop from '../components/IntroPop';

const Home = (props) => {

  const dispatch = useDispatch();

  // 팝업창 키기/종료
  // true가 기본 상태
  // const [popupOpen, setPopupOpen] = React.useState(true);

  const popupOpen = useSelector((state) => state.util.popupOpen);

  // 팝업창 키기/끄기 함수
  // const openPopup = () => {
  //   setPopupOpen(true);
  // };
  const closePopup = () => {
    dispatch(utilActions.setPopupOpen(false));
  };


  return (
    <div>
      {popupOpen && <IntroPop visible={popupOpen} closePopup={closePopup} />}
      <Header/>
      <Banner/>
      <Wrapper>
        <RankList/>
        <Category/>
        <PostList/>
      </Wrapper>
      <Footer />
    </div>
  );
};



export default Home;
