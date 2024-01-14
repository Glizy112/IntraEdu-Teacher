import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Avatar, Paragraph, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const resetPinOptions = [
  {
    id: '1',
    optionTitle: 'Via SMS',
    optionMethod: 'Mobile Number',
    optionIcon: <MaterialCommunityIcons style={{marginTop: -20}} name="cellphone-lock" size={40} color={COLORS.secondary}/>,
  },
  {
    id: '2',
    optionTitle: 'Via Email',
    optionMethod: 'Email Address',
    optionIcon: <AntDesign style={{marginTop: -20}} name="mail" size={40} color={COLORS.secondary}/>,
  },
]

const ForgetPassword = props => {
  return (
    <View style={container.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 16,
        }}>
        <TouchableOpacity onPress={()=> props.navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black}/>
        </TouchableOpacity>
        <Text style={[paraGray.largebold, {textAlign: 'center'}]}> Forgot Password ? </Text>
        <Text>Text</Text>
      </View>
      <View style={{paddingTop: 12, borderBottomWidth: 0.6, borderColor: COLORS.primary}}/>

      <ScrollView>
        {/* <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
          <Text style={[paraGray.parahome]}>Forgot Password?</Text>
        </View> */}
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <Text
            style={[
              paraGray.darkpara,
              {color: COLORS.txtGray},
            ]}>
            Select from below options to reset you MPIN.
          </Text>
        </View>
        {
          resetPinOptions.map((item)=> (
            <View
              key={item.id}
              style={[
                {
                  //flex: 1,
                  paddingHorizontal: 20,
                  marginBottom: 20,
                  //marginTop: 20,
                },
                item.id===1 ? {marginTop: 40} : {marginTop: 20},
              ]}
            >
              <TouchableOpacity
                style={{
                  //flex: 1,
                  paddingHorizontal: 15,
                  borderWidth: 0.6,
                  borderRadius: 12,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.bgColor,
                }}
                //onPress={() => props.navigation.navigate('ForgetPasswordNO')}
              >
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 20, textAlign: 'center', color: COLORS.txtGray},
                  ]}>
                  {item.optionTitle}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  {item.optionIcon}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: -50,
                    }}>
                    <Text style={[paraGray.darkpara]}>{item.optionMethod}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        }
        {/* <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: 20,
            marginTop: 40,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: COLORS.lightactive,
            }}
            onPress={() => props.navigation.navigate('ForgetPasswordNO')}>
            <Text
              style={[
                paraGray.darkpara,
                {marginTop: 20, textAlign: 'center', color: COLORS.lightblack},
              ]}>
              Via SMS:
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: -20}}
                name="cellphone-lock"
                size={50}
                color={COLORS.active}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: -50,
                }}>
                <Text style={[paraGray.darkpara]}>Number</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginBottom: 20,
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: COLORS.lightactive,
            }}
            onPress={() => props.navigation.navigate('ForgetPasswordMail')}>
            <Text
              style={[
                paraGray.darkpara,
                {marginTop: 20, textAlign: 'center', color: COLORS.lightblack},
              ]}>
              Via Mail:
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <AntDesign
                style={{marginTop: -20}}
                name="mail"
                size={50}
                color={COLORS.active}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: -50,
                }}>
                <Text style={[paraGray.darkpara]}>Email</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};
export default ForgetPassword;
