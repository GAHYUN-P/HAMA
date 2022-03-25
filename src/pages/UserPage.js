import React from 'react';
import styled, {keyframes} from 'styled-components';
import { userpageActions } from '../redux/modules/userpage';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import Expert from '../components/Expert';
import { categoryEncoder } from '../shared/categoryEncoder';
import { BsChevronDoubleRight } from "react-icons/bs";
import UserCommentList from '../components/UserCommentList';

const UserPage = (props) => {

    const { id } = useParams();
    console.log(id);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(userpageActions.getBanner(id));
        dispatch(userpageActions.getAchievement(id));
        dispatch(userpageActions.getUserInfo(id));
    }, []);

    const list = useSelector((state) => state.mypage.list);
    console.log(list.point);
    let percent = list.point / 10;
    if(percent > 100) {
      percent = 100;
    }
    // console.log(percent);

    const achievement_list =  [0,0,0,0,0,0,0,0];
    // const achievement_list =  useSelector((state) => state.userpage.achievement);
    // console.log(achievement_list);

    const expert_list = useSelector((state) => state.userpage.list.expert);
    // console.log(expert_list);

  return (
    <React.Fragment>
    <Wrap>
      <MyBanner>
      <Header/>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <InfoWrap>
            <Category>{categoryEncoder(list.category)}</Category>
            <Nickname>{list.nickname}</Nickname>
            <HippoName>{list.hippoName}</HippoName>
            {/* <Email>{list.email}</Email> */}
            <WholeExpertWrap>
              <ExpertWrap>
                {expert_list.map((info, idx) => {
                    return (
                      <Expert
                        key= {idx}
                        value = {info}
                        idx= {idx}
                        />
                    );
                })}
              </ExpertWrap>
              {expert_list.length >= 3 &&
                <EIconWrap><StyledIcon/></EIconWrap>
              }
            </WholeExpertWrap>
          </InfoWrap>
          <ProfileWrap>
            {list.imgUrl &&
              <ProfileImg shape='circle' src={list.imgUrl} size='17vh' position='relative'/>
            }
            {!list.imgUrl &&
              <ProfileImg shape='circle' src='https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800' size='17vh' position='relative'/>
            }
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
        <TitleWrap>
          <Title>나의 업적</Title>
          <GotoDetail onClick={()=>history.push('/mypage_achievement')}>자세히 보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail>
        </TitleWrap>
        {achievement_list.map((info, idx) => {
                  return (
                    <Medal
                      value = {info}
                      idx= {idx}
                      />
                  );
              })}
      </MedalWrap>
      <MypostList id={id}/>
      {/* <GotoDetail onClick={(e)=>{onClickMypost(e)}} value='mypost'>더보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail> */}
      <MyanswerList id={id}/>
      {/* <GotoDetail onClick={(e)=>{onClickMyanswer(e)}} value='myanswer'>더보기<IconWrap><IoIosArrowForward/></IconWrap></GotoDetail> */}
      <div style={{height:'10vh'}}/>
      </MyContents>
      <UserCommentList />
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

const WholeExpertWrap = styled.div`
  display: flex;
`;

const ExpertWrap = styled.div`
  overflow: scroll;
  width: 63%;
  display: flex;
`;

const move = keyframes`
	0% {
    left: 0px;
    opacity: 0.5;
  }
  50% {
    left: 3px;
    opacity: 0.8;
  }
  100% {
    left: 0px;
    opacity: 0.5;
  }
`;

const EIconWrap = styled.div`
  overflow: hidden;
`;

const StyledIcon = styled(BsChevronDoubleRight)`
  padding-left: 3px;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  animation: ${move} 1s 1s infinite;
  position: relative;
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
  padding: 3px 5px 0px;
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

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
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


export default UserPage;
