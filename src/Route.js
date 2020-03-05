import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import AuthScreen from './screens/Auth/Auth';
import QuestionsScreen from './screens/Questions/Questions';
import QuestionScreen from './screens/Question/Question';
import QuestionHeaderLeft from './screens/Question/HeaderLeft';
import { useSelector } from "react-redux";
import SplashScreen from 'react-native-splash-screen'

const QuestionStack = createStackNavigator();

const QuestionStackScreen = () => {
  return (
    <QuestionStack.Navigator>
      <QuestionStack.Screen
        name="Questions"
        component={QuestionsScreen}
        options={{
          title: 'Список вопросов'
        }}
      />
      <QuestionStack.Screen
        name="Question"
        component={QuestionScreen}
        options={{
          title: '',
          headerBackTitle: 'Назад',
          headerLeft: () => (
            <QuestionHeaderLeft />
          )
        }}
      />
    </QuestionStack.Navigator>
  );
};

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator headerMode='none'>
      <AuthStack.Screen
        name="AuthScreen"
        component={AuthScreen}
      />
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const Route = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const getInitialRouteName = () => {
    const vkName = useSelector(state => state.authReducer.vkName);
    if (vkName) {
      return 'Questions'
    }
    return 'Auth'
  };

  return (
    <Tab.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Questions') {
            iconName = 'question-answer';
          } else if (route.name === 'Auth') {
            iconName = 'exit-to-app';
          }

          return <Icon type="material" name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Questions" component={QuestionStackScreen} options={{ title: 'Список вопросов' }} />
      <Tab.Screen name="Auth" component={AuthStackScreen} options={{ title: 'Выход', tabBarVisible: false }} />
    </Tab.Navigator>
  );
};
