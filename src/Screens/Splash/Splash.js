import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../theme/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
} from '../../Redux/Actions/actions';
import {paraGray} from '../../theme/styles/Base';

const Splash = props => {
  const [userlogin, setUserLogin] = useState();
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal} = useSelector(
    state => state.userReducer,
  );
  useEffect(() => {
    setTimeout(() => {
      StoreData();
    }, 2000);
  }, []);
  const StoreData = async () => {
    try {
      const onboarddata = await AsyncStorage.getItem('onboard');
      const user_Id = await AsyncStorage.getItem('user_id');
      const user_name = await AsyncStorage.getItem('name');
      const Toggle = await AsyncStorage.getItem('toggle');
      // const onboard = await AsyncStorage.getItem('onboard');
      // setOnboarding(onboard);
      setUserLogin(user_Id);
      dispatch(setuserId(user_Id));
      dispatch(setuserName(user_name));
      console.log('onboarddata' + onboarddata);

      if (user_Id != null) {
        if (Toggle != null) {
          props.navigation.navigate('MPINVerification');
        } else {
          props.navigation.navigate('Home');
        }
      } else if (onboarddata == null) {
        AsyncStorage.setItem('onboard', 'false');
        props.navigation.navigate('OnBoarding');
      } else {
        props.navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log('Error => ' + error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.bg} barStyle={'dark-content'} />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/splash.png')}>
        <TouchableOpacity
          onPress={StoreData}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View style={{alignSelf: 'center', marginBottom: 40}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-Regular',
            }}>
            Made in India
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
