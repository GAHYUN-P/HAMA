import React from 'react';

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
import AppLayout from '../components/AppLayout';
import Home from '../pages/Home';
import PasswordFind from '../pages/PasswordFind';
import UserInfo from '../pages/UserInfo';
import Survey from '../pages/Survey';
import SurveyResult from '../pages/SurveyResult';
import Mypage from '../pages/Mypage';
import ChatList from '../components/ChatList';
import MypageDetail from '../pages/MypageDetail';
import Shorts from '../pages/Shorts';
import Test from '../pages/Test';

function App() {
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
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
          <Route path="/test" exact component={Test} />
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
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
