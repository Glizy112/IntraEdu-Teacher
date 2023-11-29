import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { DataTable, Avatar } from 'react-native-paper';
import { createFilter } from 'react-native-search-filter';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS } from '../../theme/Colors';
import Url from '../../Config/Api/Url';
import { Header } from '../../Components/Header';
import { paraGray } from '../../theme/styles/Base';

const HistoryAttendance = props => {
  const {
    streamvalue,
    subjectvalue,
    classvalue,
    sectionvalue,
    classname,
    subjectname,
    sectionname,
    studentid,
    month,
  } = props.route.params;
  const {
    userinfo,
    userid,
    username,
    showmodal,
    schoolid,
    teacherid,
    academicyear,
  } = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setData] = useState([]);
  const [attenddata, setattendData] = useState([]);
  const datas = [
    { id: '1', name: 'Vikash Yadav', date: '1/1/21', present: 'Present' },
    { id: '2', name: 'Vikash Gupta', date: '1/1/21', present: 'Absent' },
    { id: '3', name: 'Ayush Dubey', date: '1/1/21', present: 'Present' },
  ];

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['name'];
  const [state, setState] = useState({ searchTerm: '' });

  const data = datas.filter(createFilter(state.searchTerm, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setState({ searchTerm: term });
  };
  const DislayAttendance = props => {
    var i = 0;
    var payments = [];
    for (i = 1; i <= 31; i++) {
      var day = attenddata[props.index];
      // var days=;
      //  var attendance= day[`day_${i}`];
      payments.push(
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 10,
            // backgroundColor: COLORS.bluBg,
          }}
          key={i}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.dataTxt,
                {
                  color: data.present == 'Present' ? COLORS.green : COLORS.red,
                },
              ]}>
              {day[`day_${i}`]}
            </Text>
          </View>
        </View>,
      );
    }
    return payments;
  };
  useEffect(() => {
    getapiData();
    // console.log(fromdate);
    // console.log("Tid"+teacherid)
    // console.log('Uid' + userid);
  }, []);

  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', classvalue);
      formData.append('section_id', sectionvalue);
      formData.append('subject_id', subjectvalue);
      formData.append('student_id', studentid);
      formData.append('academic_year_id', academicyear);
      formData.append('month', month);
      console.log('Send Data=>', formData);
      let resp = await fetch(`${Url.student_month_attendance}`, {
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
          console.log('Result', result.attendance);
          setData(result.students);
          setattendData(result.attendance);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Attendance-History Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="History"
          marginLeft
          rightdownload
          onPresss={{}}
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
          <Text style={styles.subtxt}>{subjectname}</Text>
        </View>
        <View>
          <Text style={styles.txt}>
            Class :<Text style={styles.dataTxt}> {classname}</Text>
          </Text>
          <Text style={styles.txt}>
            Section :<Text style={styles.dataTxt}> {sectionname}</Text>
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <DataTable>
            <View style={{ flex: 1 }}>
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Date</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Student Name</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-1</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-2</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-3</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-4</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-5</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-6</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-7</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-8</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-9</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-10</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-11</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-12</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-13</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-14</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-15</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-16</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-17</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-18</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-19</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-20</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-21</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-22</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-23</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-24</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-25</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-25</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-26</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-27</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-28</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-29</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-30</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={{ borderWidth: 1 }}>
                  <DataTable.Cell>
                    <Text style={styles.rowTxt}>Day-31</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </View> */}

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: COLORS.background,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                      }}>
                      <Text style={styles.rowTxt}>Roll No</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderLeftWidth: 0,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        borderColor: COLORS.background,
                      }}>
                      <Text style={styles.rowTxt}>Student Name</Text>
                    </View>
                  </View>
                  {getdata.map((data, index) => (
                    <View style={{ flex: 1 }} key={index}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // paddingHorizontal: 10,
                        }}>
                        <View
                          style={{
                            width: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: COLORS.background,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                          }}>
                          <Text style={styles.dataTxt}>{data.roll_no}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderLeftWidth: 0,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: COLORS.background,
                          }}>
                          <Text style={styles.dataTxt}>{data.name}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-1</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_1}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-2</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_2}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-3</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_3}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-4</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_4}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-5</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_5}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-6</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_6}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-7</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_7}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-8</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_8}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-9</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_9}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-10</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_10}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-11</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_11}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-12</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_12}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-13</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_13}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-14</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_14}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-15</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_15}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-16</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_16}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-17</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_17}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-18</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_18}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-19</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_19}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-20</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_20}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-21</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_21}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-22</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_22}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-23</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_23}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-24</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_24}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-25</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_25}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-26</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_26}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-27</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_27}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-28</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_28}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-29</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_29}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-30</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_30}</Text>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderColor: COLORS.background,
                    // borderWidth: 1,
                  }}>
                  <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderColor: COLORS.background,
                    borderLeftWidth: 0,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}>
                    <Text style={styles.rowTxt}>Day-31</Text>
                  </View>
                  {attenddata.map((data, index) => (
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.background,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }} key={index}>
                      <Text style={styles.dataTxt}>{data.day_31}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </DataTable>
        </ScrollView>
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
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

export default HistoryAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
  rowcontainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTxt: {
    flexWrap: 'wrap',
    marginTop: 20,
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
  },
  txt: {
    marginTop: 20,
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 10,
  },
  datacontainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataTxt: {
    flexWrap: 'wrap',
    marginTop: 20,
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
});
