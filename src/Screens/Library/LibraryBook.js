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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import {useFocusEffect} from '@react-navigation/native';
import {Header} from '../../Components/Header';

const LibraryBook = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setData] = useState([]);

  const array = [
    {
      id: 1,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
    {
      id: 2,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
    {
      id: 3,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
    {
      id: 4,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
  ];

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['name', 'class'];
  const [state, setState] = useState({searchTerm: ''});

  const studentfilter = array.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
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
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
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

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

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
              borderWidth: 2,
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
              style={{marginTop: 6}}
              name="search"
              size={29}
              color="#000000"
            />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          {studentfilter.map((student, index) => (
            <View key={index}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#E5E5E5',
                  width: '90%',
                  height: 70,
                  borderColor: '#E5E5E5',
                  alignSelf: 'center',
                  borderWidth: 2,
                  marginTop: 20,
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('LibraryBookDetail', {
                    student: array[index],
                  });
                }}>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {student.name}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                      marginTop: 5,
                    }}>
                    {student.bookcode}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {student.class}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                      marginTop: 5,
                    }}>
                    {student.pubname}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* {getdata == '' && loading == false && (
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
        )} */}
      </ScrollView>
    </View>
  );
};

export default LibraryBook;

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
