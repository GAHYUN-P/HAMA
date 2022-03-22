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
import Expert from '../components/Expert';

const Mypage = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(mypageActions.getBanner());
        dispatch(mypageActions.getAchievement());
        dispatch(mypageActions.getUserInfo());
    }, []);

    const list = useSelector((state) => state.mypage.list);
    console.log(list.point);
    let percent = list.point / 10;
    if(percent > 100) {
      percent = 100;
    }
    // console.log(percent);

    const achievement_list =  useSelector((state) => state.mypage.achievement);
    // console.log(achievement_list);

    const expert_list = useSelector((state) => state.mypage.list.expert);
    console.log(expert_list);

    const onClickMypost = (e) => {
      dispatch(mypageActions.setDetail(e.target.value));
      console.log(e.target.value);
      history.push('/mypage_detail');
    }

    const onClickMyanswer = (e) => {
      dispatch(mypageActions.setDetail(e.target.value));
      history.push('/mypage_detail');
    }

  return (
    <React.Fragment>
    <Wrap>
      <MyBanner>
      <Header />
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <InfoWrap>
            <Category>{list.category}</Category>
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
            {list.imgUrl &&
              <ProfileImg shape='circle' src={list.imgUrl} size='17vh' position='relative'/>
            }
            {!list.imgUrl &&
              <ProfileImg shape='circle' src='https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800' size='17vh' position='relative'/>
            }
            <SurveyIco onClick={()=>history.push('/survey')}/>
            <DoTest/>
          </ProfileWrap>
        </div>
        <LvWrap>
          <Lv>{list.hippolv}LV</Lv>
          <LvBg>
            <LvGage percent={percent}/>
          </LvBg>
          <Point>{list.point}/1000 exp</Point>
        </LvWrap>
      </MyBanner>
      <MyContents>
      <MedalWrap>
        <Title>나의 업적</Title>
        {achievement_list.map((info, idx) => {
                  return (
                    <Medal
                      value = {info}
                      idx={idx}
                      />
                  );
              })}
        <GotoDetail onClick={()=>history.push('/mypage_achievement')}>자세히 보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail>
      </MedalWrap>
      <MypostList/>
      <GotoDetail onClick={(e)=>{onClickMypost(e)}} value='mypost'>더보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail>
      <MyanswerList/>
      <GotoDetail onClick={(e)=>{onClickMyanswer(e)}} value='myanswer'>더보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail>
      <div style={{height:'10vh'}}/>
      </MyContents>
    </Wrap>
    <Footer />
    </React.Fragment>
  );
};

const Wrap = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: scroll;
  margin-bottom: 5vh;
  /* padding: 1vh 4vh; */
`;

const MyBanner = styled.div`
  height: 50%;
  background-image: url(${colorBg});
  background-size: cover;
  padding: 1vh 4vh;
  position: relative;
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
  top: 14vh;
  right: 0%;
`;

const DoTest = styled.div`
  position: absolute;
  background-image: url(${gotoTest});
  background-size: contain;
  margin-top: 0.5vh;
  height: 5vh;
  width: 100%; 
  top: 18vh;
`;

const LvWrap= styled.div`
  position: absolute;
  width: 85%;
  bottom: 12vh;
  
  /* padding-top: 1vh; */
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

const GotoDetail = styled.button`
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #6B6B6B;
  display: flex;
  float: right;
`;

const IconWrap = styled.div` 
    display:flex;
    justify-content: center;
    align-items: center;
`;


export default Mypage;
