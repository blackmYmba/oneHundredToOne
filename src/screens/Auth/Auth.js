import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import VKLogin from 'react-native-vkontakte-login';
import { useDispatch } from "react-redux";
import { setVkName } from '../../reducers/auth';

const Auth = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const vkAuth = async () => {
    try {
      const isLoggedIn = await VKLogin.isLoggedIn();
      if (isLoggedIn) {
        Alert.alert(
          'Внимание',
          'Вы уже авторизованы через VK. Вы хотите выйти ?',
          [
            {
              text: 'Отмена',
              style: 'cancel',
            },
            {text: 'Да', onPress: async () => {
              try {
                await VKLogin.logout();
                dispatch(setVkName(''));
                await AsyncStorage.removeItem('vkName');
              } catch (e) {
                console.log(e)
              }
            }},
          ],
          {cancelable: false},
        );
      } else {
        try {
          const auth = await VKLogin.login(['']);
          const token = auth.access_token;
          const url = `https://api.vk.com/method/account.getProfileInfo?PARAMETERS&access_token=${token}&v=5.103`;
          const resp = await fetch(url);
          const respJson = await resp.json();
          if (respJson) {
            const name = respJson.response.first_name;
            dispatch(setVkName(name));
            await AsyncStorage.setItem('vkName', name);
            navigation.navigate('Questions');
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Авторизация</Text>
      <View style={styles.buttons}>
        <Icon
          type='font-awesome'
          name='vk'
          color="steelblue"
          reverse
          raised
          buttonStyle={styles.vkButton}
          containerStyle={styles.vkContainer}
          onPress={vkAuth}
        />
        <Button
          title="Войти"
          raised
          buttonStyle={styles.enterButton}
          onPress={() => navigation.navigate('Questions')}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  vkButton: {
    borderRadius: 50,
    justifyContent: 'space-between'
  },
  enterButton: {
    backgroundColor: 'tomato',
    justifyContent: 'space-between'
  },
  vkContainer: {
    marginRight: 20
  }
});


export default Auth;
