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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {Shadow} from 'react-native-shadow-2';

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
          {/* <View
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
          </View> */}
          {/* <View>
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
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              justifyContent: 'space-between',
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
                  style={{marginVertical: 5}}
                  name="arrow-back"
                  size={25}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  // paraGray.darkpara,
                  {
                    textAlign: 'center',
                    //marginLeft: 30,
                    marginLeft: -15,
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 16,
                    color: COLORS.black,
                  },
                ]}>
                My Profile
              </Text>
            </View>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              //   alignItems: 'center',
              //   justifyContent: 'center',
              //backgroundColor: '#C4C4C440',

              width: '70%',

              borderRadius: 16,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                flex: 1,

                alignItems: 'center',
                // marginTop: 10,
                // marginBottom: 10,
                justifyContent: 'center',
                alignSelf: 'center',

                // alignContent: 'center',
              }}>
              {userimage == null ? (
                <Avatar.Image
                  size={70}
                  // source={{uri: Url.student_IMG + student.photo}}
                  source={require('../../../assets/user.jpg')}
                  backgroundColor={COLORS.black}
                />
              ) : image == null ? (
                <FastImage
                  style={{
                    width: 108,
                    height: 108,
                    borderRadius: 12,
                  }}
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
              <View style={{marginVertical: 10}}>
                <Text
                  style={[
                    paraGray.parahome,
                    {fontSize: 14, textAlign: 'center'},
                  ]}>
                  {username}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: 'auto',
              width: 326,
              alignSelf: 'center',
              marginTop: 10,
              elevation: 4,
              borderRadius: 12,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',

                //borderWidth: 0.1,
              }}
              distance={0}>
              <View
                style={{
                  height: 60,
                  //backgroundColor: 'black',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 25,
                }}>
                <View
                  style={{
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // alignSelf: 'center',
                    marginRight: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 10,
                      color: COLORS.txtGray,
                      lineHeight: 15,
                      textAlign: 'center',
                    }}>
                    Gender
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      justifyContent: 'center',
                      //alignSelf: 'center',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 12,

                        lineHeight: 15,
                        color: COLORS.primary,
                        textAlign: 'center',
                      }}>
                      Female
                    </Text>
                    <FontAwesome
                      size={15}
                      name="user"
                      color={COLORS.primary}
                      style={{textAlign: 'right', marginLeft: 5}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: 1,
                    height: 36,
                    //borderWidth: 1,
                    backgroundColor: COLORS.primary,

                    //marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                />
                <View
                  style={{
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    //alignSelf: 'center',
                    marginHorizontal: 10,
                    //borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 10,
                      textAlign: 'left',
                      //lineHeight: 15,
                      color: COLORS.txtGray,
                      marginLeft: -10,
                    }}>
                    Experience
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      justifyContent: 'center',
                      //alignSelf: 'center',
                      marginLeft: 0,
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 12,

                        lineHeight: 15,
                        color: COLORS.primary,
                        textAlign: 'center',
                        marginLeft: -5,
                      }}>
                      2 Years
                    </Text>
                    <Ionicons
                      size={15}
                      name="briefcase"
                      color={COLORS.primary}
                      style={{textAlign: 'right', marginLeft: 5}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: 1,
                    height: 36,
                    backgroundColor: COLORS.primary,
                    //marginHorizontal: 10,
                    //marginVertical: 10,
                  }}
                />

                <View
                  style={{
                    width: 70,
                    //justifyContent: 'center',
                    alignItems: 'flex-start',
                    //alignSelf: 'center',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 10,
                      textAlign: 'center',
                      lineHeight: 15,
                      color: COLORS.txtGray,
                    }}>
                    City
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      justifyContent: 'center',
                      //alignSelf: 'center',
                      //marginLeft: 28,
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 12,

                        //lineHeight: 15,
                        color: COLORS.primary,
                        textAlign: 'center',
                      }}>
                      Pune
                    </Text>
                    <Ionicons
                      size={15}
                      name="location"
                      color={COLORS.primary}
                      style={{textAlign: 'right', marginLeft: 5}}
                    />
                  </View>
                </View>

                {/* <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.lightblack, fontSize: 12},
                  ]}>
                  Class {student.class_name} | Roll no: {student.roll_no}
                </Text> */}
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, alignSelf: 'center'}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                color: COLORS.txtGray,
                fontSize: 14,
                lineHeight: 17,
                marginBottom: 10,
                textAlign: 'left',
              }}>
              Basic Info
            </Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 12,
                width: 316,
                height: 262,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  width: 270,
                  height: 232,
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingLeft: 10,
                }}>
                <View style={[styles.mainViewContainer, {marginTop: 10}]}>
                  <View style={styles.mainView}>
                    <Text style={[paraGray.darkpara, {color: COLORS.txtGray}]}>
                      Mobile No
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {userphone}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {color: COLORS.txtGray, fontSize: 11},
                      ]}>
                      E-Mail ID
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {useremail}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.mainViewContainer}>
                  <View style={styles.mainView}>
                    <Text style={[paraGray.darkpara, {color: COLORS.txtGray}]}>
                      Class Incharge
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        null
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text style={[paraGray.darkpara, {color: COLORS.txtGray}]}>
                      Date of Birth
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {userdob}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.mainViewContainer}>
                  <View style={styles.mainView}>
                    <Text style={[paraGray.darkpara, {color: COLORS.txtGray}]}>
                      ID Card
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {userid}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mainView}>
                    <Text style={[paraGray.darkpara, {color: COLORS.txtGray}]}>
                      Aadhar No
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text style={[paraGray.darkpara, styles.userText]}>
                        {username}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.mainView, {width: '100%', marginTop: 15}]}>
                  <Text style={[paraGray.darkpara, {color: COLORS.txtGray}]}>
                    Parmanent Address
                  </Text>
                  <View style={styles.inputTextView}>
                    <Text style={[paraGray.darkpara, styles.userText]}>
                      {useraddress ? useraddress : 'N / A'}
                    </Text>
                  </View>
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
const styles = StyleSheet.create({
  mainViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    //marginVertical: 5,
  },
  mainView: {
    alignSelf: 'center',

    width: 140,
    heigth: 62,
    backgroundColor: 'white',
    marginTop: 20,
    //marginRight: 10,
  },
  inputTextView: {
    width: '60%',

    //height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //paddingLeft: 10,
    marginTop: 10,
    //borderWidth: 1,
  },
  userText: {
    color: COLORS.primary,
    //textAlign: 'left',
    //borderWidth: 1,
  },
});
