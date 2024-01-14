import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {Header} from '../../Components/Header';
import StudyIcon from '../../Components/StudyIcon';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {setTimetable, setuserInfo} from '../../Redux/Actions/actions';
import { CalendarProvider, WeekCalendar, Calendar, Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const TimePickerInput =(props)=> {
  return(
    // [
    //   {id: 1, inputName: 'From', inputShowState: props.showFromInput},
    //   {id: 2, inputName: 'To', inputShowState: props.showToInput}, 
    // ].map((item)=> (
    <TouchableOpacity
      //key={item.id}
      style={[styles.timePickerContainer, {marginLeft: props.leftMargin}]}
      onPress={props.showHistory==false ? props.showTimePicker : null}>
      <TextInput
        placeholder={props.inputName}
        placeholderTextColor="#808080"
        editable={false}
        style={styles.timePickerInput}>
        {props.text}
      </TextInput>
      <Ionicons name="time-outline" size={26} color={COLORS.primary}/>
      {props.show===true && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode={props.mode}
          is24Hour={true}
          display="default"
          onChange={props.onChange}
          minimumDate={new Date()}
        />
      )}
    </TouchableOpacity>
    // ))
  );
}

// const LectureHistory =(props)=> {
//   return(
//     <ScrollView style={{flex: 1, width: '100%'}}>
//       <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, width: '100%'}}>
//         <View style={{flexDirection: 'row', alignItems: 'center',}}>
//           <Text style={[paraGray.largebold, {fontSize: 18}]}> {props.item.periodNo} Period  |  {props.item.className} Class </Text>
//         </View>
//         <Pressable onPress={props.exitModal}>
//           <Ionicons name="close" size={28} color={COLORS.black}/>
//         </Pressable>
//       </View>
//       <View style={{width: '100%', height: '100%', alignItems: 'flex-start'}}>
//         <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20}}>
//           <View>
//             <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, color: COLORS.gray1}]}> Subject </Text>
//             <Text style={[paraGray.darkpara, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {props.item.subject} </Text>
//           </View>
//           <View style={{alignItems: 'flex-end'}}>
//             <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, color: COLORS.gray1}]}> Date </Text>
//             <Text style={[paraGray.darkpara, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {(props.item.date)} </Text>
//           </View>
//           {/* <View>
//             <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, textAlign: 'right', color: COLORS.gray1}]}> Class </Text>
//             <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {props.item.className} </Text>
//           </View> */}
//         </View>
//         {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, width: '100%'}}>
//           <View>
//             <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, color: COLORS.gray1}]}> Date </Text>
//             <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {(props.item.date)} </Text>
//           </View>
//           <View style={{alignItems: 'flex-end'}}>
//             <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, textAlign: 'right', color: COLORS.gray1}]}> Period </Text>
//             <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {props.item.periodNo} </Text>
//           </View>
//         </View> */}
//         <View style={{flexDirection: 'row', marginTop: 24, justifyContent: 'space-between', borderWidth: 0}}>
//           <TimePickerInput 
//             inputName="From" 
//             date={fromDate} 
//             mode={fromMode} 
//             onChange={handleFromChange}
//             showTimePicker={showFromTimePicker}
//             show={fromShow}
//             text={fromText}
//             //showFromInput={showFromDateInput}
//             leftMargin={0}
//           />
//           <TimePickerInput 
//             inputName="To" 
//             date={toDate} 
//             mode={toMode} 
//             onChange={handleToChange}
//             showTimePicker={showToTimePicker}
//             show={toShow}
//             text={toText}
//             //showToInput={props.showToDateInput}
//             leftMargin={12}
//           />
//         </View>
//         <View style={{flexDirection: 'column', marginTop: 16}}>
//           <Text style={paraGray.darkpara}> Lecture Mode </Text>
//           <DropDownPicker
//             open={dropdownOpen}
//             value={dropdownVal}
//             items={
//               ['Offline', 'Online'].map(item=> ({
//                 label: item,
//                 value: item,
//               }))
//             }
//             setOpen={setDropdownOpen}
//             setValue={setDropdownVal}
//             placeholder="Select Mode"
//             multiple={false}
//             min={0}
//             max={5}
//             style={{
//               alignSelf: 'center',
//               backgroundColor: COLORS.white,
//               borderColor: COLORS.primary,
//               marginTop: 10,
//               borderRadius: 12,
//               borderWidth: 0.6,
//             }}
//             textStyle={{
//               fontSize: 13,
//               fontFamily: 'Montserrat-Regular',
//             }}
//             dropDownContainerStyle={{
//               alignSelf: 'center',
//               backgroundColor: COLORS.white,
//               borderColor: COLORS.primary,
//             }}
//           />
//         </View>
//         <View style={{flexDirection: 'column', marginTop: 16, width: '100%'}}>
//           <Text style={paraGray.darkpara}> Divert Lecture </Text>
//           <TextInput
//             placeholder='Enter teacher name'
//             placeholderTextColor="#000000"
//             value={divertInputText}
//             //editable={false}
//             style={{
//               width: '100%',
//               //alignSelf: 'center', 
//               paddingHorizontal: 12,
//               backgroundColor: COLORS.white,
//               borderColor: COLORS.primary,
//               marginTop: 10,
//               borderRadius: 12,
//               borderWidth: 0.6,
//               fontSize: 13,
//               fontFamily: 'Montserrat-Regular',
//               color: COLORS.black,
//             }}
//             onChangeText={(text)=> setDivertInputText(text)}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   )
// }

