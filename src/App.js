import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import configureStore from './store';
import { NavigationContainer } from '@react-navigation/native';
import { Route } from './Route';
import { setQuestions } from "./reducers/questions";
import VKLogin from 'react-native-vkontakte-login';
import { setVkName } from "./reducers/auth";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IolIcons from 'react-native-vector-icons/Ionicons';

const store = configureStore();

const App = () => {

  useEffect(() => {
    VKLogin.initialize(7345906);
    FontAwesome.loadFont();
    MaterialIcons.loadFont();
    IolIcons.loadFont();
    const getVkName = async () => {
      const vkName = await AsyncStorage.getItem('vkName');
      if (vkName) {
        store.dispatch(setVkName(vkName));
      }
    };
    const fetchData = async () => {
      const url = 'https://api.myjson.com/bins/8561o';
      const resp = await fetch(url);
      const respJson = await resp.json();
      store.dispatch(setQuestions(respJson))
    };
    getVkName();
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
