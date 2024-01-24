import React from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../theme/Colors';
import {Header} from '../../../Components/Header';
import {paraGray} from '../../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DataTable, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native-gesture-handler';
const ExamAttenReport = props => {
  const {classnumber} = props.route.params;

  const eventss = [
    {
      id: '1',
      name: 'Vikash Yadav',
      Date: '1/01/2023',
      stream: 'FY',
      eventname: 'kabbadi',
      present: 'Yes',
    },
    {
      id: '2',
      name: 'Vikash Gupta',
      Date: '1/01/2023',
      stream: 'SY',
      eventname: 'Cricket',
      present: 'Yes',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      Date: '1/01/2023',
      stream: 'TY',
      eventname: 'VolleyBall',
      present: 'No',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      Date: '1/01/2023',
      stream: 'TY',
      eventname: 'VolleyBall',
      present: 'Yes',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      Date: '1/01/2023',
      stream: 'TY',
      eventname: 'VolleyBall',
      present: 'No',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
     <Header
        backgroundColor
        navigation={props.navigation}
        color={COLORS.bg}
        headerFirstName={classname}
        marginLeft
        back
        rightdownload
        onPresss={() => {}}
      /> 
</View>*/}
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
            Exam Attendance
          </Text>
        </View>
        <MaterialIcons name="qr-code-scanner" size={25} color={'black'} />
      </View>
      <View
        style={{
          //flex: 1,
          width: '90%',
          marginTop: 10,
          width: '90%',
          //paddingHorizontal: 15,
          alignSelf: 'center',
        }}>
        {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text
            style={[
              paraGray.darkpara,
              {fontFamily: 'Montserrat-SemiBold', marginTop: 20},
            ]}>
            Classroom No : 102
          </Text>
        </View>
        <View>
          <Text
            style={[
              paraGray.darkpara,
              {fontFamily: 'Montserrat-SemiBold', marginTop: 20},
            ]}>
            11(A)
          </Text>
        </View>
      </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            //alignSelf: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text
              style={[
                paraGray.largebold,
                {fontSize: 16, color: 'rgba(0, 0, 0, 0.60)'},
              ]}>
              Classroom No : {classnumber}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                paraGray.darkpara,
                {marginRight: 0, color: 'rgba(0, 0, 0, 0.60)'},
              ]}>
              Section -
            </Text>
            <Text style={[paraGray.darkpara, {color: 'rgba(0, 0, 0, 0.60)'}]}>
              11(A)
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            width: '100%',
            //borderWidth: 0.5,
            // borderBottomColor: COLORS.section,
            //borderColor: COLORS.primary,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 5,
          }}
        /> */}
        {/* <DataTable>
        <DataTable.Header style={{borderWidth: 1}}>
          <DataTable.Title style={{flex: 1}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 12,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Date
            </Text>
          </DataTable.Title>
          <DataTable.Title style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 12,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Student Name
            </Text>
          </DataTable.Title>
          <DataTable.Title
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 12,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Present
            </Text>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable> */}
        <View style={{marginTop: 20}}>
          <View
            style={{
              borderWidth: 0.6,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 12,
              // alignItems: 'flex-start',
              borderColor: COLORS.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: COLORS.bgColor,
            }}>
            <View style={{width: '30%'}}>
              <Text style={[paraGray.largebold, {fontSize: 14}]}>Date</Text>
            </View>
            <View style={{width: '40%', alignItems: 'center'}}>
              <Text style={[paraGray.largebold, {fontSize: 14}]}>
                Student Name
              </Text>
            </View>
            <View
              style={{
                width: '30%',

                alignItems: 'center',
                marginRight: -10,
              }}>
              <Text style={[paraGray.largebold, {fontSize: 14}]}> Present</Text>
            </View>
          </View>
          {/* {eventss.map((events, index) => (
         
        ))} */}
          {/* <FlatList
          data={eventss}
          style={{borderWidth: 1, flex: 1}}
          keyExtractor={item => item}
          renderItem={({item: events}) => (
            <View style={{}}>
              <View
                style={{
                  borderBottomWidth: 0,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 15,
                  width: '95%',
                  alignSelf: 'center',
                  // backgroundColor: COLORS.bgColor,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <View style={{flex: 1}}>
                  <Text
                    //style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}
                    style={[paraGray.parahome, {fontSize: 12}]}>
                    {events.Date}
                  </Text>
                </View>
                <View
                  style={{flex: 1, justifyContent: 'center', marginRight: -20}}>
                  <Text
                    //style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}
                    style={[paraGray.parahome, {fontSize: 12}]}>
                    {events.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',

                    //borderWidth: 1,
                    paddingRight: 20,
                  }}>
                  <Text
                    //   style={{
                    //     fontSize: 12,
                    //     fontFamily: 'Montserrat-Regular',
                    //     color:
                    //       events.present == 'No' ? COLORS.red : COLORS.lightGreen,
                    //   }}
                    style={[
                      paraGray.parahome,
                      {
                        fontSize: 12,
                        color:
                          events.present == 'No' ? COLORS.red : COLORS.primary,
                        width: '30%',
                      },
                    ]}>
                    {events.present}
                  </Text>
                </View>
              </View>
            </View>
          )}
        /> */}
          <FlatList
            data={eventss}
            style={{
              backgroundColor: COLORS.bgColor,
              borderRadius: 12,
              marginTop: 4,
            }}
            keyExtractor={item => item}
            renderItem={({item: events}) => (
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                    // width: '100%',
                    //  alignSelf: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}>
                  <View style={{width: '30%'}}>
                    <Text style={[paraGray.parahome, {fontSize: 13}]}>
                      {events.Date}
                    </Text>
                  </View>
                  <View style={{width: '40%', alignItems: 'center'}}>
                    <Text style={[paraGray.parahome, {fontSize: 13}]}>
                      {events.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',

                      alignItems: 'center',
                      marginRight: -10,
                      //borderWidth: 1,
                      //flexDirection: 'row',
                      // justifyContent: 'center',
                    }}>
                    <Text
                      style={[
                        paraGray.parahome,
                        {
                          fontSize: 13,

                          color:
                            events.present == 'No'
                              ? COLORS.red
                              : COLORS.primary,
                        },
                      ]}>
                      {events.present}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ExamAttenReport;
