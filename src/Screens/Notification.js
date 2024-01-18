import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../theme/Colors';
import {btnStyles, container, paraGray} from '../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Header} from '../Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Notification = props => {
  const [activeButton, setActiveButon] = useState(1);

  const Notification = [
    {
      id: '1',
      title: 'Rob Strated following you.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '10 min ago',
    },
    {
      id: '2',
      title: 'Rob Sent you a connection request',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
    },
    {
      id: '3',
      title: 'Webinar is live join now',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
    },
    {
      id: '4',
      // title: 'Mendelian Genetics & Mechanisms of Heredity',
      title: 'Webinar is live join now',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '50 min ago',
    },
  ];

  return (
    <View style={[container.container]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',

          paddingHorizontal: 10,
          borderBottomColor: '#275CE0',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            onPress={() =>
              //   props.navigation.navigate('StudentEdit', {
              //     studentdetail: studentdetail,
              //   })
              props.navigation.goBack()
            }>
            <Ionicons
              style={{marginVertical: 5, paddingHorizontal: 7}}
              name="arrow-back"
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
          }}>
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            Notification
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        {/* <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="Notification"
          marginLeft
        /> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            borderColor: activeButton === 1 ? COLORS.blue : COLORS.background,
            width: '50%',
            alignItems: 'center',
          }}
          onPress={() => setActiveButon(1)}>
          <Text
            style={[
              paraGray.parahome,
              {
                fontSize: 15,
                marginBottom: 5,
                color: activeButton === 1 ? COLORS.black : COLORS.background,
              },
            ]}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            borderColor: activeButton !== 1 ? COLORS.blue : COLORS.background,
            width: '50%',
            alignItems: 'center',
            elevation: 0,
          }}
          onPress={() => setActiveButon(2)}>
          <Text
            style={[
              paraGray.parahome,
              {
                fontSize: 15,
                marginBottom: 5,
                color: activeButton !== 1 ? COLORS.black : COLORS.background,
              },
            ]}>
            Requests
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeButton === 1 ? (
          <View style={{paddingHorizontal: 10}}>
            {Notification.map((notify, index) => (
              <View key={index}>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{marginRight: 10, alignSelf: 'center'}}>
                      <Avatar.Image
                        size={45}
                        source={require('../../assets/user1.png')}
                      />
                    </View>
                    <View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          paraGray.darkpara,
                          {
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            //width: '%',
                          },
                        ]}>
                        {notify.title}
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 12, marginTop: 2},
                        ]}>
                        {notify.time}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: COLORS.background,
                    marginTop: 10,
                  }}
                />
              </View>
            ))}
          </View>
        ) : (
          <TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <Avatar.Image
                size={50}
                source={require('../../assets/user2.png')}
              />
              <View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      marginLeft: 10,
                      fontFamily: 'Poppins-SemiBold',
                      width: '90%',
                      fontSize: 18,
                    },
                  ]}>
                  Suraj Gupta
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginLeft: 10, width: '100%', fontSize: 12},
                  ]}>
                  2 Mutual Connections
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: -10,
                }}>
                <Text
                  style={[paraGray.darkpara, {color: '#4F4F4F', fontSize: 12}]}>
                  1 min ago
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                marginBottom: 30,
                marginLeft: 50,
              }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F8F8F8',
                  borderColor: COLORS.background,
                  marginRight: 30,
                }}
                // onPress={() => props.navigation.navigate('')}
              >
                <Text style={[paraGray.darkpara, {}]}>Ignore</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: -1,
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 43,
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.darkblue,
                  borderColor: COLORS.background,
                }}
                // onPress={() => props.navigation.navigate('')}
              >
                <Text style={[paraGray.darkpara, {color: COLORS.bg}]}>
                  Get Connected
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

export default Notification;
