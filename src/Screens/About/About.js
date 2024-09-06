import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { Avatar, Modal, Surface } from 'react-native-paper';
import { COLORS } from '../../theme/Colors';
import { btnStyles, container, paraGray } from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Header } from '../../Components/Header';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Url from '../../Config/Api/Url';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { setOtherinfo } from '../../Redux/Actions/actions';

const About = props => {
  const dispatch = useDispatch();
  const [showmodal, setShowModal] = useState(false);
  const [geteducation, setEducation] = useState([]);
  const [getexperience, setExperience] = useState([]);
  const [getreward, setReward] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { roleid, schoolid, teacherid, username, otherinfo } = useSelector(state => state.userReducer);
  const [about, setAbout] = useState(otherinfo);

  useEffect(() => {
    // getapiData();
  }, []);
  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // console.log('Send Data ==>', formData);
      let resp = await fetch(`${Url.listTeacherAboutUs}`, {
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
          // console.log("About Us Response===> " + JSON.stringify(result.data.educations));
          setEducation(result.data.educations);
          setExperience(result.data.experience);
          setReward(result.data.rewards);
          setLoading(false);
        });
    } catch (error) {
      console.log('Aboutus List Error => ' + error);
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

  const addabout = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('about_us', about);
      // console.log('send data==>', JSON.stringify(formData));
      let resp = await fetch(`${Url.editAbuotUsByTeacherId}`, {
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
          // console.log("Add Education Resp===> " + result);
          if (result.status == true) {
            setShowModal(false)
            dispatch(setOtherinfo(about));
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('About Error => ' + error);
      setLoading(false);
    }
  };

  return (
    <View style={container.container}>
      {loading == true && <Spinner visible={load} />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 16,
        }}>
        <TouchableOpacity onPress={()=> props.navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black}/>
        </TouchableOpacity>
        <Text style={[paraGray.largebold, {textAlign: 'center'}]}> About Me </Text>
        <Text>Text</Text>
      </View>
      <View style={{paddingTop: 12, borderBottomWidth: 0.6, borderColor: COLORS.primary}}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{paddingHorizontal: 16}}
      >
        <View style={{marginVertical: 20}}>
          <View style={{backgroundColor: COLORS.bgColor, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingTop: 12,
              }}>
              <Text style={[paraGray.largebold, {fontSize: 16}]}>
                Education
              </Text>
              <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center', padding: 4, borderRadius: 20, backgroundColor: COLORS.primary}} 
                onPress={() => props.navigation.navigate('AddEducation')}
              >
                <Ionicons name="add-circle" size={30} color={COLORS.white} />
                <Text style={[paraGray.darkpara, {fontSize: 12, color: COLORS.white}]}> Add New </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 12, flex: 1, borderWidth: 0.2, borderColor: COLORS.white}}/>
            <View style={{paddingHorizontal: 12, paddingBottom: 12}}> 
              {geteducation.map((education, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row', 
                    marginTop: 12, 
                    borderRadius: 10, 
                    padding: 10, 
                    backgroundColor: COLORS.white, 
                    alignItems: 'center' 
                  }}
                >
                  <Avatar.Image
                    size={48}
                    // source={require('../../../assets/user.jpg')}
                    backgroundColor={COLORS.secondary}
                  />
                  <View style={{flex: 1, marginLeft: 15}}>
                    <Text style={[paraGray.darkpara, { color: COLORS.black }]}>
                      {education.school_name}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.lightblack, fontSize: 12, marginTop: 4 },
                      ]}>
                      {education.field_of_study}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.lightblack, fontSize: 12 },
                      ]}>
                      {education.start_date} to {education.end_date != null ? education.end_date : 'Present'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: 'center', backgroundColor: COLORS.bgColor, padding: 8, borderRadius: 24 }}
                    onPress={() => props.navigation.navigate('EditEducation', { data: geteducation[index] })}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={22}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={{marginTop: 20, backgroundColor: COLORS.bgColor, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingTop: 12,
              }}>
              <Text style={[paraGray.largebold, {fontSize: 16}]}>
                Experience
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 4, borderRadius: 20, backgroundColor: COLORS.primary}}
                onPress={() => props.navigation.navigate('AddExperience')}
              >
                <Ionicons name="add-circle" size={30} color={COLORS.white} />
                <Text style={[paraGray.darkpara, {fontSize: 12, color: COLORS.white}]}> Add New </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 12, flex: 1, borderWidth: 0.2, borderColor: COLORS.white}}/>
            <View style={{paddingHorizontal: 12, paddingBottom: 12}}>
              {getexperience.map((experience, index) => (
                <View 
                  key={index} 
                  style={{ 
                    flexDirection: 'row', 
                    marginTop: 12, 
                    borderRadius: 10, 
                    padding: 10, 
                    backgroundColor: COLORS.white, 
                    alignItems: 'center'  
                  }}
                >
                  <Avatar.Image
                    size={48}
                    // source={require('../../../assets/user.jpg')}
                    backgroundColor={COLORS.secondary}
                  />
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={[paraGray.darkpara, { color: COLORS.black }]}>
                      {experience.company_name}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.lightblack, fontSize: 12, marginTop: 4 },
                      ]}>
                      {experience.employment_type}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.lightblack, fontSize: 12 },
                      ]}>
                      {experience.start_date} to {experience.end_date != null ? experience.end_date : 'Present'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: 'center', backgroundColor: COLORS.bgColor, padding: 8, borderRadius: 24 }}
                    onPress={() => props.navigation.navigate('EditExperience', { data: getexperience[index] })}>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={22}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={{marginTop: 20, backgroundColor: COLORS.bgColor, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingTop: 12,
              }}>
              <Text style={[paraGray.largebold, {fontSize: 16}]}>
                Rewards & Certificates
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 4, borderRadius: 20, backgroundColor: COLORS.primary}}
                onPress={() => props.navigation.navigate('AddRewards')}
              >
                <Ionicons name="add-circle" size={30} color={COLORS.white} />
                <Text style={[paraGray.darkpara, {fontSize: 12, color: COLORS.white}]}> Add New </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 12, flex: 1, borderWidth: 0.2, borderColor: COLORS.white}}/>
            <View style={{paddingHorizontal: 12, paddingBottom: 12}}>
              {getreward.map((reward, index) => (
                <View 
                  key={index} 
                  style={{ 
                    flexDirection: 'row', 
                    marginTop: 12, 
                    borderRadius: 10, 
                    padding: 10, 
                    backgroundColor: COLORS.white, 
                    alignItems: 'center'  
                  }}
                >
                  <Avatar.Image
                    size={48}
                    // source={require('../../../assets/user.jpg')}
                    backgroundColor={COLORS.secondary}
                  />
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={[paraGray.darkpara, { color: COLORS.black }]}>
                      {reward.issuing_organization}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.lightblack, fontSize: 12, marginTop: 4 },
                      ]}>
                      {reward.name}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.lightblack, fontSize: 12 },
                      ]}>
                      {reward.issue_date} to {reward.expiration_date != null ? reward.expiration_date : 'No Exipry'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: 'center', backgroundColor: COLORS.bgColor, padding: 8, borderRadius: 24 }}
                    onPress={() => props.navigation.navigate('EditRewards', { data: getreward[index] })}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={22}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={{marginTop: 20, backgroundColor: COLORS.bgColor, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingTop: 12,
              }}
            >
              <Text style={[paraGray.largebold, {fontSize: 16}]}>
                About
              </Text>
            </View>
            <View style={{marginTop: 12, flex: 1, borderWidth: 0.2, borderColor: COLORS.white}}/>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[paraGray.darkpara, { color: COLORS.black }]}>
                  {username}
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color: COLORS.lightblack,
                      fontSize: 12,
                      marginHorizontal: 5,
                    },
                  ]}>
                  {otherinfo}
                </Text>
              </View>
              <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={() => setShowModal(!showmodal)}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={22}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 30 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginHorizontal: 20,
                borderRadius: 30,
                backgroundColor: COLORS.lightbackground,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[paraGray.darklarge, { color: COLORS.bg }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={showmodal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          width: '75%',
          height: 250,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[paraGray.darkpara]}>{username}</Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={[paraGray.darkpara]}>About</Text>
          <AutoGrowingTextInput
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 80,
              borderColor: '#D3D3D3',
              alignSelf: 'center',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}
            value={about}
            onChangeText={value => setAbout(value)}
            placeholder="About"
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              marginTop: 30,
              width: '50%',
              height: 35,
              borderRadius: 30,
              backgroundColor: COLORS.bluee,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => addabout()}
          >
            <Text style={[paraGray.darkpara, { color: COLORS.bg }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default About;
