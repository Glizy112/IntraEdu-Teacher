import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';

const ChangePassword = props => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [checkpassword, setCheckPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const {userinfo, userid, username, roleid} = useSelector(
    state => state.userReducer,
  );
  const change = async () => {
    setLoading(true);
    if (newpassword !== checkpassword) {
      alert('New password and confirmed password are not same.');
      setLoading(false);
    } else {
      const formData = new FormData();
      formData.append('role_id', roleid);
      formData.append('user_id', userid);
      formData.append('old_password', oldpassword.replace(/\s+/g, ''));
      formData.append('new_password', checkpassword.replace(/\s+/g, ''));
      let resp = await fetch(`${Url.change_password}`, {
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
          if (result.status == true) {
            setLoading(false);
            alert(result.message);
            setOldPassword('');
            setNewPassword('');
            setCheckPassword('');
            props.navigation.navigate('Home');
          } else {
            alert(result.message);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('Error Reading data' + err);
          alert('Server Error');
          setLoading(false);
        });
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
        <Text style={[paraGray.largebold, {textAlign: 'center'}]}> Change Password </Text>
        <Text>Text</Text>
      </View>
      <View style={{paddingTop: 12, borderBottomWidth: 0.6, borderColor: COLORS.primary}}/>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingBottom: 30,
          }}
        >
          <View style={{marginTop: 50, alignItems: 'center'}}>
            <View
              style={{
                width: '100%',
                //heigth: 150,
                backgroundColor: 'white',
                marginBottom: 16,
              }}>
              <Text style={[paraGray.darkpara, {color: '#97A7C3D6'}]}>
                Old Password
              </Text>
              <TextInput
                placeholder="Enter Old Password"
                value={oldpassword}
                onChangeText={value => setOldPassword(value)}
                style={[
                  paraGray.darkpara,
                  {
                    paddingHorizontal: 12,
                    height: 48,
                    borderColor: COLORS.primary,
                    borderWidth: 0.8,
                    borderRadius: 12,
                    marginTop: 8,
                    //   width: '90%',
                  },
                ]}
              />
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 16,
              }}>
              <Text style={[paraGray.darkpara, {color: '#97A7C3D6'}]}>
                New Password
              </Text>
              <TextInput
                placeholder="Enter New Password"
                value={newpassword}
                onChangeText={value => setNewPassword(value)}
                style={[
                  paraGray.darkpara,
                  {
                    paddingHorizontal: 12,
                    height: 48,
                    borderColor: COLORS.primary,
                    borderWidth: 0.8,
                    borderRadius: 12,
                    marginTop: 8,
                    //   width: '90%',
                  },
                ]}
              />
            </View>
            <View
              style={{
                width: '100%',
                heigth: 150,
                backgroundColor: 'white',
                marginBottom: 16,
              }}>
              <Text style={[paraGray.darkpara, {color: '#97A7C3D6'}]}>
                Re-Enter Password
              </Text>
              <TextInput
                placeholder="Re-enter Password"
                value={checkpassword}
                onChangeText={value => setCheckPassword(value)}
                style={[
                  paraGray.darkpara,
                  {
                    paddingHorizontal: 12,
                    height: 48,
                    borderColor: COLORS.primary,
                    borderWidth: 0.8,
                    borderRadius: 12,
                    marginTop: 8,
                    //   width: '90%',
                  },
                ]}
              />
            </View>

            <TouchableOpacity
              style={{
                width: '70%',
                height: 50,
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: 12,
                marginTop: 12,
              }}
              onPress={change}>
              <Text style={[paraGray.largebold, {textAlign: 'center', fontSize: 14, color: COLORS.white, marginVertical: 12}]}>
                CHANGE PASSWORD
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 32,
              alignSelf: 'center',
              alignItems: 'baseline',
            }}
            onPress={() => {
              props.navigation.navigate('ForgetPassword');
            }}>
            <AntDesign name="lock" size={24} color={COLORS.primary} />
            <Text style={[paraGray.darkpara, {fontSize: 16, textAlign: 'center'}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default ChangePassword;
