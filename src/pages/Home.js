import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import RankList from '../components/RankList';
import Banner from '../components/Banner';
import Category from '../elements/Category';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

import { Wrapper } from '../elements';

const Home = (props) => {
  return (
    <div>
      <Header/>
      <Banner/>
      <Wrapper>
        <RankList/>
        <Category/>
        <PostList/>
        <Footer/>
      </Wrapper>
    </div>
  );
};

export default Home;
