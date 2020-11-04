// redux
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
const store = ConfigureStore();

import React from 'react';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}