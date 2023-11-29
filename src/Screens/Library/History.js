import React, { useState, useEffect } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../theme/Colors';
import { paraGray } from '../../theme/styles/Base';

const HistoryDoc = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { userinfo, userid, username, showmodal, schoolid } = useSelector(
    state => state.userReducer,
  );
  const [getdata, setData] = useState([]);
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['username', 'class_name'];
  const [state, setState] = useState({ searchTerm: '' });

  const studentfilter = getdata.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({ searchTerm: term });
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
      let resp = await fetch(`${Url.library_student_list}`, {
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
          // console.log('DATA' + JSON.stringify(result.data));
          setData(result.data);
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

  return (
    <View style={styles.container}>
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
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 0,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Names./Stream"
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
              style={{ marginTop: 6 }}
              name="search"
              size={29}
              color="#000000"
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          {studentfilter.map(
            (student, index) =>
              student.is_returned == '1' && (
                <View key={index}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '90%',
                      borderColor: '#E5E5E5',
                      alignSelf: 'center',
                      borderWidth: 1,
                      marginTop: 20,
                      borderRadius: 15,
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      props.navigation.navigate('HistoryDetail', {
                        student: getdata[index],
                      });
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 14,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {student.username}
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {student.class_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.lblack,
                          fontSize: 14,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {student.book_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}>
                      <Text
                        style={{
                          color: COLORS.lightblack,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {student.issuedate} to {student.submissiondate}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.section,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.lightblack,
                          fontSize: 14,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        Submitted on
                      </Text>
                      <Text
                        style={{
                          color: COLORS.lightblack,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        20/03/23 {/* {student.submitteddate} */}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          color: COLORS.lightblack,
                          fontSize: 14,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        Penalty
                      </Text>
                      <Text
                        style={{
                          color: COLORS.lightblack,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        Forgive
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ),
          )}
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
            <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryDoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
