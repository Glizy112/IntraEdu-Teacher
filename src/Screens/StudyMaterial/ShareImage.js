import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import { useFocusEffect } from '@react-navigation/native';
import { ApiMethod } from '../../Config/Api/ApiMethod';
import { ImageSlider } from 'react-native-image-slider-banner';

const ShareImage = props => {
  const dispatch = useDispatch();
  const { userinfo, userid, username, showmodal, userimage, schoolid } =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getimg, setImg] = useState([]);

  useEffect(() => {
    getapiData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('teacher_id', userid);
    await ApiMethod(Url.listMaterialImage,formData)
      .then(result => {
        console.log("Result Response==> ", result);
        if (result != false) {
          setData(result.data);
          image(result.data)
        }
        setLoading(false);
      });
  };

  const image = (data) => {
    var list = [];
    data.map((item, i) => {
      var myArray = JSON.parse(item.image);
      myArray.map((items, index) => {
        var newdata = {
          img: Url.material_IMG + items
        };
        list.push(newdata);
      })
    });
    setImg(list);
  }

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
  clcDeviceHeightWidth = (height, width) => {
    let deviceHeight = Dimensions.get('window').height;
    let deviceWidth = Dimensions.get('window').width;
    if (height && width)
      return {
        height: deviceHeight / height,
        width: deviceWidth / width,
      };
  }
  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
          {getdata.map((data, index) => (
            <View
              style={{ flex: 1, paddingHorizontal: 10, marginVertical: 10 }}
              key={index}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.bg,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingHorizontal: 0,
                  borderWidth: 1,
                  borderColor: COLORS.active,
                  // backgroundColor: COLORS.active,
                  paddingVertical: 0,
                }}>
                <ImageSlider
                  data={getimg}
                  caroselImageStyle={
                    [
                      clcDeviceHeightWidth(3, 1),
                      {
                        resizeMode: 'cover',
                      },
                    ]}
                  activeIndicatorStyle={{
                    borderRadius: 100,
                  }}
                  showIndicator={false}
                  caroselImageContainerStyle={[clcDeviceHeightWidth(3, 1)]}
                  autoPlay={true}
                  closeIconColor="#fff"
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: 5,
                    paddingHorizontal: 10,
                    paddingBottom: 5
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, { color: COLORS.bluee }]}>
                      {data.title}
                    </Text>
                    <Text style={[paraGray.darkpara, { color: COLORS.active }]}>
                      (Std:{data.class_name})
                    </Text>
                  </View>
                  <Text style={[paraGray.darkpara, { color: COLORS.section }]}>
                    {data.description}
                  </Text>
                </View>
              </View>
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
              backgroundColor: COLORS.bg,
              marginTop: 120,
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

export default ShareImage;
