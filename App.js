import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import MainNavigator from './src/navigation/MainNavigator';
import rootReducer from './src/reducers';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <MainNavigator />
    </Provider>
  );
};

export default App;
