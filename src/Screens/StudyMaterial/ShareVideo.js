import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Image,
  Linking,
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useFocusEffect} from '@react-navigation/native';
import {createThumbnail} from 'react-native-create-thumbnail';

const ShareVideo = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [getthumb, setthumb] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  useEffect(() => {
    getapiData();
    thumb();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.listMaterialLink}`, {
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
          // console.log(result);
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('StudyMaterial Video List Error => ' + error);
      setLoading(false);
    }
  };

  const thumb = async () => {
    const response = await createThumbnail({
      url: 'https://www.youtube.com/watch?v=lgj3D5-jJ74',
      timeStamp: 10000,
    })
      .then(response => console.log({response}), setthumb(response.path))
      .catch(err => console.log({err}));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  const handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Invalid Link');
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {getdata.map((data, index) => (
            <View
              style={{flex: 1, paddingHorizontal: 10, marginVertical: 10}}
              key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.bg,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.active,
                  // backgroundColor: COLORS.active,
                  paddingVertical: 10,
                }}
                onPress={() => handleClick(data.youtube_link)}>
                <ImageBackground
                  style={{
                    height: 150,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.background,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      index % 2 === 0
                        ? 'https://thumbs.dreamstime.com/b/time-to-study-school-tools-around-blackboard-background-46060556.jpg'
                        : 'https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/750-arm-a-b-test-blog-post-image.png',
                  }}>
                  <FontAwesome
                    name="youtube-play"
                    size={50}
                    color={COLORS.bg}
                  />
                </ImageBackground>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                      {data.title}
                    </Text>
                    <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                      (Std:{data.class_name})
                    </Text>
                  </View>
                  <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                    {data.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {loading == false && getdata == '' && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 120,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ShareVideo;
