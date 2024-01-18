import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import {ListItem} from '@rneui/themed';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
  setuserImage,
} from '../../Redux/Actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ComplaintHistory = props => {
  const dispatch = useDispatch();
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
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showDetails, setShowDetails] = useState(false);
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name', 'leave_from'];
  const [state, setState] = useState({searchTerm: ''});

  const filterleaves = getdata.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

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
      console.log('Send Data ==>', formData);
      let resp = await fetch(`${Url.teacher_complain}`, {
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
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Leave List Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
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
              alignbooks: 'center',
              backgroundColor: '#FFFFFF',

              width: '100%',
              //paddingBottom: 10,
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 0,
              borderWidth: 2,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Names./Date"
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 2,
                marginTop: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather
              style={{marginTop: 6}}
              name="search"
              size={29}
              color="#000000"
            />
          </View>
        </View>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
            }}>
            <List.Section style={{}}>
              <View
                style={{
                  // backgroundColor: COLORS.bg,
                  backgroundColor: COLORS.bgColor,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  //borderWidth: 2,
                  // borderWidth: 0.6,
                  //borderColor: COLORS.background,
                  borderColor: COLORS.primary,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[paraGray.darkpara, {fontSize: 16}]}>
                    {/* {data.student_name} */}
                    kasdjoasjoi
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, fontSize: 16},
                    ]}>
                    {/* {data.class_name} */}
                    fifth
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.primary, fontSize: 16},
                    ]}>
                    {/* {data.title} */}
                    History
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, fontSize: 16},
                    ]}>
                    {/* {data.created_at} */}
                    12/03/10
                  </Text>
                </View>

                <ListItem.Accordion
                  containerStyle={{
                    backgroundColor: 'white',
                    //borderWidth: 0.4,
                    // borderColor: '#275CE0',
                    //height: 80,
                    // paddingVertical: 15,
                    // marginTop: 15,
                    borderRadius: 16,
                    // marginBottom: 15,
                  }}
                  style={
                    showDetails
                      ? {
                          backgroundColor: 'white',

                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          marginTop: 10,
                        }
                      : {
                          backgroundColor: 'white',

                          borderRadius: 16,
                          marginBottom: 10,
                          marginTop: 10,
                        }
                  }
                  content={
                    <ListItem.Content style={{}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',

                          //alignSelf: 'center',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Text style={[paraGray.parahome, {fontSize: 14}]}>
                              {showDetails ? 'Details' : 'ViewDetail'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ListItem.Content>
                  }
                  icon={
                    <View
                      style={{
                        backgroundColor: 'rgba(39, 92, 224, 0.15)',
                        borderRadius: 50,
                        alignItems: 'center',
                        alignSelf: 'center',
                        // width: 32,
                        // height: 32,
                        padding: 3,
                      }}>
                      <Ionicons name="chevron-down" size={20} color={'black'} />
                    </View>
                  }
                  isExpanded={showDetails}
                  onPress={() => {
                    setShowDetails(!showDetails);
                  }}>
                  <ScrollView
                    contentContainerStyle={{
                      // borderWidth: 1,
                      marginTop: -15,
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                    }}
                    style={{
                      borderRadius: 16,
                      backgroundColor: 'white',
                      marginBottom: 10,
                    }}>
                    <ListItem
                      style={{
                        borderRadius: 16,
                        paddingBottom: 10,
                      }}>
                      <ListItem.Content style={{}}>
                        <View style={{}}>
                          <View
                            style={{
                              width: '100%',
                              alignSelf: 'center',
                              borderRadius: 16,
                            }}>
                            <Text
                              style={[
                                paraGray.largebold,
                                {color: COLORS.red, fontSize: 14},
                              ]}>
                              Complaint :
                            </Text>
                            <View
                              style={{
                                flex: 1,
                                marginLeft: 20,
                                marginBottom: 10,
                                marginTop: 5,
                              }}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {color: COLORS.lightbblack},
                                ]}>
                                {/* {data.description} */}
                                asjsaijdoisadioajsoidjsaoj asjd oisajd jasjd
                              </Text>
                            </View>
                            {true && (
                              <View>
                                <Text
                                  style={[
                                    paraGray.largebold,
                                    {color: COLORS.primary, fontSize: 14},
                                  ]}>
                                  Parents Reply :
                                </Text>
                                <View
                                  style={{
                                    flex: 1,
                                    marginLeft: 20,
                                    marginVertical: 5,
                                  }}>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.lightbblack},
                                    ]}>
                                    {/* {data.action_note} */}
                                    Yes
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  </ScrollView>
                </ListItem.Accordion>
              </View>
            </List.Section>
          </View>
          {filterleaves.map((data, index) => (
            <View style={{flex: 1, paddingHorizontal: 10}} key={index}>
              <List.Section>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.bg,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    borderWidth: 2,
                    borderColor: COLORS.background,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={[paraGray.darkpara]}>{data.student_name}</Text>
                    <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                      {/* {data.class_name} */}
                      fifth
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                      {/* {data.title} */}
                      History
                    </Text>
                    <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                      {/* {data.created_at} */}
                      12/03/10
                    </Text>
                  </View>
                  <List.Accordion
                    //   theme={{colors:COLORS.black}}
                    style={{
                      // borderBottomLeftRadius: 10,
                      // borderBottomRightRadius: 10,
                      backgroundColor: COLORS.bg,
                    }}
                    titleStyle={[paraGray.darkpara]}
                    title="View Detail">
                    <Text
                      style={[paraGray.darkpara, {color: COLORS.lighterblack}]}>
                      Complaint :
                    </Text>
                    <View style={{flex: 1, marginLeft: 20, marginBottom: 10}}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.lightbblack},
                        ]}>
                        {/* {data.description} */}
                        asjsaijdoisadioajsoidjsaoj asjd oisajd jasjd
                      </Text>
                    </View>
                    {data.action_note != null && (
                      <View>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {color: COLORS.lighterblack, marginLeft: 5},
                          ]}>
                          Parents Reply :
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: 20,
                            marginBottom: 10,
                          }}>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {color: COLORS.lightbblack},
                            ]}>
                            {/* {data.action_note} */}
                            Yes
                          </Text>
                        </View>
                      </View>
                    )}
                  </List.Accordion>
                </View>
              </List.Section>
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

export default ComplaintHistory;

const styles = StyleSheet.create({
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignbooks: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
});
