import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {DataTable, Avatar} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {paraGray} from '../../theme/styles/Base';
import {useSelector, useDispatch} from 'react-redux';
import {Header} from '../../Components/Header';
import FastImage from 'react-native-fast-image';
import Search from '../../Components/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
const CreateComplaint = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState(null);
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name'];
  const [search, setSearch] = useState('');
  const [getdata, setGetdata] = useState([]);

  const studentfilter = getdata.filter(createFilter(search, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setSearch(term);
  };

  useEffect(() => {
    getapiData();
  }, []);

  // --------APICall----------

  const getapiData = async () => {
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
          setGetdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);
  //const {student} = props.route.params;
  // const [getdata, setdata] = useState([]);
  //const {userinfo, userid, username, showmodal, schoolid, teacherid} =
  //useSelector(state => state.userReducer);
  //const [loading, setLoading] = useState(false);
  //const [load, setLoad] = useState(true);
  //const [refreshing, setRefreshing] = React.useState(false);
  const [currentdate, setcurrentDate] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // --------APICall----------

  const Complaint = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // formData.append('role_id', roleid);
      formData.append('class_id', student.class_id);
      formData.append('student_id', student.user_id);
      // formData.append('type_id', roleid);
      formData.append('title', title);
      formData.append('description', desc);
      // console.log('send data==>', formData);
      let resp = await fetch(`${Url.complain_by_teacher}`, {
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
          if (result.status == true) {
            alert('Successfull');
            props.navigation.navigate('CreateComplaint');
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('CreateEvent Error => ' + error);
      alert('Retry');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View style={styles.search}>
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
        </View> */}
        <Search
          getdata={getdata}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setSearchData}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text
              style={[
                paraGray.largebold,
                {fontSize: 16, color: 'rgba(0, 0, 0, 0.60)'},
              ]}>
              All Students (40)
            </Text>
          </View>
          <View style={{alignSelf: 'flex-start'}}>
            <Text
              style={[
                paraGray.darkpara,
                {color: 'rgba(0, 0, 0, 0.60)', textAlign: 'left'},
              ]}>
              Student Complaint
            </Text>
          </View>
        </View>
        {studentfilter.map((student, index) => (
          //   <View style={{flex: 1}} key={index}>
          //     <TouchableOpacity
          //       style={styles.userinfo}
          //       key={index}
          //       onPress={() =>
          //         props.navigation.navigate('AssignComplaint', {
          //           student: getdata[index],
          //         })
          //       }>
          //       <DataTable>
          //         <DataTable.Row style={{borderBottomWidth: 0}}>
          //           <DataTable.Cell>
          //             {student.photo == null ? (
          //               <ImageBackground
          //                 style={{
          //                   backgroundColor: COLORS.black,
          //                   justifyContent: 'center',
          //                   alignItems: 'center',
          //                   width: 45,
          //                   height: 45,
          //                   borderRadius: 30,
          //                 }}>
          //                 <FontAwesome5
          //                   name="user-alt"
          //                   size={25}
          //                   color="#FFFFFF"
          //                 />
          //               </ImageBackground>
          //             ) : (
          //               <FastImage
          //                 style={{width: 50, height: 50, borderRadius: 50}}
          //                 source={{uri: Url.student_IMG + student.photo}}
          //                 backgroundColor={COLORS.black}
          //               />
          //             )}
          //           </DataTable.Cell>
          //           <DataTable.Cell style={{flex: 4.5}}>
          //             <Text style={styles.label}>{student.student_name}</Text>
          //           </DataTable.Cell>
          //         </DataTable.Row>
          //       </DataTable>
          //     </TouchableOpacity>
          //   </View>
          <View
            style={{
              //height: 50,

              marginTop: 20,
              borderRadius: 5,
              // width: '90%',
              //width: '100%',
              //width:"100%"
              // width: '100%',
              borderBottomWidth: 1,
              borderColor: '#97A7C3',

              alignSelf: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'space-between',

                width: '85%',
                alignSelf: 'center',
              }}>
              {/*  */}
              {student.photo == '' ? (
                <ImageBackground
                  style={{
                    backgroundColor: COLORS.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                  }}>
                  <FontAwesome5 name="user-alt" size={20} color="#FFFFFF" />
                </ImageBackground>
              ) : (
                <FastImage
                  style={{width: 42, height: 42, borderRadius: 50}}
                  source={{uri: Url.student_IMG + student.photo}}
                  backgroundColor={COLORS.black}
                />
              )}
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    //alignSelf: 'center',
                    //borderWidth: 1,
                    width: '65%',
                    alignSelf: 'center',
                    marginBottom: 3,
                    marginLeft: 10,
                  }}>
                  <View>
                    <View>
                      <Text style={[paraGray.largebold, {fontSize: 14}]}>
                        {student.student_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // width: '50%',
                        marginTop: 3,
                      }}>
                      <View>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {
                              fontSize: 12,
                              color: '#97A7C3',
                              textAlign: 'left',
                            },
                          ]}>
                          Roll NO- {student.roll_no}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    height: 32,
                    // borderColor: COLORS.primary,
                    backgroundColor: COLORS.primary,
                    alignSelf: 'center',
                    //borderWidth: 1.2,
                    //marginTop: 15,
                    borderRadius: 45,

                    justifyContent: 'center',
                  }}
                  // onPress={() => {
                  //   props.navigation.navigate('BookDetail', {
                  //     student: getdata[index],
                  //   });
                  // }}
                  onPress={() => {
                    setStudent(getdata[index]);
                    setShowModal(() => true);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Complaint
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* {  searchData.length > 0 && searchData? :null} */}
        {getdata == '' && loading == false && (
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
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          // position: 'absolute',
          //bottom: 0,
          //   position: 'absolute',
          //   bottom: 0,
          //   left: 0,
          //   right: 0,
          //height: 20,
          //flex: 1,
        }}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: '60%',
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',

              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[paraGray.largebold, {marginRight: 10}]}>
                  {student ? student.student_name : 'Student Name'}
                </Text>

                <Text
                  style={[
                    paraGray.largebold,
                    {borderLeftWidth: 2, paddingLeft: 10},
                  ]}>
                  {student ? student.class_name : 'class Name'}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            {student && student.student_name ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      flex: 1,
                      //flexDirection: 'row',
                      //justifyContent: 'space-between',
                      marginRight: 20,
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    {/* <Text style={styles.txt}>
                      Name :
                      <Text style={styles.datatxt}>
                        {' '}
                        {student.student_name}
                      </Text>
                    </Text> */}
                    {student.photo == null ? (
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
                      <FastImage
                        style={{
                          width: 75,
                          height: 75,
                          borderRadius: 50,
                          alignSelf: 'center',
                        }}
                        source={{uri: Url.student_IMG + student.photo}}
                        backgroundColor={COLORS.black}
                      />
                    )}
                  </View>
                  {/* <Text style={styles.txt}>
                    Stream :
                    <Text style={styles.datatxt}> {student.class_name}</Text>
                  </Text> */}
                </View>
                <View style={{marginTop: 15}}>
                  <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Event Title:
                  </Text>
                  <View
                    style={{
                      borderWidth: 0.6,
                      borderColor: COLORS.primary,
                      borderRadius: 12,
                    }}>
                    <TextInput
                      placeholder="ENTER TITLE"
                      placeholderTextColor="#808080"
                      value={title}
                      onChangeText={value => setTitle(value)}
                      style={{
                        marginLeft: 0,
                        backgroundColor: '#FFFFFF',
                        width: '90%',
                        height: 40,
                        fontSize: 12,
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        fontFamily: 'Montserrat-Regular',
                      }}
                    />
                  </View>
                  <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Add Description:
                  </Text>
                  <AutoGrowingTextInput
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: COLORS.primary,
                      borderWidth: 0.6,
                      borderRadius: 12,
                      height: 80,
                      width: '100%',
                      alignSelf: 'center',
                      fontSize: 13,
                      //color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                      paddingHorizontal: 15,
                    }}
                    placeholder={'Add Description'}
                    value={desc}
                    onChangeText={value => setDesc(value)}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //backgroundColor: '#000000',
                      backgroundColor: COLORS.primary,
                      width: '80%',
                      height: 50,
                      borderColor: '#000000',
                      alignSelf: 'center',
                      // borderWidth: 2,
                      marginTop: 40,
                      marginBottom: 20,
                      borderRadius: 15,
                      justifyContent: 'center',
                    }}
                    onPress={() => Complaint()}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Complaint
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateComplaint;

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
});
