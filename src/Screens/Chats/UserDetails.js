import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  FlatList,
  BackHandler,
} from 'react-native';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {DataTable, Avatar, Switch} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const UserDetails = props => {
  const {user} = props.route.params;
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [active, setActive] = useState('media');
  const [subactive, setSubActive] = useState('1');
  const [getdata, setdata] = useState([]);
  const [studentlist, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [desc, setdesc] = useState('');
  const [image, setImage] = useState(null);
  const list = [
    {label: 'All participant', value: 'All participant'},
    {label: 'Admin', value: 'Admin'},
  ];
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(list[0].label);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [showlist, setShowList] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);

  // <-----------Add Member's Data-------------->
  const [selected, setSelected] = useState([]);
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name'];
  const [search, setSearch] = useState('');
  const [getListdata, setGetListdata] = useState([]);
  const filterdata = getListdata.filter(createFilter(search, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setSearch(term);
  };

  useEffect(() => {
    getapiData();
    getStudents();
    console.log(user);
  }, []);

  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.list_school_gallery}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Chat UserDetail List Error => ' + error);
      setLoading(false);
    }
  };

  const files = [
    {
      id: '1',
      video: '',
      thumb:
        'https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/750-arm-a-b-test-blog-post-image.png',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
    {
      id: '2',
      video: '',
      thumb:
        'https://thumbs.dreamstime.com/b/time-to-study-school-tools-around-blackboard-background-46060556.jpg',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
    {
      id: '3',
      video: '',
      thumb:
        'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
  ];

  const PhotoRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  const FileRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    // getapiData();
  }, []);

  const LinkRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    // getapiData();
  }, []);

  // --------APICall----------

  const getStudents = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.studentList}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setStudentList(result.data);
          setGetListdata(result.data);
          setLoading(false);
          newArray(result.data);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };
  const users = [
    {
      id: '1',
      name: 'Ayush Dubey',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '10 min ago',
      image: require('../../../assets/user2.png'),
      msg: '2',
      type: 'single',
      admin: true,
    },
    {
      id: '2',
      name: 'FY(BCA)',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user1.png'),
      msg: '1',
      type: 'single',
      admin: false,
    },
    {
      id: '3',
      name: 'Simran Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user2.png'),
      msg: '4',
      type: 'single',
      admin: true,
    },
    {
      id: '4',
      name: 'SY(BCA)',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '50 min ago',
      image: require('../../../assets/user1.png'),
      msg: '0',
      type: 'single',
      admin: false,
    },
    {
      id: '5',
      name: 'Vikash Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user2.png'),
      msg: '0',
      type: 'single',
      admin: false,
    },
  ];

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

  const newArray = data => {
    let list = [];
    data.map((value, index) => {
      list.push(false);
    });
    setSelected(list);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return showlist == false ? (
    <View style={[container.container]}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.bg}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.black}
          back
          headerFirstName={''}
          marginLeft
          // rightdownload
          // onPresss={{}}
        />
      </View>
      {loading == true && <Spinner visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {user.image == null ? (
              <Avatar.Image
                size={140}
                // source={{uri: Url.student_IMG + student.photo}}
                source={require('../../../assets/user.jpg')}
                backgroundColor={COLORS.black}
              />
            ) : image == null ? (
              <Avatar.Image
                size={140}
                // source={{uri: Url.student_IMG + student.photo}}
                source={user.image}
                backgroundColor={COLORS.black}
              />
            ) : (
              <Avatar.Image
                size={140}
                // source={{uri: Url.student_IMG + student.photo}}
                source={{uri: image}}
                backgroundColor={COLORS.black}
              />
            )}
            <Text
              style={[
                paraGray.darklarge,
                {fontFamily: 'Montserrat-SemiBold', marginTop: 10},
              ]}>
              {user.name}
            </Text>
            <Text
              style={[
                paraGray.darkpara,
                {marginTop: 5, color: COLORS.lightblack},
              ]}>
              {desc == '' ? 'Description' : desc}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.5,
              borderColor: COLORS.background,
              marginTop: 10,
              marginBottom: 15,
            }}
          />
          {user.type == 'group' ? (
            <View style={{flex: 1}}>
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
                      borderBottomWidth: 1,
                      borderColor:
                        active == '1' ? COLORS.active : COLORS.background,
                    }}
                    onPress={() => (user.admin == true ? setActive('1') : '')}>
                    <View
                      style={{
                        width: 45,
                        height: 40,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightSkyblue,
                      }}>
                      {user.admin == true ? (
                        <FontAwesome5
                          name="pen"
                          size={22}
                          color={COLORS.blue}
                        />
                      ) : (
                        <Ionicons
                          // style={}
                          name="search"
                          size={18}
                          color={COLORS.active}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      {user.admin == true ? 'Edit' : 'Search'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor:
                        active == 'media' ? COLORS.active : COLORS.background,
                    }}
                    onPress={() => {
                      setActive('media'), getapiData();
                    }}>
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
                        name="photo-library"
                        size={25}
                        color={COLORS.green}
                      />
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      Media
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor:
                        active == '4' ? COLORS.active : COLORS.background,
                    }}
                    onPress={() => {
                      setActive('4');
                      // getStudents();
                    }}>
                    <View
                      style={{
                        width: 45,
                        height: 40,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightSkyyellow,
                      }}>
                      <FontAwesome5
                        name="user-alt"
                        size={22}
                        color={COLORS.yellow}
                      />
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      Participant
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {active == '1' ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {marginVertical: 10, fontFamily: 'Poppins-SemiBold'},
                        ]}>
                        Send message
                      </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Dropdown
                        style={{
                          height: 40,
                          borderColor: issectionFocus ? 'blue' : 'gray',
                          borderWidth: 1,
                          borderRadius: 8,
                          paddingHorizontal: 8,
                          borderColor: COLORS.border,
                        }}
                        placeholderStyle={{
                          fontSize: 16,
                          fontFamily: 'Montserrat-Regular',
                        }}
                        selectedTextStyle={{
                          fontSize: 16,
                          fontFamily: 'Montserrat-Regular',
                        }}
                        inputSearchStyle={{
                          height: 40,
                          fontSize: 16,
                          fontFamily: 'Montserrat-Regular',
                        }}
                        iconStyle={{
                          width: 20,
                          height: 20,
                        }}
                        data={list.map(item => ({
                          label: item.label,
                          value: item.value,
                        }))}
                        search
                        containerStyle={{
                          backgroundColor: COLORS.background,
                          borderColor: '#E5E5E5',
                        }}
                        fontFamily={'Montserrat-Regular'}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!issectionFocus ? 'Send Message' : '...'}
                        searchPlaceholder="Search..."
                        value={section}
                        onFocus={() => setIsSectionFocus(true)}
                        onBlur={() => setIsSectionFocus(false)}
                        onChange={item => {
                          setSelectedSection(item);
                          setSection(item.value);
                          setIsSectionFocus(false);
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {marginVertical: 10, fontFamily: 'Poppins-SemiBold'},
                        ]}>
                        Change group icon
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {user.image == null ? (
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={SelectImage}>
                          <Avatar.Image
                            size={50}
                            // source={{uri: Url.student_IMG + student.photo}}
                            source={require('../../../assets/user.jpg')}
                            backgroundColor={COLORS.black}
                          />
                          <FontAwesome
                            style={{
                              marginTop: 25,
                              marginLeft: -15,
                              backgroundColor: COLORS.lightSkyblue,
                              padding: 5,
                              borderRadius: 20,
                            }}
                            name="camera"
                            size={18}
                            color={COLORS.blue}
                          />
                        </TouchableOpacity>
                      ) : image == null ? (
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={SelectImage}>
                          <Avatar.Image
                            size={50}
                            // source={{uri: Url.student_IMG + student.photo}}
                            source={user.image}
                            backgroundColor={COLORS.black}
                          />
                          <FontAwesome
                            style={{
                              marginTop: 25,
                              marginLeft: -15,
                              backgroundColor: COLORS.lightSkyblue,
                              padding: 5,
                              borderRadius: 20,
                            }}
                            name="camera"
                            size={18}
                            color={COLORS.blue}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={SelectImage}>
                          <Avatar.Image
                            size={50}
                            // source={{uri: Url.student_IMG + student.photo}}
                            source={{uri: image}}
                            backgroundColor={COLORS.black}
                          />
                          <FontAwesome
                            style={{
                              marginTop: 25,
                              marginLeft: -15,
                              backgroundColor: COLORS.lightSkyblue,
                              padding: 5,
                              borderRadius: 20,
                            }}
                            name="camera"
                            size={18}
                            color={COLORS.blue}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {marginVertical: 10, fontFamily: 'Poppins-SemiBold'},
                        ]}>
                        Group description
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.border,
                        borderRadius: 10,
                      }}>
                      <TextInput
                        placeholder="Description"
                        placeholderTextColor="#808080"
                        value={desc}
                        onChangeText={value => setdesc(value)}
                        style={{
                          marginLeft: 10,
                          backgroundColor: '#FFFFFF',
                          width: '90%',
                          height: 40,
                          fontSize: 13,
                          fontFamily: 'Montserrat-Regular',
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name="exit-to-app"
                      size={40}
                      color={COLORS.red}
                    />
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          marginVertical: 10,
                          fontFamily: 'Poppins-SemiBold',
                          color: COLORS.red,
                        },
                      ]}>
                      Exit Group
                    </Text>
                  </View>
                </View>
              ) : active == 'media' ? (
                <View
                  style={{
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    Shared Media : 50
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderColor:
                            subactive == '1'
                              ? COLORS.active
                              : COLORS.background,
                        }}
                        onPress={() => setSubActive('1')}>
                        <Text
                          style={[
                            paraGray.darklarge,
                            {
                              marginTop: 5,
                              marginBottom: 5,
                              fontFamily: 'Poppins-SemiBold',
                              color:
                                subactive == '1'
                                  ? COLORS.black
                                  : COLORS.background,
                            },
                          ]}>
                          Photos
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderColor:
                            subactive == '2'
                              ? COLORS.active
                              : COLORS.background,
                        }}
                        onPress={() => setSubActive('2')}>
                        <Text
                          style={[
                            paraGray.darklarge,
                            {
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontFamily: 'Poppins-SemiBold',
                              color:
                                subactive == '2'
                                  ? COLORS.black
                                  : COLORS.background,
                            },
                          ]}
                          onPress={() => setSubActive('2')}>
                          Files
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderColor:
                            subactive == '3'
                              ? COLORS.active
                              : COLORS.background,
                        }}
                        onPress={() => setSubActive('3')}>
                        <Text
                          style={[
                            paraGray.darklarge,
                            {
                              marginTop: 5,
                              marginBottom: 5,
                              fontFamily: 'Poppins-SemiBold',
                              color:
                                subactive == '3'
                                  ? COLORS.black
                                  : COLORS.background,
                            },
                          ]}>
                          Link
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {subactive == '1' ? (
                    <GestureRecognizer onSwipeLeft={() => setSubActive('2')}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={PhotoRefresh}
                          />
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginBottom: 20,
                          }}>
                          {getdata.map((image, index) => (
                            <TouchableOpacity
                              key={index}
                              style={{marginTop: 10}}
                              onPress={() =>
                                props.navigation.navigate('Images', {
                                  Images: getdata[index],
                                })
                              }>
                              <Image
                                source={{uri: Url.gallery_IMG + image.image}}
                                style={{
                                  height: deviceHeight / 7,
                                  width: deviceWidth / 3 - 12,
                                  borderRadius: 10,
                                  marginLeft: 4,
                                }}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                        {getdata == '' && loading == false && (
                          <View
                            style={{
                              flex: 1,
                              marginBottom: 80,
                              alignSelf: 'center',
                              justifyContent: 'center',
                              marginTop: 120,
                            }}>
                            <Text
                              style={[
                                paraGray.darklarge,
                                {textAlign: 'center'},
                              ]}>
                              NO Data Found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </GestureRecognizer>
                  ) : subactive == '2' ? (
                    <GestureRecognizer
                      onSwipeLeft={() => setSubActive('3')}
                      onSwipeRight={() => setSubActive('1')}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={FileRefresh}
                          />
                        }>
                        <View
                          style={{flex: 1, marginTop: 20, marginBottom: 20}}>
                          {files.map((data, index) => (
                            <TouchableOpacity
                              style={{
                                flex: 1,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                              }}
                              key={index}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  backgroundColor: COLORS.bg,
                                  borderRadius: 10,
                                  paddingHorizontal: 10,
                                  borderWidth: 1,
                                  borderColor: COLORS.active,
                                  // backgroundColor: COLORS.active,
                                  paddingVertical: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View style={{paddingRight: 15}}>
                                  <FontAwesome
                                    name="file-pdf-o"
                                    size={50}
                                    color={COLORS.active}
                                  />
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.bluee},
                                    ]}>
                                    {data.title}
                                  </Text>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.section},
                                    ]}>
                                    {data.desc}
                                  </Text>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.section},
                                    ]}>
                                    {data.desc}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))}
                        </View>
                        {loading == false && files == '' && (
                          <View
                            style={{
                              flex: 1,
                              marginBottom: 80,
                              alignSelf: 'center',
                              justifyContent: 'center',
                              marginTop: 120,
                            }}>
                            <Text
                              style={[
                                paraGray.darklarge,
                                {textAlign: 'center'},
                              ]}>
                              NO Data Found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </GestureRecognizer>
                  ) : (
                    subactive == '3' && (
                      <GestureRecognizer onSwipeRight={() => setSubActive('2')}>
                        <ScrollView
                          showsVerticalScrollIndicator={false}
                          refreshControl={
                            <RefreshControl
                              refreshing={refreshing}
                              onRefresh={LinkRefresh}
                            />
                          }>
                          <View
                            style={{flex: 1, marginTop: 20, marginBottom: 20}}>
                            {files.map((data, index) => (
                              <TouchableOpacity
                                style={{
                                  flex: 1,
                                  paddingHorizontal: 10,
                                  marginVertical: 10,
                                }}
                                key={index}>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.bg,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    borderWidth: 1,
                                    borderColor: COLORS.active,
                                    // backgroundColor: COLORS.active,
                                    paddingVertical: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      marginRight: 10,
                                      borderRadius: 20,
                                      backgroundColor: COLORS.active,
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {
                                          marginHorizontal: 10,
                                          marginVertical: 8,
                                        },
                                      ]}>
                                      Connect
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: COLORS.bluee},
                                      ]}>
                                      {data.title}
                                    </Text>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: COLORS.section},
                                      ]}>
                                      {data.desc}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            ))}
                          </View>
                          {loading == false && files == '' && (
                            <View
                              style={{
                                flex: 1,
                                marginBottom: 80,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                marginTop: 120,
                              }}>
                              <Text
                                style={[
                                  paraGray.darklarge,
                                  {textAlign: 'center'},
                                ]}>
                                NO Data Found
                              </Text>
                            </View>
                          )}
                        </ScrollView>
                      </GestureRecognizer>
                    )
                  )}
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                      Participant : 50
                    </Text>
                    {user.admin == true && (
                      <TouchableOpacity
                        onPress={() => setShowList(true, getStudents)}>
                        <Text style={[paraGray.darkpara, {color: COLORS.blue}]}>
                          Add Participant
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingBottom: 30,
                      marginLeft: 10,
                      paddingTop: 20,
                    }}>
                    {users.map((student, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{marginHorizontal: 3}}
                        onPress={() =>
                          props.navigation.navigate('GroupUserDetail', {
                            groupuser: users[index],
                            userdetail: user,
                          })
                        }>
                        {student.photo == null ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginRight: student.admin == false ? 15 : 0,
                            }}>
                            <Avatar.Image
                              size={50}
                              // source={require('../../../assets/user.jpg')}
                              source={student.image}
                              backgroundColor={COLORS.bg}
                            />
                            {student.admin == true && (
                              <Entypo
                                style={{marginTop: 15, marginLeft: -33}}
                                name="dot-single"
                                size={50}
                                color="#51DD78"
                              />
                            )}
                          </View>
                        ) : (
                          <View style={{flexDirection: 'row'}}>
                            <Avatar.Image
                              size={50}
                              source={{uri: Url.student_IMG + student.photo}}
                              backgroundColor={COLORS.black}
                            />
                            {student.admin == true && (
                              <Entypo
                                style={{marginTop: 15, marginLeft: -33}}
                                name="dot-single"
                                size={50}
                                color="#51DD78"
                              />
                            )}
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={{flex: 1}}>
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
                      borderBottomWidth: 1,
                      borderColor:
                        active == '1' ? COLORS.active : COLORS.background,
                    }}
                    onPress={() =>
                      props.navigation.navigate('PhoneCall', {
                        user: user,
                      })
                    }>
                    <View
                      style={{
                        width: 45,
                        height: 40,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightSkyblue,
                      }}>
                      <Ionicons name="call" size={20} color={COLORS.blue} />
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      Call
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor:
                        active == 'media' ? COLORS.active : COLORS.background,
                    }}
                    onPress={() => {
                      setActive('media'), getapiData();
                    }}>
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
                        name="photo-library"
                        size={25}
                        color={COLORS.green}
                      />
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      Media
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: COLORS.background,
                    }}
                    onPress={() => {
                      props.navigation.navigate('UserProfile', {student: user});
                    }}>
                    <View
                      style={{
                        width: 45,
                        height: 40,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightSkyyellow,
                      }}>
                      <FontAwesome5
                        name="user-alt"
                        size={22}
                        color={COLORS.yellow}
                      />
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {active == 'media' && (
                <View
                  style={{
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    Shared Media : 50
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderColor:
                            subactive == '1'
                              ? COLORS.active
                              : COLORS.background,
                        }}
                        onPress={() => setSubActive('1')}>
                        <Text
                          style={[
                            paraGray.darklarge,
                            {
                              marginTop: 5,
                              marginBottom: 5,
                              fontFamily: 'Poppins-SemiBold',
                              color:
                                subactive == '1'
                                  ? COLORS.black
                                  : COLORS.background,
                            },
                          ]}>
                          Photos
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderColor:
                            subactive == '2'
                              ? COLORS.active
                              : COLORS.background,
                        }}
                        onPress={() => setSubActive('2')}>
                        <Text
                          style={[
                            paraGray.darklarge,
                            {
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontFamily: 'Poppins-SemiBold',
                              color:
                                subactive == '2'
                                  ? COLORS.black
                                  : COLORS.background,
                            },
                          ]}
                          onPress={() => setSubActive('2')}>
                          Files
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth: 1,
                          borderColor:
                            subactive == '3'
                              ? COLORS.active
                              : COLORS.background,
                        }}
                        onPress={() => setSubActive('3')}>
                        <Text
                          style={[
                            paraGray.darklarge,
                            {
                              marginTop: 5,
                              marginBottom: 5,
                              fontFamily: 'Poppins-SemiBold',
                              color:
                                subactive == '3'
                                  ? COLORS.black
                                  : COLORS.background,
                            },
                          ]}>
                          Link
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {subactive == '1' ? (
                    <GestureRecognizer onSwipeLeft={() => setSubActive('2')}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={PhotoRefresh}
                          />
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginBottom: 20,
                          }}>
                          {getdata.map((image, index) => (
                            <TouchableOpacity
                              key={index}
                              style={{marginTop: 10}}
                              onPress={() =>
                                props.navigation.navigate('Images', {
                                  Images: getdata[index],
                                })
                              }>
                              <Image
                                source={{uri: Url.gallery_IMG + image.image}}
                                style={{
                                  height: deviceHeight / 7,
                                  width: deviceWidth / 3 - 12,
                                  borderRadius: 10,
                                  marginLeft: 4,
                                }}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                        {getdata == '' && loading == false && (
                          <View
                            style={{
                              flex: 1,
                              marginBottom: 80,
                              alignSelf: 'center',
                              justifyContent: 'center',
                              marginTop: 120,
                            }}>
                            <Text
                              style={[
                                paraGray.darklarge,
                                {textAlign: 'center'},
                              ]}>
                              NO Data Found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </GestureRecognizer>
                  ) : subactive == '2' ? (
                    <GestureRecognizer
                      onSwipeLeft={() => setSubActive('3')}
                      onSwipeRight={() => setSubActive('1')}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={FileRefresh}
                          />
                        }>
                        <View
                          style={{flex: 1, marginTop: 20, marginBottom: 20}}>
                          {files.map((data, index) => (
                            <TouchableOpacity
                              style={{
                                flex: 1,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                              }}
                              key={index}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  backgroundColor: COLORS.bg,
                                  borderRadius: 10,
                                  paddingHorizontal: 10,
                                  borderWidth: 1,
                                  borderColor: COLORS.active,
                                  // backgroundColor: COLORS.active,
                                  paddingVertical: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View style={{paddingRight: 15}}>
                                  <FontAwesome
                                    name="file-pdf-o"
                                    size={50}
                                    color={COLORS.active}
                                  />
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.bluee},
                                    ]}>
                                    {data.title}
                                  </Text>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.section},
                                    ]}>
                                    {data.desc}
                                  </Text>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.section},
                                    ]}>
                                    {data.desc}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))}
                        </View>
                        {loading == false && files == '' && (
                          <View
                            style={{
                              flex: 1,
                              marginBottom: 80,
                              alignSelf: 'center',
                              justifyContent: 'center',
                              marginTop: 120,
                            }}>
                            <Text
                              style={[
                                paraGray.darklarge,
                                {textAlign: 'center'},
                              ]}>
                              NO Data Found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </GestureRecognizer>
                  ) : (
                    subactive == '3' && (
                      <GestureRecognizer onSwipeRight={() => setSubActive('2')}>
                        <ScrollView
                          showsVerticalScrollIndicator={false}
                          refreshControl={
                            <RefreshControl
                              refreshing={refreshing}
                              onRefresh={LinkRefresh}
                            />
                          }>
                          <View
                            style={{flex: 1, marginTop: 20, marginBottom: 20}}>
                            {files.map((data, index) => (
                              <TouchableOpacity
                                style={{
                                  flex: 1,
                                  paddingHorizontal: 10,
                                  marginVertical: 10,
                                }}
                                key={index}>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.bg,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    borderWidth: 1,
                                    borderColor: COLORS.active,
                                    // backgroundColor: COLORS.active,
                                    paddingVertical: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      marginRight: 10,
                                      borderRadius: 20,
                                      backgroundColor: COLORS.active,
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {
                                          marginHorizontal: 10,
                                          marginVertical: 8,
                                        },
                                      ]}>
                                      Connect
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: COLORS.bluee},
                                      ]}>
                                      {data.title}
                                    </Text>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: COLORS.section},
                                      ]}>
                                      {data.desc}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            ))}
                          </View>
                          {loading == false && files == '' && (
                            <View
                              style={{
                                flex: 1,
                                marginBottom: 80,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                marginTop: 120,
                              }}>
                              <Text
                                style={[
                                  paraGray.darklarge,
                                  {textAlign: 'center'},
                                ]}>
                                NO Data Found
                              </Text>
                            </View>
                          )}
                        </ScrollView>
                      </GestureRecognizer>
                    )
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          // back
          headerFirstName="Chats"
          marginLeft
        />
      </View>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 2,
              borderWidth: 2,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Names."
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather name="search" size={29} color="#000000" />
          </View>
        </View>
        <View>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item, index) => String(index)}
            data={filterdata}
            renderItem={({item, index, separators}) => {
              return (
                <View
                  style={[
                    {
                      flex: 1,
                      backgroundColor:
                        selected[index] == true
                          ? COLORS.background
                          : 'transparent',
                    },
                  ]}
                  key={index}>
                  <TouchableOpacity
                    style={styles.userinfo}
                    onPress={() => {
                      let list = [...selected];
                      selected[index] == true
                        ? (list[index] = false)
                        : (list[index] = true);
                      setSelected(list);
                    }}>
                    <DataTable>
                      <DataTable.Row style={{borderBottomWidth: 0}}>
                        <DataTable.Cell>
                          {item.photo == null ? (
                            <ImageBackground
                              style={{
                                backgroundColor: COLORS.black,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 45,
                                height: 45,
                                borderRadius: 30,
                              }}>
                              <FontAwesome5
                                name="user-alt"
                                size={25}
                                color="#FFFFFF"
                              />
                            </ImageBackground>
                          ) : (
                            <Avatar.Image
                              size={50}
                              source={{uri: Url.student_IMG + item.photo}}
                              backgroundColor={COLORS.black}
                            />
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell style={{flex: 4.5}}>
                          <Text style={styles.label}>{item.student_name}</Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    </DataTable>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        {filterdata.length == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              marginTop: 80,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
      {filterdata !== '' && loading == false && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 40,
            paddingTop: 30,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: COLORS.bg,
              height: 60,
              borderColor: COLORS.black,
              alignSelf: 'center',
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: COLORS.bg,
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onPress={() => setShowList(false)}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: COLORS.black,
              height: 60,
              borderColor: COLORS.bg,
              alignSelf: 'center',
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onPress={() => setShowList(false)}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Add
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    // height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
    paddingBottom: 10,
  },
  userinfo: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    flexDirection: 'row',
    color: 'black', // <-- The magic
    textAlign: 'center', // <-- The magic
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000000',
  },
  centeredView: {
    // flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '30%',
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  selected: {backgroundColor: '#FA7B5F'},
});
