import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';

const TeacherHoliday = props => {
  const dispatch = useDispatch();
  const [absent, setAbsent] = useState(2);
  const [holiday, setHoliday] = useState(1);
  const [active, setActive] = useState('1');
  const {schoolid, classid, sectionid, studentid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [get, set] = useState([]);
  const [getdata, setdata] = useState([]);
  const [attenddata, setAttenddata] = useState([]);
  const TeacherAttendances = [
    {
      id: '1',
      name: 'Social Study',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Monday',
      date: '14th March',
      attend: 'absent',
      time: '10.00am',
    },
    {
      id: '2',
      name: 'Science',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Tuesday',
      date: '15th March',
      attend: 'absent',
      time: '11.00am',
    },
    {
      id: '3',
      name: 'Maths',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Friday',
      date: '18th March',
      attend: 'absent',
      time: '12.00am',
    },
  ];

  useEffect(() => {
    getholidayapiData();
  }, []);
  let nextDay = [];
  let newDaysObject = {};

  const getholidayapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(
        'http://intraedu.in/admin/StudentApi/holiday_by_school_id',
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
          setdata(result);
          //   if (result != '') {
          //     result.map(item => {
          //       var json_data = item.date_from;
          //       nextDay.push(json_data);
          //     }),
          //       set(nextDay);
          //   }
          setLoading(false);
        });
      // holidayarray();
    } catch (error) {
      console.log('TeacherHoliday Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getholidayapiData();
  }, []);

  get.forEach(day => {
    newDaysObject[day] = {
      selected: true,
      marked: false,
      selectedColor: COLORS.green,
    };
  });
  return (
    <View style={container.container}>
      {loading == true && <Spinner visible={loading} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.bluee}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="Holiday List"
          marginLeft
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image
          style={{backgroundColor: COLORS.bluee, width: '100%'}}
          source={require('../../../assets/star_pattern.png')}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 15,
            paddingBottom: 30,
            marginTop: -30,
          }}>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={[paraGray.darklarge]}>NOVEMBER 2020</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.green,
            }}>
            <View
              style={{
                width: `${((100 * absent) / 30).toFixed(1)}%`,
                backgroundColor: COLORS.green,
                height: 50,
                borderRadius: 8.3,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={[
                  paraGray.darkpara,
                  {
                    flex: 1,
                    position: 'absolute',
                    top: 12,
                    left: 28,
                    zIndex: 5,
                  },
                ]}>
                Festival & Holidays
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: COLORS.lightgreen,
                    top: 5,
                    right: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      paraGray.darkpara,
                      {
                        top: 2,
                        color: COLORS.green,
                        fontFamily: 'Poppins-SemiBold',
                      },
                    ]}>
                    {absent}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            marginTop: -20,
            marginBottom: 30,
          }}>
          {getdata.map((attend, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.border,
                justifyContent: 'center',
                paddingHorizontal: 10,
                marginTop: 15,
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
                  style={[paraGray.darklarge, {color: COLORS.lighterblack}]}>
                  {attend.title}
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
                <Text style={[paraGray.lightParaSmall]}>
                  {attend.date_from}
                </Text>
                <Text style={[paraGray.lightParaSmall]}>{attend.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TeacherHoliday;
