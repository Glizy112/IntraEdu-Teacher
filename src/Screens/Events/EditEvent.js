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
  Image,
} from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { paraGray } from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import Url from '../../Config/Api/Url';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS } from '../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditEvent = props => {
  const { eventdata } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const { roleid, schoolid, teacherid } = useSelector(state => state.userReducer);
  const [title, setTitle] = useState(eventdata.title);
  const [eventdesc, setEventdesc] = useState(eventdata.note);
  const [image, setImage] = useState([]);
  const [editimage, setEditImage] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [currentInputValue, setCurrentInputValue] = useState(null);


  useEffect(() => {
    var data = JSON.parse(eventdata.participate_in)
    var list = [];
    for (let index = 0; index < data.length; index++) {
      list.push([data[index]]);
    }
    setInputValues([...list])
    // setimagedata()
  }, []);


  // const setimagedata = () => {
  //   var datas = JSON.parse(eventdata.image)
  //   var list = [];
  //   for (let index = 0; index < datas.length; index++) {
  //     list.push([datas[index]]);
  //   }
  //   console.log("List========> ", list);
  //   setEditImage([...list])
  // }
  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(eventdata.event_from);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);

    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // --------Date-time Picker----------
  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [texts, setTexts] = useState(eventdata.event_to);

  const onChanges = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShows(Platform.OS === 'ios');
    setDates(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setTexts(fDate);
    console.log(fDate);
  };

  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };

  const showDatepickers = () => {
    showModes('date');
  };

  // --------Date-time Picker----------
  const [newdate, setnewDate] = useState(new Date());
  const [newmode, setNewmode] = useState('date');
  const [newshow, setNewShow] = useState(false);
  const [newtext, setNewText] = useState(eventdata.event_date);

  const NewonChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setNewShow(Platform.OS === 'ios');
    setnewDate(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDatess =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    setNewText(fDatess);
    // console.log(fDate);
  };

  const NewshowMode = currentMode => {
    setNewShow(true);
    setNewmode(currentMode);
  };

  const NewshowDatepicker = () => {
    NewshowMode('date');
  };

  // --------APICall----------
  const EditEvent = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('event_id', eventdata.id);
      formData.append('title', title);
      formData.append('description', eventdesc);
      formData.append('event_from', text);
      formData.append('event_to', texts);
      formData.append('event_date', newtext);
      formData.append('participate_in', JSON.stringify(inputValues));
      for (var i = 0; i < image.length; i++) {
        const photo = image[i];
        formData.append('image[]', {
          name: photo.path,
          type: photo.data,
          uri:
            Platform.OS === 'ios'
              ? photo.path.replace('file://', '')
              : photo.path,
        });
      }
      // formData.getAll('image[]');
      console.log('send data==>', JSON.stringify(formData));
      let resp = await fetch(`${Url.update_data}`, {
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
            // alert('Successfull');
            props.navigation.goBack();
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Edit Event Error => ' + error);
      setLoading(false);
    }
  };

  const SelectImage = () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'any',
      includeBase64: false,
    })
      .then(response => {
        response.map(image => {
          imageList.push({
            filename: image.filename,
            path: image.path,
            data: image.mime,
          });
        });
        setImage(imageList);
      })
      .catch(e => console.log('Create Event Error => ', e.message))
    // ImagePicker.openPicker({
    //   width: 250,
    //   height: 250,
    //   cropping: true,
    // }).then(image => {
    //   // console.log(image);
    //   setImage(image.path);
    // });
  };

  const removeItem = index => {
    setImage(image.filter((o, i) => index !== i));
  };
  const removeEditItem = index => {
    setEditImage(editimage.filter((o, i) => index !== i));
  };

  const themedStyles = styless(primaryColor = COLORS.lightbackground, secondaryColor = COLORS.White,);
  const onDoneButtonPress = async () => {
    if (currentInputValue === null) {
      Keyboard.dismiss();
    }
    if (currentInputValue !== null && inputValues.length === 0) {
      setInputValues([...inputValues, currentInputValue]);
      setCurrentInputValue(null);
    }
    if (inputValues.length > 0 && currentInputValue !== null) {
      const isChipExist = inputValues.indexOf(currentInputValue);
      if (isChipExist === -1) {
        setInputValues([...inputValues, currentInputValue]);
        setCurrentInputValue(null);
      }
    }
  }
  const onRemoveValue = (value) => {
    const filterInputValues = inputValues.filter(item => item !== value);
    setInputValues([...filterInputValues]);
  }

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20 }}>
          <Text style={styles.formtxt}>Event Title:</Text>
          <View style={styles.txtbox}>
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
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text
            style={[
              styles.formtxt,
              { marginBottom: 0, fontFamily: 'Montserrat-Regular' },
            ]}>
            Date to take participate:
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 50,
                borderColor: '#D3D3D3',
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginHorizontal: 3,
                paddingHorizontal: 3,
              }}
              onPress={showDatepicker}>
              <TextInput
                placeholder="From"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {text}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                color="#434b56"
              // onPress={showDatepicker}
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
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 18,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {' '}
                :{' '}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 50,
                borderColor: '#D3D3D3',
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginHorizontal: 3,
                paddingHorizontal: 3,
              }}
              onPress={showDatepickers}>
              <TextInput
                placeholder="To"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {texts}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                color="#434b56"
              // onPress={showDatepickers}
              />

              {shows && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dates}
                  mode={modes}
                  is24Hour={true}
                  display="default"
                  onChange={onChanges}
                />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.formtxt, { fontFamily: 'Montserrat-Regular' }]}>
              Date Of Event
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 50,
                borderColor: '#D3D3D3',
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginHorizontal: 18,
                paddingHorizontal: 3,
              }}
              onPress={NewshowDatepicker}>
              <TextInput
                placeholder="To"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {newtext}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                color="#434b56"
                onPress={NewshowDatepicker}
              />
              {newshow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={newdate}
                  mode={newmode}
                  is24Hour={true}
                  display="default"
                  onChange={NewonChange}
                />
              )}
            </TouchableOpacity>
            <View>
              <Text style={styles.formtxt}>Participate In:</Text>
              <View style={[themedStyles.inputOutlined, themedStyles.inputAndChipWrapper]}>
                <TextInput
                  style={{
                    marginLeft: 2,
                    backgroundColor: '#FFFFFF',
                    flex: 1,
                    height: 40,
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  onChangeText={(value) => setCurrentInputValue(value)}
                  value={currentInputValue}
                  blurOnSubmit={false}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => onDoneButtonPress()}
                />
                <View style={themedStyles.chipsContainer}>
                  {inputValues.map(value => (
                    <TouchableOpacity key={value}
                      style={[
                        themedStyles.chipContained,
                        themedStyles.chipWrapperSmall,
                        themedStyles.chipWrapper,
                      ]}>
                      <Text style={[themedStyles.chipTextSmall]}>{value}</Text>
                      <TouchableOpacity
                        style={[
                          themedStyles.iconWrapperContained,
                          themedStyles.iconWrapperSmall,
                          themedStyles.chipIconWrapper,
                        ]}
                        onPress={() => onRemoveValue(value)}>
                        <Icon
                          name={'close'}
                          size={15}
                          color={COLORS.black}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.formtxt}>Add Description:</Text>
          <AutoGrowingTextInput
            style={styles.txtboxDesc}
            placeholder={'Add Description'}
            value={eventdesc}
            onChangeText={value => setEventdesc(value)}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 0,
              marginTop: 10,
            }}>
            {/* {editimage.map((images, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginHorizontal: 10, marginLeft: 20 }}
                onPress={() => removeEditItem(index)}
              >
                <AntDesign
                  style={{ alignSelf: 'flex-end' }}
                  name="closecircleo"
                  size={16}
                  color={COLORS.black}
                />
                <Image
                  style={{ flexDirection: 'row', height: 100, width: 100 }}
                  source={{ uri: Url.event_IMG + images }}
                />
              </TouchableOpacity>
            ))} */}
            {image.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginHorizontal: 10, marginLeft: 20, marginVertical: 10 }}
                onPress={() => removeItem(index)}
              >
                <AntDesign
                  style={{ alignSelf: 'flex-end' }}
                  name="closecircleo"
                  size={16}
                  color={COLORS.black}
                />
                <Image
                  style={{ flexDirection: 'row', height: 100, width: 100 }}
                  source={{ uri: image.path }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.formtxt}>Add Image/Optional:</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              backgroundColor: COLORS.background,
              marginBottom: 10,
              marginHorizontal: 19,
            }}
            onPress={() => SelectImage()}>
            <AntDesign
              style={{ marginVertical: 5 }}
              name="pluscircle"
              size={30}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.lightbackground,
                width: '80%',
                height: 45,
                alignSelf: 'center',
                marginTop: 20,
                justifyContent: 'center',
                marginBottom: 30,
              }}
              onPress={() => EditEvent()}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditEvent;
