import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Avatar, Surface } from 'react-native-paper';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const event_IMG = 'http://intraedu.in/admin/assets/uploads/event/';
const HistoryAnnouncement = props => {
  const { schoolid } = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setdata] = useState([]);

  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.list_notice}`, {
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
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={loading} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}>
          {getdata.map((notice, index) => (
            <View style={{ paddingHorizontal: 10 }} key={index}>
              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    height: deviceHeight / 4.3,
                    width: deviceWidth / 2.5,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.skypurple,
                    backgroundColor: COLORS.skypurple,
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    props.navigation.navigate('HistoryDetailAnn', {
                      notice: getdata[index],
                    })
                  }>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 20,
                      marginBottom: 10,
                      justifyContent: 'center',
                    }}>
                    {notice.image == null ? (
                      <Image
                        style={{
                          height: '125%',
                          width: '45%',
                          marginLeft: 10,
                          borderRadius: 10,
                        }}
                        source={require('../../../assets/nullimage.png')}
                      />
                    ) : (
                      <FastImage
                        style={{
                          height: '125%',
                          width: '45%',
                          marginLeft: 10,
                          borderRadius: 10,
                        }}
                        source={{
                          uri: Url.notice_IMG + notice.image,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { marginLeft: 10, marginTop: 10 },
                    ]}>
                    {notice.title}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { marginLeft: 10, color: COLORS.active },
                      ]}>
                      {Moment(notice.created_at).format('d MMM')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 220,
            }}>
            <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default HistoryAnnouncement;
