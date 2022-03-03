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
import Request from '../pages/Request';
import RequestDetail from '../pages/RequestDetail';

// component
import AppLayout from '../components/AppLayout';
import Home from '../pages/Home';
import PasswordFind from '../pages/PasswordFind';
import UserInfo from '../pages/UserInfo';
import Rank from '../components/Rank';

function App() {
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login/kakao" exact component={Login} />
          <Route path="/chat" exact component={Chatting} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/userInfo" exact component={UserInfo} />
          <Route path="/findPassword" exact component={PasswordFind} />
          <Route path="/answer" exact component={Answer} />
          <Route path="/request" exact component={Request} />
          <Route path="/requestdetail/:postId" exact component={RequestDetail} />
          <Route path="/test" exact component={Rank} />
          <Route path="/home" exact component={Home} />

          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  );
}

export default App;