const styless = (primaryColor, secondaryColor) => StyleSheet.create({
  inputAndChipWrapper: {
    padding: 8,
    margin: 8,
    marginHorizontal: 18,
    marginTop: 15
  },
  inputContained: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
  },
  inputOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 4,
  },
  inputStandard: {
    backgroundColor: 'transparent',
    borderBottomColor: '#e0e0e0',
    borderWidth: 1,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  input: {
    padding: 8,
    fontSize: 20,
  },
  chipWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  chipWrapperLarge: {
    height: 50,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  chipWrapperMedium: {
    height: 40,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  chipWrapperSmall: {
    height: 35,
    borderRadius: 17.5,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  chipsContainer: {
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContained: {
    backgroundColor: primaryColor ? primaryColor : '#e0e0e0',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  chipOutlined: {
    backgroundColor: 'white',
    borderColor: primaryColor ? primaryColor : '#bdbdbd',
    borderWidth: 1,
  },
  chipIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  iconWrapperLarge: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconWrapperMedium: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  iconWrapperSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  iconWrapperContained: {
    backgroundColor: primaryColor ? primaryColor : '#bdbdbd',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  iconContained: {
    color: secondaryColor ? secondaryColor : '#ffffff',
  },
  iconWrapperOutlined: {
    backgroundColor: primaryColor ? primaryColor : '#bdbdbd',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  chipText: {
    color: COLORS.black,
  },
  chipTextLarge: {
    fontSize: 18,
  },
  chipTextMedium: {
    fontSize: 16,
  },
  chipTextSmall: {
    fontSize: 12,
    color: COLORS.black,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  txtboxDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 80,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
