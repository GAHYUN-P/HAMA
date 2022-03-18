import React from 'react';
import styled from 'styled-components';
import { mypageActions } from '../redux/modules/mypage';
import { useSelector,useDispatch } from 'react-redux';
import Medal from '../components/Medal';
import MypostList from '../components/MypostList';
import MyanswerList from '../components/MyanswerList';
import Header from '../components/Header';
import { history } from '../redux/configureStore';
import Footer from '../components/Footer';
import colorBg from '../assets/colorBg.png';
import ProfileImg from '../elements/ProfileImg';
import SurveyWrite from '../assets/SurveyWrite.svg';
import gotoTest from '../assets/gotoTest.svg';
import { IoIosArrowForward } from "react-icons/io";
import { textAlign } from '@mui/system';
import MedalDetail from '../components/MedalDetail';
import Expert from '../components/Expert';

const MypageAch = (props) => {


    const list = useSelector((state) => state.mypage.list);
    console.log(list.point);
    let percent = list.point / 10;
    if(percent > 100) {
      percent = 100;
    }
    console.log(percent);

    const achievement_list =  useSelector((state) => state.mypage.achievement);
    // console.log(achievement_list);

    const expert_list = useSelector((state) => state.mypage.list.expert);


  return (
    <Wrap>
      <MyBanner>
      <Header />
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <InfoWrap>
            <Category>고민상담</Category>
            <Nickname>{list.nickname}</Nickname>
            <HippoName>{list.hippoName}</HippoName>
            {/* <Email>{list.email}</Email> */}
            <ExpertWrap>
            {expert_list.map((info, idx) => {
                  return (
                    <Expert
                      key={idx}
                      value = {info}
                      idx={idx}
                      />
                  );
              })}
            </ExpertWrap>
          </InfoWrap>
          <ProfileWrap>
            <ProfileImg shape='circle' src={list.imgUrl} size='17vh' position='relative'/>
            <SurveyIco onClick={()=>history.push('/survey')}/>
            <DoTest/>
          </ProfileWrap>
        </div>
        <div style={{paddingTop:'1vh'}}>
          <Lv>{list.hippolv}LV</Lv>
          <LvBg>
            <LvGage percent={percent}/>
          </LvBg>
          <Point>{list.point}/1000 exp</Point>
        </div>
      </MyBanner>
      <MyContents>
      <MedalWrap>
        <Title>나의 업적</Title>
        {achievement_list.map((info, idx) => {
                  return (
                    <MedalDetail
                      value = {info}
                      idx={idx}
                      />
                  );
              })}
      </MedalWrap>
      </MyContents>
      <Footer/>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: scroll;
  margin-bottom: 5vh;
`;

const MyBanner = styled.div`
  height: 50%;
  background-image: url(${colorBg});
  background-size: cover;
  padding: 1vh 4vh;
`;

const InfoWrap = styled.div`
  margin: 5vh 0px;
`;

const Category = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: #fff;
  background: rgba(255, 58, 58, 0.7);
  border-radius: 4px;
  display: inline;
  padding: 2px 4px 3px 3px;
`;

const Nickname = styled.div`
  padding: 2vh 0px 1.2vh;
  font-size: ${({ theme }) => theme.fontSizes.xxxxl};
  color: #fff;
  font-weight: 600;
`;

const HippoName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: #fff;
  padding: 0vh 0px 1.2vh;
`;

const ExpertWrap = styled.div`
  overflow: scroll;
  width: 80%;
  display: flex;
`;

const Email = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: rgba(255, 255, 255, 1);
  padding: 0vh 0px 1.2vh;
  background-color: #FAA7A6;
  border-radius: 40px;
  padding: 2px 5px;
`;

const ProfileWrap = styled.div`
  padding: 2vh 0px;
  position: relative;
`;

const SurveyIco = styled.div`
  background-image: url(${SurveyWrite});
  background-size: cover;
  height: 4.5vh;
  width: 4.5vh;
  position: absolute;
  bottom: 6.5vh;
  right: 0%;
`;

const DoTest = styled.div`
  background-image: url(${gotoTest});
  background-size: contain;
  margin-top: 0.6vh;
  height: 25%;
  width: 100%; 
`;


const Lv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #fff;
  padding: 0px 5px 0px;
`;

const LvBg = styled.div`
  width: 100%;
  height: 1.5vh;
  background: #EFEFEF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 0.6%;
`;

const LvGage = styled.div`
  width: ${props => props.percent}%;
  height: 100%;
  background: linear-gradient(270deg, #FE6462 0%, #FE8B8B 100%);
  border-radius: 7px;
`;

const Point = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #fff;
  padding: 0px 5px 0px;
  text-align: right;
`;


const MyContents = styled.div`
  height: 60%;
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  border-radius: 30px 30px 0px 0px;
  padding: 7% ${({ theme }) => theme.paddings.default};
`;

const MedalWrap = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0px 0px ${({ theme }) => theme.margins.xxxl};
`;


export default MypageAch;
