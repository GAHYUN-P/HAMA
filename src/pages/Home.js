import React from 'react';

import Header from '../components/Header';
import RankList from '../components/RankList';
import Banner from '../components/Banner';
import Category from '../elements/Category';
import PostList from '../components/PostList';
import Footer from '../components/Footer';

const Home = (props) => {
  return (
    <div>
      <Header/>
      <Banner/>
      <RankList/>
      <Category/>
      <PostList/>
      <Footer/>
    </div>
  );
};

export default Home;
