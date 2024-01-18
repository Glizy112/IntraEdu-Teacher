import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import {Header} from '../../Components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Url from '../../Config/Api/Url';
import {useFocusEffect} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-detect';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
const Ptm = props => {
  const {
    userinfo,
    userid,
    username,
    showmodal,
    userimage,
    schoolid,
    teacherid,
  } = useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexx, setIndexx] = useState(0);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [join, setjoin] = useState([]);

  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      let resp = await fetch(`${Url.ptmByTeacherId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          // console.log('PTM List Response===> ', result);
          setData(result.data);
          newArray(result.data);
          // setLoading(false);
        });
    } catch (error) {
      console.log('PTM List Error => ' + error);
      setLoading(false);
    }
  };

  const newArray = data => {
    let list = [];
    data.map((sub, index) => {
      list.push(false);
    });
    setjoin(list);
    datetime(data);
  };

  const datetime = data => {
    let times = Moment().format('HH : mm');
    data.map((sub, index) => {
      let today = new Date();
      let dates =
        (today.getDate() > 9 ? today.getDate() : '0' + today.getDate()) +
        '/' +
        (today.getMonth() + 1) +
        '/' +
        today.getFullYear();
      let list = [...join];
      if (sub.mode === 'Online') {
        if (sub.ptm_date == dates) {
          times >= sub.ptm_time
            ? (join[index] = times <= sub.end_time ? true : false)
            : (join[index] = false);
        } else {
          join[index] = false;
        }
      } else {
        join[index] = false;
      }
      setjoin(list);
    });
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        {/* <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName="PTM"
          marginLeft
          back
          time
          onPresss={() => props.navigation.navigate('PTMHistory')}
        /> */}
      </View>
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
            Create Meeting
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PTMHistory')}>
          <Entypo
            style={{}}
            name="back-in-time"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1}}>
          {/* <Swiper
            height={300}
            showsButtons={false}
            showsPagination={true}
            autoplay={true}
            loop={true}
            // index={indexx}
          >
            {getdata.map((sub, index) => (
              <View
                key={index}
                style={{
                  // flex: 1,
                  marginTop: 30,
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: COLORS.border,

                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      //backgroundColor: COLORS.lighterblue,
                      borderRadius: 6,
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                    }}>
                    <Text style={[paraGray.darkpara, {color: COLORS.black}]}>
                      {sub.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={[paraGray.lightPara, {color: COLORS.lightblack}]}>
                    Stream
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {fontSize: 14, color: COLORS.black},
                    ]}>
                    {sub.class_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[paraGray.lightPara, {color: COLORS.lightblack}]}>
                    PTM Date
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {fontSize: 14, color: COLORS.black},
                    ]}>
                    {sub.ptm_date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[paraGray.lightPara, {color: COLORS.lightblack}]}>
                    PTM Timing
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {fontSize: 14, color: COLORS.black},
                    ]}>
                    {Moment(sub.ptm_time['HH.mm']).format('hh:mm a')}
                  </Text>
                </View>
                {join[index] === true ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.bluee,
                      width: '100%',
                      height: 45,
                      alignSelf: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                    }}
                    // onPress={{}}
                  >
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Join Session
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{height: 45}}></View>
                )}
              </View>
            ))}
          </Swiper> */}
          <SwiperFlatList
            style={{
              backgroundColor: 'white',
              flex: 1,

              // height: hp('55%'),
              // paddingVertical: 50,
            }}
            paginationStyle={{}}
            paginationStyleItemActive={{width: 10, height: 10}}
            paginationStyleItem={{width: 10, height: 10}}
            data={getdata}
            getCurrentIndex={item => console.log(item)}
            // paginationStyle={{position: 'absolute', zIndex: 99}}
            showPagination={true}
            horizontal={true}
            paginationActiveColor="blue"
            renderItem={({item: sub, index}) => (
              <View
                style={{
                  width: wp('100%'),
                  alignSelf: 'center',
                  //height: '40%',
                  paddingBottom: 50,
                }}>
                <View
                  key={index}
                  style={{
                    // flex: 1,
                    marginTop: 30,

                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: COLORS.border,

                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        //backgroundColor: COLORS.lighterblue,
                        borderRadius: 6,
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                      }}>
                      <Text style={[paraGray.darkpara, {color: COLORS.black}]}>
                        {sub.title}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                      marginVertical: 5,
                    }}>
                    <Text
                      style={[paraGray.lightPara, {color: COLORS.lightblack}]}>
                      Stream
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 14, color: COLORS.black},
                      ]}>
                      {sub.class_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={[paraGray.lightPara, {color: COLORS.lightblack}]}>
                      PTM Date
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 14, color: COLORS.black},
                      ]}>
                      {sub.ptm_date}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[paraGray.lightPara, {color: COLORS.lightblack}]}>
                      PTM Timing
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {fontSize: 14, color: COLORS.black},
                      ]}>
                      {Moment(sub.ptm_time['HH.mm']).format('hh:mm a')}
                    </Text>
                  </View>
                  {join[index] === true ? (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.bluee,
                        width: '100%',
                        height: 45,
                        alignSelf: 'center',
                        marginTop: 20,
                        marginBottom: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                      }}
                      // onPress={{}}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        Join Session
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{height: 45}}></View>
                  )}
                </View>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => {
              props.navigation.navigate('CreateMeeting');
            }}>
            <View
              style={{
                //borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.bluee,
                marginBottom: 10,
                width: '80%',
                height: '100%',
                backgroundColor: COLORS.bgColor,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                }}>
                <Image
                  style={{height: 80, width: 85}}
                  source={require('../../../assets/MeetingRoom(1).png')}
                />
                <Text style={[paraGray.largebold, {fontSize: 14}]}>
                  Create Meeting
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            // onPress={() => {
            //   props.navigation.navigate('CreateMeeting');
            // }}
          >
            <View
              style={{
                //borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.bluee,
                marginBottom: 10,
                width: '80%',
                height: '100%',
                backgroundColor: COLORS.bgColor,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                }}>
                <Image
                  style={{height: 80, width: 85}}
                  source={require('../../../assets/AttendancePTM.png')}
                />
                <Text style={[paraGray.largebold, {fontSize: 14}]}>
                  Attendance
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Ptm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    alignSelf: 'center',
    width: '80%',

    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
