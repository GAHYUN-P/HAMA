import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App';
import { ThemeProvider } from 'styled-components';

// styled-components 공통변수
import theme from './shared/theme';
// redux store
import { Provider } from 'react-redux';
import store from './redux/configureStore';

// 스크롤 css
import './styles/scroll.css';
import GlobalStyles from './shared/GlobalStyles';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
        <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

