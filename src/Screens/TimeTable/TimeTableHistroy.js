import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {setTimetable, setuserInfo} from '../../Redux/Actions/actions';
import SearchInput, {createFilter} from 'react-native-search-filter';

const TimeTableHistroy = props => {
  const dispatch = useDispatch();
  const {schoolid, classid, sectionid, timetable} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setdata] = useState([]);
  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [sendday, setSendDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDay(currentDate.getDay());
    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    getapiData();
    console.log(fDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['name'];
  const [state, setState] = useState({searchTerm: ''});

  const studentfilter = timetable.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

  useEffect(() => {
    onChange();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', '1');
      formData.append('section_id', '1');
      formData.append('day', 'tuesday');

      console.log('Send Data ==>', formData);
      let resp = await fetch(
        'http://intraedu.in/admin/StudentApi/day_by_timetable',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      )
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          // dispatch(setTimetable(result));
          // console.log('hi', result);
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
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName="History"
          marginLeft
          back
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              height: 50,
              borderColor: '#D3D3D3',
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Choose Date"
              placeholderTextColor="#808080"
              //   editable={false}
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}>
              {text}
            </TextInput>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              style={{marginRight: 10}}
              size={26}
              color="#434b56"
              onPress={showDatepicker}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              borderWidth: 0,
              borderRadius: 15,
              borderColor: COLORS.background,
            }}>
            <View
              style={{
                width: '75%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.tablebackground,
                paddingHorizontal: 30,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    color: COLORS.bg,
                    marginVertical: 5,
                  },
                ]}>
                {day == '0'
                  ? 'Sunday'
                  : day == '1'
                  ? 'Monday'
                  : day == '2'
                  ? 'Tuesday'
                  : day == '3'
                  ? 'Wednesday'
                  : day == '4'
                  ? 'Thursday'
                  : day == '5'
                  ? 'Friday'
                  : day == '6' && 'Saturday'}
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    color: COLORS.bg,
                    marginVertical: 5,
                  },
                ]}>
                {text}
              </Text>
            </View>
          </View>
          <View>
            {studentfilter.map((table, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  marginTop: 20,
                  borderColor: COLORS.border,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('PeriodHistory', {
                    period: timetable[index],
                  });
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.lblack, marginTop: 10, marginBottom: 5},
                  ]}>
                  {table.subject_name}
                </Text>
                <View
                  style={{
                    marginBottom: table.subname === 'Lunch Break' ? 10 : 0,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    {table.start_time} - {table.end_time}
                  </Text>
                </View>
                {table.subname === 'Lunch Break' && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: -60,
                      marginBottom: 20,
                    }}>
                    <Image source={require('../../../assets/lunch.png')} />
                  </View>
                )}
                {table.subname === 'Lunch Break' ? (
                  <View />
                ) : (
                  <View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: COLORS.background,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                        {table.class_name}
                      </Text>
                      <Text style={[paraGray.darkpara, {color: COLORS.lblack}]}>
                        {table.period}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          {timetable == '' && loading == false && (
            <View
              style={{
                flex: 1,
                marginBottom: 80,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: '60%',
              }}>
              <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
                NO Data Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default TimeTableHistroy;