const TimeTableForm =(props)=> {

  const navigation = useNavigation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownVal, setDropdownVal] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [fromMode, setFromMode] = useState('time');
  const [fromText, setFromText] = useState('');

  const [toDate, setToDate] = useState(new Date());
  const [toShow, setToShow] = useState(false);
  const [toMode, setToMode] = useState('time');
  const [toText, setToText] = useState('');
  const [divertInputText, setDivertInputText] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleFromChange = (selectedDate) => {
    const currentDate = selectedDate?.nativeEvent?.timestamp || fromDate;
    console.log('Selected Date & currentDate-> ', selectedDate, currentDate);
    setFromShow(Platform.OS === 'ios');
    setFromDate(currentDate);

    //For Time Picker
    const localDate = new Date(currentDate).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata', hour12: false});
    const localTime = localDate?.split(', ')[1];
    const localHours = localTime?.split(':')[0];
    const localMinutes = localTime?.split(':')[1];
    const localTimeFormat = localHours + ':' + localMinutes;
    console.log(localTimeFormat);
    setFromText(localTimeFormat);
  };

  const handleToChange = (selectedDate) => {
    const currentDate = selectedDate?.nativeEvent?.timestamp || toDate;
    console.log('Selected Date & currentDate-> ', selectedDate, currentDate);
    setToShow(Platform.OS === 'ios');
    setToDate(currentDate);

    //For Time Picker
    const localDate = new Date(currentDate).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata', hour12: false});
    const localTime = localDate?.split(', ')[1];
    console.log("LocalTime-> ", localTime);
    const localHours = localTime?.split(':')[0];
    const localMinutes = localTime?.split(':')[1];
    const localTimeFormat = localHours + ':' + localMinutes;
    console.log(localTimeFormat);
    setToText(localTimeFormat);
  };

  // const showMode = (idx, currentMode) => {
  //   // if(show.id===0) {
  //   //   setShow({id: idx, flag: true});
  //   // }else if((show.id==idx)==1){
  //   //   setShow({id: idx, flag: true});
  //   // }
  //   setShow({id: idx, flag: true});
  //   setMode(currentMode);
  // };

  // const showDatePicker = (idx) => {
  //   showMode(idx, 'time');
  // };

  const showFromMode = (currentMode) => {
    // if(show.id===0) {
    //   setShow({id: idx, flag: true});
    // }else if((show.id==idx)==1){
    //   setShow({id: idx, flag: true});
    // }
    setFromShow(true);
    setFromMode(currentMode);
  };

  const showFromTimePicker = () => {
    showFromMode('time');
  };

  const showToMode = (currentMode) => {
    // if(show.id===0) {
    //   setShow({id: idx, flag: true});
    // }else if((show.id==idx)==1){
    //   setShow({id: idx, flag: true});
    // }
    setToShow(true);
    setToMode(currentMode);
  };

  const showToTimePicker = () => {
    showToMode('time');
  };

  return (
    <KeyboardAvoidingView style={{flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start', paddingHorizontal: 20}}>
      <ScrollView style={{flex: 1, width: '100%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center',}}>
          <Text style={[paraGray.largebold, {fontSize: 18}]}> {props.item.periodNo} Period  |  {props.item.className} Class </Text>
        </View>
        {showHistory==true ? 
          <Pressable onPress={()=> setShowHistory(false)}>
            <Ionicons name="close-outline" size={28} color={COLORS.gray1}/>
          </Pressable>
          :
          <Pressable onPress={props.exitModal}>
            <Ionicons name="close" size={28} color={COLORS.black}/>
          </Pressable>
        }
      </View>
      <View style={{width: '100%', height: '100%', alignItems: 'flex-start'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20}}>
          <View>
            <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, color: COLORS.gray1}]}> Subject </Text>
            <Text style={[paraGray.darkpara, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {props.item.subject} </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, color: COLORS.gray1}]}> Date </Text>
            <Text style={[paraGray.darkpara, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {(props.item.date)} </Text>
          </View>
          {/* <View>
            <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, textAlign: 'right', color: COLORS.gray1}]}> Class </Text>
            <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {props.item.className} </Text>
          </View> */}
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, width: '100%'}}>
          <View>
            <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, color: COLORS.gray1}]}> Date </Text>
            <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {(props.item.date)} </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[paraGray.darkpara, {fontSize: 16, opacity: 0.6, textAlign: 'right', color: COLORS.gray1}]}> Period </Text>
            <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 4, color: COLORS.secondary}]}> {props.item.periodNo} </Text>
          </View>
        </View> */}
        <View style={{flexDirection: 'row', marginTop: 24, justifyContent: 'space-between', borderWidth: 0}}>
          <TimePickerInput 
            inputName="From" 
            date={fromDate} 
            mode={fromMode} 
            onChange={handleFromChange}
            showTimePicker={showFromTimePicker}
            show={fromShow}
            showHistory={showHistory}
            text={showHistory==true ? '10:00' : fromText}
            //showFromInput={showFromDateInput}
            leftMargin={0}
          />
          <TimePickerInput 
            inputName="To" 
            date={toDate} 
            mode={toMode} 
            onChange={handleToChange}
            showTimePicker={showToTimePicker}
            show={toShow}
            showHistory={showHistory}
            text={showHistory==true ? '11:00' : toText}
            //showToInput={props.showToDateInput}
            leftMargin={12}
          />
        </View>
        <View style={{width: '100%', flexDirection: 'column', marginTop: 16}}>
          <Text style={paraGray.darkpara}> Lecture Mode </Text>
          {showHistory==true ? 
            <View 
              style={{
                width: '100%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 0.6,
                padding: 12,
              }}
            >
              <Text style={{fontSize: 13, fontFamily: 'Montserrat-Regular', color: COLORS.black}}>Taken Online</Text>
            </View>
            :
            <DropDownPicker
              open={dropdownOpen}
              value={dropdownVal}
              items={
                ['Offline', 'Online'].map(item=> ({
                  label: item,
                  value: item,
                }))
              }
              setOpen={setDropdownOpen}
              setValue={setDropdownVal}
              placeholder="Select Mode"
              multiple={false}
              min={0}
              max={5}
              style={{
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                marginTop: 10,
                borderRadius: 12,
                borderWidth: 0.6,
              }}
              textStyle={{
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
              dropDownContainerStyle={{
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
              }}
            />
          }
        </View>
        <View style={{flexDirection: 'column', marginTop: 16, width: '100%'}}>
          <Text style={paraGray.darkpara}> Divert Lecture </Text>
          <TextInput
            placeholder='Enter teacher name'
            placeholderTextColor="#000000"
            value={showHistory==true ? 'Diverted to Sheela Yadav' : divertInputText}
            editable={showHistory==true ? false : true}
            style={{
              width: '100%',
              //alignSelf: 'center', 
              paddingHorizontal: 12,
              backgroundColor: COLORS.white,
              borderColor: COLORS.primary,
              marginTop: 10,
              borderRadius: 12,
              borderWidth: 0.6,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
              color: COLORS.black,
            }}
            onChangeText={(text)=> setDivertInputText(text)}
          />
        </View>
        {showHistory==true ? 
        <View 
          style={{
            width: '100%', 
            marginTop: 16,
            padding: 12, 
            alignItems: 'center', 
            borderRadius: 10, 
            borderWidth: 0.6, 
            borderColor: COLORS.primary,
            backgroundColor: COLORS.bgColor,
          }}
        >
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[paraGray.darkpara, {color: COLORS.gray1}]}> Total Time </Text>
            <Text style={[paraGray.darkpara, {color: COLORS.secondary}]}> 60 minutes </Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
            <Text style={[paraGray.darkpara, {color: COLORS.gray1}]}> Total Attendants </Text>
            <Text style={[paraGray.darkpara, {color: COLORS.secondary}]}> 50 </Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
            <Text style={[paraGray.darkpara, {color: COLORS.gray1}]}> Lecture Taken By </Text>
            <Text style={[paraGray.darkpara, {color: COLORS.secondary}]}> Sheela Yadav </Text>
          </View>
        </View>
        :
        <View style={{flexDirection: 'row', width: '100%', marginTop: 32, alignItems: 'center', justifyContent: 'space-around'}}>
          <TouchableOpacity 
            style={{
              //alignSelf: 'center', 
              //marginTop: 32, 
              borderWidth: 0.6, 
              borderColor: COLORS.black, 
              borderRadius: 24, 
              padding: 12
            }}
            onPress={()=> navigation.navigate('AttendancePtm')}
          >
            <Text style={paraGray.darkpara}>Take Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              //alignSelf: 'center', 
              //marginTop: 16, 
              borderWidth: 0.6, 
              borderColor: COLORS.secondary, 
              borderRadius: 24, 
              padding: 12
            }}
            onPress={()=> setShowHistory(true)}
          >
            <Text style={[paraGray.darkpara, {color: COLORS.primary}]}>Lecture History</Text>
          </TouchableOpacity>
        </View>
        }
        {showHistory==true ? 
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.secondary,
              width: '80%',
              height: 56,
              borderColor: COLORS.primary,
              alignSelf: 'center',
              borderRadius: 12,
              justifyContent: 'center',
              marginTop: 24,
            }}
            onPress={()=> setShowHistory(false)}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
              }}>
              Go Back
            </Text>
          </TouchableOpacity>
        :
          <View style={{flexDirection: 'row', marginTop: 32, width: '100%', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.red,
                width: '46%',
                height: 56,
                borderColor: COLORS.red,
                alignSelf: 'center',
                borderRadius: 12,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                width: '50%',
                height: 56,
                alignSelf: 'center',
                justifyContent: 'center',
                //marginBottom: 30,
                borderRadius: 12,
              }}
              //onPress={() => Create()}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const TimeTable = props => {
  const [active, setActive] = useState('1');
  const dispatch = useDispatch();
  const {schoolid, classid, sectionid, timetable, teacherid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [day, setDay] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [showFromInput, setShowFromInput] = useState(false);
  const [showToInput, setShowToInput] = useState(false);
  const [formDate, setFormDate] = useState();
  const [currentItem, setCurrentItem] = useState({});
  const [items, setItems] = useState({});
  
  const mode = useRef();

  useEffect(() => {
    (async ()=> {
      await SetCurrentDay();
    })();
    console.log("Rendering");
    //mode.current = 'time';

    // return ()=> SetCurrentDay();
    //SetSelectedDate();
  }, []);

  // const SetCurrentDay = () => {
  //   let date = new Date();
  //   let newday = date.getDay();
  //   let currentday;
  //   // console.log('dayy', newday);
  //   newday == '1'
  //     ? ((currentday = 'monday'), setActive('1'))
  //     : newday == '2'
  //     ? ((currentday = 'tuesday'), setActive('2'))
  //     : newday == '3'
  //     ? ((currentday = 'wednesday'), setActive('3'))
  //     : newday == '4'
  //     ? ((currentday = 'thursday'), setActive('4'))
  //     : newday == '5'
  //     ? ((currentday = 'friday'), setActive('5'))
  //     : newday == '6'
  //     ? ((currentday = 'saturday'), setActive('6'))
  //     : '';
  //   getapiData(currentday);
  // };

  // const CreateItem =(passedTimestamp)=> {
  //   const items = {};

  //   const timeToString = (time) => {
  //       const date = new Date(time);
  //       return date.toISOString().split('T')[0];
  //   }

  //   for (let i = 0; i < 7; i++) {
  //       const time = passedTimestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);

  //       if (!items[strTime]) {
  //           items[strTime] = [];

  //           const numItems = Math.floor(Math.random() * 3 + 1);
  //           for (let j = 0; j < numItems; j++) {
  //               items[strTime].push({
  //                 id: i,
  //                 className: item?.class_name,
  //                 subject: item?.subject_name,
  //                 time: item?.start_time,
  //                 mode: item?.mode,
  //                 periodNo: i,
  //                 icon: <StudyIcon/>,
  //               });
  //           }
  //       }
  //   }
  // }

  const simplifyDateFormat =(input)=> {
    // const arr = (input || '').toString().split(/\-/g);
    // arr.push(arr.shift());
    // return arr.join('/') || null;
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!input || !input.match(pattern)) {
      return null;
    }
    return input.replace(pattern, '$2/$3/$1');
  }

  const SetAgendaItems =(passedDate, resultData)=> {
    //console.log("TimeTable-> \n", timetable);
    //CreateItem(passedTimestamp);
    console.log(passedDate);
    const simpleDate = simplifyDateFormat(passedDate);
    let agendaItems = {} , i = 1;
    agendaItems[passedDate] = [];
    resultData?.map(item=> {
      console.log("Timetable item-> \n", item);
      // if(!items[passedDate]){
      //   items[passedDate] = [];
      // }
      agendaItems[passedDate]?.push({
        id: i,
        className: item?.class_name,
        subject: item?.subject_name,
        time: item?.start_time,
        mode: item?.mode,
        periodNo: i==1 ? i+'st' : i==2 ? i+'nd' : i==3 ? i+'rd' : i+'th',
        date: simpleDate,
        //periodNo: i,
        icon: i==8 ? <Ionicons name="lock-open" size={28} color={COLORS.black}/> : <StudyIcon/>,
      });
      i++;
    })
    console.log("Agenda Items-> ", agendaItems);
    //const newItems = {};
    setItems(agendaItems);
    return true;
    // Object.keys(items).forEach(key=> {
      
    // })
  }

  const SetCurrentDay = async(passedDate) => {
    setLoading(true);
    let date, newDay, currentDay;
    // if(day) {
    //   date = new Date(day);
    //   newDay = date.toString().split(' ')[0];
    //   // switch (newDay) {
    //   //   case 'Mon':
    //   //     currentDay = 'monday';
    //   //     break;
    //   //   case 'Tue':
    //   //     currentDay = 'tuesday';
    //   //     break;
    //   //   case 'Wed':
    //   //     currentDay = 'wednesday';
    //   //     break;  
    //   //   case 'Thu':
    //   //     currentDay = 'thursday';
    //   //     break;
    //   //   case 'Fri':
    //   //     currentDay = 'friday';
    //   //     break;
    //   //   case 'Sat':
    //   //     currentDay = 'saturday';
    //   //     break;
    //   //   default:
    //   //     break;
    //   // }
    // }
    // else {  
    //   date = new Date();
    //   newDay = date.getDay();
    // }
    
    // day!==undefined ? date = new Date(passedDate) : date = new Date();
    console.log("Passed Date-> ", passedDate);
    passedDate!==undefined ? date = new Date(passedDate) : date = new Date();
    newDay = date.getDay();
    console.log("New Day-> ", newDay);
    switch (newDay) {
      case 1:
        currentDay = 'monday';
        break;
      case 2:
        currentDay = 'tuesday';
        break;
      case 3:
        currentDay = 'wednesday';
        break;  
      case 4:
        currentDay = 'thursday';
        break;
      case 5:
        currentDay = 'friday';
        break;
      case 6:
        currentDay = 'saturday';
        break;
      default:
        break;
    }
    console.log("Current Day-> ", currentDay);
    try {
      const resultData = await getapiData(currentDay);
      if(resultData) {
        //console.log('Received Timetable-> ', resultData);
        const agendaItemsDone = passedDate ? SetAgendaItems(passedDate, resultData) : SetAgendaItems(new Date().toISOString().split('T')[0], resultData);
        agendaItemsDone && setLoading(false);
        console.log("Timetable Received");
      } 
    } catch (error) {
      console.log("Setting Items Error-> ", error);
    }
  };

  const getapiData = async(d) => {
    //setRefreshing(false);
    //setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // formData.append('section_id', '1');
      if (d == null) {
        formData.append('day', 'monday');
      } else {
        formData.append('day', d);
      }
      // console.log('Send Data ==>', formData);
      let resp = await fetch(Url.timetable, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const result = await resp.json();
      //console.log("My TimeTable-> ", result.data);
      if(result) {
        dispatch(setTimetable(result.data));
        //setLoading(false);
        return result.data;
      }
        // .then(response => {
        //   return response.json();
        // })
        // .then(result => {
        //   // console.log('data', result.data);
        //   //console.log("Timetable Data-> ", result.data);
        //   dispatch(setTimetable(result.data));
        //   setLoading(false);
        // });
    } catch (error) {
      console.log('Error fetching TimeTable => ' + error);
      //setLoading(false);
    }
  };

  // const SetSelectedDate =()=> {
  //   // const currentDate = new Date().toLocaleDateString(0, {timeZone: 'Asia/Kolkata'});
  //   // const splittedDate = currentDate.split('/');
  //   // splittedDate[0] = splittedDate.splice(2,0,splittedDate[0])[0];
  //   // splittedDate.reverse().pop();
  //   // const formattedDate = JSON.stringify(splittedDate.join('-'));
  //   const currentDate = new Date().toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
  //   const splittedDate = currentDate.split('/');
  //   splittedDate[0] = splittedDate.splice(2,0,splittedDate[0])[0];
  //   console.log(splittedDate);
  //   //splittedDate.reverse().pop();
  //   let newSplittedDate = [...splittedDate].reverse().pop();
  //   newSplittedDate[0] = newSplittedDate.splice(2,0,newSplittedDate[0])[0];
  //   newSplittedDate.reverse().pop();
  //   console.log(newSplittedDate);
  //   const newArr = JSON.stringify(newSplittedDate.join('-'));
  //   //newArr.join('-')
  //   console.log(newArr);
  //   //console.log(formattedDate)
  //   //setDay(formattedDate);
  //   return newArr;
  // }

  const handleDateChange =()=> {
    return "I am Date Change Handler";
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SetCurrentDay();
  }, []);
  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={loading} />}
      {/* <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName="My Time Table"
          marginLeft
          back
          time
          onPresss={() =>
            // alert("Feature Coming Soon")}
            props.navigation.navigate('TimeTableHistroy')
          }
        />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 8,
        }}>
        <TouchableOpacity onPress={()=> props.navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black}/>
        </TouchableOpacity>
        <Text style={[paraGray.largebold, {textAlign: 'center'}]}> My Timetable </Text>
        <TouchableOpacity onPress={()=> props.navigation.navigate("TimeTableHistroy")}>
          <Ionicons name="time-sharp" size={26} color={COLORS.black}/>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 12, borderBottomWidth: 0.6, borderColor: COLORS.primary}}/>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
        <View style={{flex: 1, paddingHorizontal: 0, borderWidth: 0}}>
          {/* <View
            style={{
              //flex: 1,
              //flexDirection: 'row',
              //justifyContent: 'space-between',
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: COLORS.background,
            }}> */}
            <CalendarProvider date={new Date().toISOString().split('T')[0]}>
              {/* <WeekCalendar 
                firstDay={1}
                calendarStyle={{alignItems: 'center'}} 
                //numberOfDays={7} 
                //current={new Date().toISOString().split('T')[0]}
                pagingEnabled
                
                decelerationRate={'normal'}
                dayComponent={({date, state})=> (
                  <View style={{borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10, padding: 8, alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', color: state==="selected" ? 'whitesmoke' : 'black'}}>
                      {date.day}
                    </Text>
                  </View>  
                )}
              /> */}
              <Agenda
                //horizontal
                //displayLoadingIndicator
                theme={{reservationsBackgroundColor: 'white', agendaDayTextColor: 'black', agendaTodayColor: COLORS.primary, selectedDayBackgroundColor: COLORS.primary, selectedDayTextColor: COLORS.white, todayDotColor: COLORS.primary, todayTextColor: COLORS.primary, dotColor: COLORS.primary}}
                initialScrollIndex={10}
                //topDay={'14/12/2023'}
                //showOnlySelectedDayItems
                //showOnlySelectedDayItems
                indicatorStyle='black'
                contentContainerStyle={{paddingBottom: 50}}
                //pagingEnabled
                renderEmptyData={()=> (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={paraGray.largebold} onPress={()=> console.log(day)}>No events</Text>
                </View>
                )}
                items={
                  items
                  // '2023-12-18' : [
                  //   {id: 1, className: '6th A', subject: 'Hindi', time: '8:00 AM', periodNo: '1st', mode: 'Offline', icon: <StudyIcon/>},
                  //   {id: 2, className: '6th A', subject: 'Maths', time: '9:00 AM', periodNo: '2nd', mode: 'Offline', icon: <StudyIcon/>},
                  //   {id: 3, className: '6th A', subject: 'English', time: '10:00 AM', periodNo: '3rd', mode: 'Offline', icon: <StudyIcon/>},
                  //   {id: 4, className: '6th A', subject: 'Science', time: '11:00 AM', periodNo: '4th', mode: 'Offline', icon: <StudyIcon/>},
                  //   {id: 5, className: '6th A', subject: 'S.S.T.', time: '12:00 PM', periodNo: '5th', mode: 'Offline', icon: <StudyIcon/>},
                  //   {id: 6, className: '6th A', subject: 'Recess', time: '01:00 PM', periodNo: '6th', mode: 'Offline', icon: <Ionicons name="lock-open" size={28} color={COLORS.black}/>},
                  //   {id: 7, className: '6th A', subject: 'Punjabi', time: '02:00 PM', periodNo: '7th', mode: 'Offline', icon: <StudyIcon/>}, 
                  // ],
                  // '2023-12-14' : [
                  //   {className: '6th A', subject: 'Hindi', time: '8:00 AM', periodNo: '1st', mode: 'Offline', icon: <StudyIcon/>},
                  //   {className: '6th A', subject: 'Maths', time: '9:00 AM', periodNo: '2nd', mode: 'Offline', icon: <StudyIcon/>},
                  //   {className: '6th A', subject: 'English', time: '10:00 AM', periodNo: '3rd', mode: 'Offline', icon: <StudyIcon/>},
                  //   {className: '6th A', subject: 'Science', time: '11:00 AM', periodNo: '4th', mode: 'Offline', icon: <StudyIcon/>},
                  //   {className: '6th A', subject: 'S.S.T.', time: '12:00 PM', periodNo: '5th', mode: 'Offline', icon: <StudyIcon/>},
                  //   {className: '6th A', subject: 'Recess', time: '01:00 PM', periodNo: '6th', mode: 'Offline', icon: <Ionicons name="lock-open" size={28} color={COLORS.black}/>},
                  //   {className: '6th A', subject: 'Punjabi', time: '02:00 PM', periodNo: '7th', mode: 'Offline', icon: <StudyIcon/>}, 
                  // ],
                  
                  // '2023-12-15' : [
                  //   {className: '6th', subject: 'Hindi', time: '9:00 A.M.'},
                  //   {className: '6th', subject: 'Maths', time: '9:50 A.M.'}, 
                  // ],
                  // '2023-12-16' : [
                  //   {className: '6th', subject: 'Hindi', time: '9:00 A.M.'},
                  //   {className: '6th', subject: 'Maths', time: '9:50 A.M.'}, 
                  // ],
                  // '2023-12-17' : [
                  //   {className: '6th', subject: 'Hindi', time: '9:00 A.M.'},
                  //   {className: '6th', subject: 'Maths', time: '9:50 A.M.'}, 
                  // ],  
                }
                showClosingKnob
                hideKnob={false}
                enableSwipeMonths
                onDayLongPress={()=> console.log('Day long pressed')}
                onDayPress={(dateItem)=> SetCurrentDay(dateItem.dateString)}
                //ListFooterComponent={<View style={{width: '100%', borderColor: COLORS.black, borderWidth: 1}}/>}
                ItemSeparatorComponent={<View style={{borderWidth: 1, width: '50%', backgroundColor: COLORS.black}}/>}
                //selected={day}
                //selected={new Date().toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'})}
                renderItem={(item, isFirst) => (
                  <View key={item.id} style={{marginTop: 16}}>
                    <View style={{flexDirection: 'row', paddingRight: 16, alignItems: 'center'}}>
                      <Text style={[paraGray.largebold, {fontSize: 16, color: COLORS.txtGray, opacity: 0.8}]}>{item.time}</Text>
                      <View style={{borderWidth: 0.4, height: 0, borderColor: COLORS.txtGray, flex: 1, marginLeft: 8}}/>
                    </View>
                    <View style={{marginHorizontal: 20, marginTop: 4, flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={[paraGray.largebold, {fontSize: 14, color: COLORS.secondary}]}> {item.periodNo} Period | </Text>
                      <Text style={[paraGray.largebold, {fontSize: 14, color: COLORS.secondary}]}>{item.className}</Text>
                    </View>
                    <Pressable
                      key={item.id}
                      style={{
                        marginHorizontal: 20, 
                        marginTop: 4, 
                        paddingHorizontal: 12, 
                        paddingBottom: 2, 
                        borderRadius: 10, 
                        backgroundColor: COLORS.white,
                        elevation: 2,
                      }}
                      onPress={()=> {  
                        setLoading(true); 
                        setCurrentItem(item);
                        currentItem && setLoading(false);
                        setModalVisible(true);
                        //setTimeout(()=> { setModalVisible(true); setLoading(false); }, 500); 
                        console.log("Pressed")
                      }}
                    >
                      <View 
                        style={{
                          flexDirection: 'row', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          paddingHorizontal: 0, 
                          paddingVertical: 4, 
                          borderRadius: 10, 
                          marginTop: 4,
                          marginBottom: 4, 
                          marginLeft: 4, 
                          //backgroundColor: 'rgba(39,92,224,0.8)'
                        }}
                      >
                        <View>
                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {item.icon}
                            <Text style={[paraGray.largebold, {color: COLORS.black, fontSize: 16, marginHorizontal: 4}]}>{item.subject}</Text>
                          </View>
                          
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                          <Text style={[paraGray.darkpara, {textAlign: 'right', color: COLORS.secondary, opacity: 0.6}]}> Mode </Text>
                          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={[paraGray.darkpara, {color: COLORS.black, marginTop: 8}]}> {item.mode} </Text>
                            <Ionicons name="cloud-offline" size={18} color={COLORS.black}/>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                )}
              />
            </CalendarProvider>
          {/* </View> */}

          {/* <View style={{marginBottom: 20}}>
            {timetable.map((table, index) => (
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
                  props.navigation.navigate('Period', {
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
                    flexDirection: 'row',
                    marginBottom: table.subname === 'Lunch Break' ? 10 : 0,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    {table.start_time} - {table.end_time}
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color:
                          table.mode == 'Cancelled' ? COLORS.red : COLORS.green,
                      },
                    ]}>
                    {table.mode}
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
                      <Text
                        style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                        Period {index + 1}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View> */}
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
      {/* </ScrollView> */}
      <Modal 
        style={styles.modal}
        isVisible={modalVisible} 
        animationIn={'slideInUp'} 
        animationInTiming={500}
        animationOutTiming={500}
        animationOut={'slideOutDown'} 
        onBackButtonPress={()=> setModalVisible(false)}
        onBackdropPress={()=> setModalVisible(false)}
        backdropTransitionOutTiming={0}
      >
        <TimeTableForm 
          item={currentItem} 
          exitModal={()=> setModalVisible(false)} 
          date={formDate} 
          mode={mode} 
          handleDateChange={handleDateChange}
        />
      </Modal>
    </View>
  );
};
export default TimeTable;

const styles = StyleSheet.create({
  timePickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 0.6,
    marginTop: 8,
    borderRadius: 12,
    //alignSelf: 'center',
    marginLeft: 12,
    paddingHorizontal: 8,
  },  
  timePickerInput: {
    marginLeft: 2,
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: 40,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.black,
  },
  modal: {
    margin: 'auto', 
    height: '70%', 
    width: '100%', 
    backgroundColor: COLORS.white, 
    position: 'absolute', 
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
})
