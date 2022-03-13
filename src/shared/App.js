import React from 'react';
import styled from 'styled-components';
import '../App.css';

// Redux

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Chatting from '../pages/Chatting';
import Signup from '../pages/Signup';
import Answer from '../pages/Answer';
import AnswerEdit from '../pages/AnswerEdit';
import AnswerDetail from '../pages/AnswerDetail';
import Request from '../pages/Request';
import RequestEdit from '../pages/RequestEdit';
import RequestDetail from '../pages/RequestDetail';
import ChildComment from '../pages/ChildComment';
import SearchResult from '../pages/SearchResult';
import Search from '../pages/Search';
import Alam from '../pages/Alam';

// component
import Home from '../pages/Home';
import PasswordFind from '../pages/PasswordFind';
import UserInfo from '../pages/UserInfo';
import Survey from '../pages/Survey';
import SurveyResult from '../pages/SurveyResult';
import Mypage from '../pages/Mypage';
import ChatList from '../components/ChatList';
import MypageDetail from '../pages/MypageDetail';
import Shorts from '../pages/Shorts';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Container>
        <div id="wrap">
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login/kakao" exact component={Login} />
              <Route path="/chat" exact component={Chatting} />
              <Route path="/chatlist" exact component={ChatList} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/userInfo" exact component={UserInfo} />
              <Route path="/findPassword" exact component={PasswordFind} />
              <Route path="/answer/:postId" exact component={Answer} />
              <Route path="/answeredit/:answerId" exact component={AnswerEdit} />
              <Route path="/answerdetail/:answerId" exact component={AnswerDetail} />
              <Route path="/comment/:commentId" exact component={ChildComment} />
              <Route path="/request" exact component={Request} />
              <Route path="/request/:postId" exact component={RequestEdit} />
              <Route path="/requestdetail/:postId" exact component={RequestDetail} />
              <Route path="/home" exact component={Home} />
              <Route path="/survey" exact component={Survey} />
              <Route path="/result" exact component={SurveyResult} />
              <Route path="/mypage" exact component={Mypage} />
              <Route path="/mypage_detail" exact component={MypageDetail} />
              <Route path="/userinfo" exact component={UserInfo} />
              <Route path="/search" exact component={Search} />
              <Route path="/search/:keyword" exact component={SearchResult} />
              <Route path="/shorts" exact component={Shorts} />
              <Route path="/alam" exact component={Alam} />
              <Route path="*" exact component={NotFound} />
            </Switch>
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
    background: url('https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800') no-repeat;
    background-size: 100% 100vh;
  }
`;

export default App;
