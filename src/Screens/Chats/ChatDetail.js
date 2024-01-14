import React, {useState, useEffect} from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import {Avatar, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {btnStyles, container, paraGray} from '../../theme/styles/Base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import DocumentPicker from 'react-native-document-picker';
import {selectContactPhone} from 'react-native-select-contact';

const ChatDetail = props => {
  const {user} = props.route.params;
  const [sendbutton, setSendButton] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [emoji, setEmoji] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showattachment, setShowAttachment] = useState(false);
  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);

  const SelectImage = () => {
    let imageList = [];
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
    }).then(image => {
      // console.log("===>>",image);
      // setDp(image.path);
      setImage(image);
      setShowAttachment(false);
    });
  };

  const selectFile = async () => {
    try {
      // <----for single selecton use (pick) for multiple selection use (pickMultiple)---->
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      }).then(res => {
        // console.log("===>>",image);
        // setDp(image.path);
        setFile(res);
        setShowAttachment(false);
      });
      // console.log("Selected File ===>",
      //   JSON.stringify(file),
      //   // res.type, // mime type
      //   // res.name,
      //   // res.size,
      // )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Allow Access Contact?',
          message: 'allow this app to read contact information',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
        getPhoneNumber();
        setShowAttachment(false);
      } else {
        console.log('denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPhoneNumber = async () => {
    return selectContactPhone().then(selection => {
      if (!selection) {
        return null;
      }

      let {contact, selectedPhone} = selection;
      console.log(
        `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
      );
      return selectedPhone.number;
    });
  };

  return (
    <View style={[container.container, {backgroundColor: 'E5E5E5'}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{paddingRight: 20}}
          onPress={() => props.navigation.goBack()}>
          <AntDesign name="left" size={18} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() =>
            props.navigation.navigate('UserDetails', {
              user: user,
            })
          }>
          {user.image !== null ? (
            <Avatar.Image
              size={35}
              source={require('../../../assets/user.jpg')}
            />
          ) : (
            <Avatar.Image
              source={{uri: Url.profile_IMG + user.image}}
              size={35}
              backgroundColor={COLORS.black}
            />
          )}
          <Entypo
            style={{marginTop: 19, marginLeft: -22}}
            name="dot-single"
            size={42}
            color="#51DD78"
          />
          <Text
            style={[
              paraGray.darkpara,
              {fontFamily: 'Poppins-SemiBold', width: '80%'},
            ]}
            numberOfLines={1}>
            {user.name}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          {user.type !== 'group' && (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.lightpurple,
                height: 30,
                width: 30,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
              onPress={() =>
                props.navigation.navigate('PhoneCall', {
                  user: user,
                })
              }>
              <Ionicons
                // style={}
                name="call"
                size={15}
                color={COLORS.active}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightpurple,
              height: 30,
              width: 30,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}>
            <Ionicons
              // style={}
              name="search"
              size={18}
              color={COLORS.active}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // backgroundColor: 'rgba(45, 140, 255, 0.25)',
              height: 30,
              width: 30,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              // marginRight: 5,
            }}
            onPress={showModal}>
            <Entypo
              // style={}
              name="dots-three-vertical"
              size={15}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{borderBottomWidth: 1, borderBottomColor: COLORS.background}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'center',
          }}>
          <ImageBackground
            style={{
              backgroundColor: 'rgba(45, 140, 255, 0.15)',
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Text style={paraGray.darkpara}>Today</Text>
          </ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 60,
            marginTop: 10,
          }}>
          <ImageBackground
            style={{
              backgroundColor: COLORS.bg,
              flexDirection: 'row',
              width: '95%',
              borderRadius: 10,
            }}>
            {user.image !== null ? (
              <Avatar.Image
                style={{marginTop: 10, marginLeft: 5, marginBottom: 10}}
                size={35}
                source={require('../../../assets/user.jpg')}
              />
            ) : (
              <Avatar.Image
                style={{marginTop: 10, marginLeft: 5, marginBottom: 10}}
                source={{uri: Url.profile_IMG + user.image}}
                size={35}
                backgroundColor={COLORS.black}
              />
            )}
            <Text
              style={[
                paraGray.darkpara,
                {
                  color: '#181818',
                  marginLeft: 10,
                  marginRight: 50,
                  marginTop: 10,
                  marginBottom: 15,
                },
              ]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '90%',
            marginTop: -20,
          }}>
          <Text style={[paraGray.darkpara, {color: '#4F4F4F'}]}>
            1 hour ago
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            borderRadius: 60,
            marginTop: 10,
          }}>
          <ImageBackground
            style={{
              backgroundColor: COLORS.active,
              flexDirection: 'row-reverse',
              width: '95%',
              borderRadius: 10,
            }}>
            {user.image !== null ? (
              <Avatar.Image
                style={{marginTop: 10, marginBottom: 10, marginRight: 5}}
                size={35}
                source={require('../../../assets/user.jpg')}
              />
            ) : (
              <Avatar.Image
                style={{marginTop: 10, marginBottom: 10, marginRight: 5}}
                source={{uri: Url.profile_IMG + user.image}}
                size={35}
                backgroundColor={COLORS.black}
              />
            )}
            <Text
              style={[
                paraGray.darkpara,
                {
                  color: COLORS.bg,
                  marginLeft: 50,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 15,
                },
              ]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '90%',
            marginTop: -20,
          }}>
          <Text style={[paraGray.darkpara, {color: COLORS.bg}]}>
            30 Minutes
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          height: showattachment == true ? 150 : 90,
          marginTop: 10,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: COLORS.background,
        }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: 8,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.lightGray,
              flex: 1,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLORS.background,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // onPress={() => setShowEmoji(!showEmoji)}
            >
              <FontAwesome
                style={{marginLeft: 5, marginRight: 5}}
                name="smile-o"
                size={28}
                color={COLORS.active}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowAttachment(!showattachment)}>
              {showattachment == true ? (
                <Entypo
                  style={{marginLeft: 5, marginRight: 5}}
                  name="circle-with-cross"
                  size={25}
                  color={COLORS.active}
                />
              ) : (
                <Entypo
                  style={{marginLeft: 5, marginRight: 5}}
                  name="attachment"
                  size={22}
                  color={COLORS.active}
                />
              )}
            </TouchableOpacity>
            <TextInput
              style={[
                paraGray.darkpara,
                {
                  backgroundColor: COLORS.lightGray,
                  flex: 1,
                  borderRadius: 5,
                },
              ]}
              // value={emoji}
              placeholder="Message..."
              onChangeText={value =>
                value == '' ? setSendButton(false) : setSendButton(true)
              }
            />
          </View>
          {sendbutton === false ? (
            <TouchableOpacity
              style={{
                width: 50,
                marginLeft: 10,
                // backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.background,
                borderRadius: 5,
              }}>
              <FontAwesome
                // style={}
                name="microphone"
                size={25}
                color={COLORS.active}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 50,
                marginLeft: 10,
                // backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.background,
                borderRadius: 5,
              }}>
              <Ionicons
                // style={}
                name="ios-send-sharp"
                size={25}
                color={COLORS.active}
              />
            </TouchableOpacity>
          )}
        </View>
        {showattachment == true && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={requestContactPermission}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightSkyblue,
                  }}>
                  <MaterialIcons
                    name="contact-page"
                    size={25}
                    color={COLORS.blue}
                  />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={SelectImage}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightred,
                  }}>
                  <FontAwesome name="photo" size={25} color={COLORS.red} />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  Image
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={selectFile}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightSkygreen,
                  }}>
                  <MaterialIcons
                    name="file-copy"
                    size={25}
                    color={COLORS.green}
                  />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  File
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <View
                  style={{
                    width: 45,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightSkyyellow,
                  }}>
                  <Entypo name="location-pin" size={28} color={COLORS.yellow} />
                </View>
                <Text
                  style={[
                    paraGray.darkpara,
                    {marginTop: 5, marginBottom: 10, fontSize: 12},
                  ]}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {showEmoji === true && (
        <ScrollView style={[paraGray.darkpara, {marginBottom: 10}]}>
          <EmojiSelector
            style={[paraGray.darkpara]}
            category={Categories.all}
            columns={8}
            // onEmojiSelected={emoji => setEmoji(emoji, console.log(emoji))}
          />
        </ScrollView>
      )}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          width: '80%',
          height: 300,
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={[paraGray.darkpara]}>Mute Chats</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={[paraGray.darkpara]}>Delete Chats</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
          <Text style={[paraGray.darkpara]}>Report</Text>
        </View>
        {user.type == 'group' ? (
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
            <Text style={[paraGray.darkpara]}>Exit Group</Text>
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
            <Text style={[paraGray.darkpara]}>Block</Text>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default ChatDetail;
