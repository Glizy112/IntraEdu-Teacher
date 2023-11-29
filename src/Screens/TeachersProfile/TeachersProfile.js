import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import ImagePicker from 'react-native-image-crop-picker';

const TeachersProfile = props => {
  const {
    userinfo,
    userid,
    username,
    userimage,
    useremail,
    userdob,
    userphone,
    useraddress,
  } = useSelector(state => state.userReducer);
  const [image, setImage] = useState(null);
  // useEffect(() => {
  //    console.log("us"+JSON.stringify(userdob))
  //    console.log("us"+JSON.stringify(useraddress))
  //    console.log("us"+JSON.stringify(userphone))
  // }, []);
  const SelectImage = () => {
    let imageList = [];
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
    }).then(image => {
      console.log('===>>', image);
      // setDp(image.path);
      setImage(image.path);
    });
  };
  return (
    <View style={container.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 15,
            paddingBottom: 30,
          }}>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.outline,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}>
              {userimage == null ? (
                <Avatar.Image
                  size={70}
                  // source={{uri: Url.student_IMG + student.photo}}
                  source={require('../../../assets/user.jpg')}
                  backgroundColor={COLORS.black}
                />
              ) : image == null ? (
                <Avatar.Image
                  size={70}
                  source={{uri: Url.profile_IMG + userimage}}
                  backgroundColor={COLORS.black}
                />
              ) : (
                <Avatar.Image
                  size={70}
                  // source={{uri: Url.student_IMG + student.photo}}
                  source={{uri: image}}
                  backgroundColor={COLORS.black}
                />
              )}
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 15}]}>
                  {username}
                </Text>
                <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                  Class V | ID Card: 123456
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: -30,
                  // marginRight: 25,
                }}
                onPress={SelectImage}>
                <Feather name="camera" size={25} color={COLORS.lightblack} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
                marginTop: 20,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                Name
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  {username}
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                Phone Number
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  {userphone}
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                E-mail ID
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  {useremail}
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                Classroom
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  V
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                Date of Birth
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  {userdob}
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                ID Card
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  9082111479
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                Aadharcard No
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                      marginTop: 5,
                    },
                  ]}>
                  1212-1211-1211
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 25,
                //   paddingHorizontal: 15,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {color: COLORS.label, marginBottom: 5},
                ]}>
                Parmanent Add.
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {
                      borderBottomColor: COLORS.bottom,
                      borderBottomWidth: 1,
                      width: '90%',
                    },
                  ]}>
                  {useraddress}
                </Text>
                <View
                  style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="lock" size={15} color={COLORS.label} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TeachersProfile;
