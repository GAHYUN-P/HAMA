import React, { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import '../App.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { wsAlarm, wsDisConnect } from './socket';
import { getToken } from './cookie'; 

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
// import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Answer from '../pages/Answer';
import AnswerEdit from '../pages/AnswerEdit';
import AnswerDetail from '../pages/AnswerDetail';
import Request from '../pages/Request';
import RequestEdit from '../pages/RequestEdit';
// import RequestDetail from '../pages/RequestDetail';
import ChildComment from '../pages/ChildComment';
import SearchResult from '../pages/SearchResult';
import Search from '../pages/Search';
import Alarm from '../pages/Alarm';
import ImageViewer from '../pages/ImageViewer';

// component
import Home from '../pages/Home';
import UserInfo from '../pages/UserInfo';
import Survey from '../pages/Survey';
import SurveyResult from '../pages/SurveyResult';
import Mypage from '../pages/Mypage';
import MypageDetail from '../pages/MypageDetail';
// import Shorts from '../pages/Shorts';
import MypageAch from '../pages/MypageAch';
// import Notice from '../pages/Notice';
import DevInfo from '../pages/DevInfo';
import HMpost from '../pages/HMpost';
import UserPage from '../pages/UserPage';
import UserpageDetail from '../pages/UserpageDetail';

const Login = lazy(()=> import('../pages/Login'));
const Shorts = lazy(()=> import('../pages/Shorts'));
const RequestDetail = lazy(()=> import('../pages/RequestDetail'));
const Notice = lazy(()=> import('../pages/Notice'));

function App() {
  const dispatch = useDispatch();
  const { connected } = useSelector(state => state.alarm);

  useEffect(()=>{
    if(getToken()&&!connected){
      wsAlarm(dispatch);
    }
    return()=>{
      wsDisConnect();
    }
  },[])

  return (
    <ConnectedRouter history={history}>
      <Container>
        <div id="wrap">
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <CardList>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/userInfo" exact component={UserInfo} />
              <Route path="/notice" exact component={Notice} />
              <Route path="/developer" exact component={DevInfo} />
              <Route path="/request" exact component={Request} />
              <Route path="/request/:postId" exact component={RequestEdit} />
              <Route path="/requestdetail/:postId" exact component={RequestDetail} />
              <Route path="/hm_posts" exact component={HMpost} />
              <Route path="/answer/:postId" exact component={Answer} />
              <Route path="/answeredit/:answerId" exact component={AnswerEdit} />
              <Route path="/answerdetail/:answerId" exact component={AnswerDetail} />
              <Route path="/images/:type/:id" exact component={ImageViewer} />
              <Route path="/comment/:commentId" exact component={ChildComment} />
              <Route path="/survey" exact component={Survey} />
              <Route path="/result" exact component={SurveyResult} />
              <Route path="/mypage" exact component={Mypage} />
              <Route path="/mypage_detail" exact component={MypageDetail} />
              <Route path="/mypage_achievement" exact component={MypageAch} />
              <Route path="/search" exact component={Search} />
              <Route path="/search/:keyword" exact component={SearchResult} />
              <Route path="/shorts" exact component={Shorts} />
              <Route path="/alarm" exact component={Alarm} />
              <Route path="/userpage/:id" exact component={UserPage} />
              <Route path="/userpage_detail/:id" exact component={UserpageDetail} />
              </CardList>
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Suspense>
        </div>
      </Container>
    </ConnectedRouter>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #d9e3ee;  
  overflow: hidden;
  position: relative;
  font-family: 'Noto-Sans-KR';
  font-style: normal;
  font-weight: 400;
  #wrap {
    width: 100%;
    max-width: 412px;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 auto;
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    @media screen and (min-width: 1024px) {
      position: relative;
      left: 27%;
      top: 0%;
      overflow: auto;
    }
  }
  @media screen and (min-width: 1200px) {
    background: url('https://minki-bucket.s3.ap-northeast-2.amazonaws.com/page.svg') no-repeat;
    background-size: cover;
  }
`;

const CardList = styled.div`
  width: 100%;
  height: auto;
  max-height: 100vh;
  overflow-y: scroll;
`;

export default App;
