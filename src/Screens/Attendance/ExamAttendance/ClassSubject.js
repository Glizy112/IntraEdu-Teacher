import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Url from '../../../Config/Api/Url';
import {COLORS} from '../../../theme/Colors';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Header} from '../../../Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {paraGray} from '../../../theme/styles/Base';

const ClassSubject = props => {
  const {classname} = props.route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/*<View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
         <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName={classname}
          marginLeft
          back
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
            {classname}
          </Text>
        </View>
      </View>
      <ScrollView>
        {/* <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('SubjectReport', {
              classname: 'English',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>English</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('SubjectReport', {
              classname: 'Maths',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Maths</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('SubjectReport', {
              classname: 'Hindi',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Hindi</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('SubjectReport', {
              classname: 'Science',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Science</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('SubjectReport', {
              classname: 'Histroy',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Histroy</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('SubjectReport', {
              classname: 'Geography',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Geography</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} /> */}
        <View style={{width: '90%', alignSelf: 'center', marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('SubjectReport', {
                classname: 'English',
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#275CE0',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert("Feature Coming Soon")
                props.navigation.navigate('SubjectReport', {
                  classname: 'English',
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>English</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('SubjectReport', {
                classname: 'Maths',
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#275CE0',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert("Feature Coming Soon")
                props.navigation.navigate('SubjectReport', {
                  classname: 'Maths',
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>Maths</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('SubjectReport', {
                classname: 'Hindi',
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#275CE0',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert("Feature Coming Soon")
                props.navigation.navigate('SubjectReport', {
                  classname: 'Hindi',
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>Hindi</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('SubjectReport', {
                classname: 'Science',
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#275CE0',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert("Feature Coming Soon")
                props.navigation.navigate('SubjectReport', {
                  classname: 'Science',
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>Science</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('SubjectReport', {
                classname: 'History',
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#275CE0',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert("Feature Coming Soon")
                props.navigation.navigate('SubjectReport', {
                  classname: 'History',
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>History</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('SubjectReport', {
                classname: 'Geography',
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#275CE0',
              width: '100%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 40,
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert("Feature Coming Soon")
                props.navigation.navigate('SubjectReport', {
                  classname: 'Geography',
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>
                  Geography
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClassSubject;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  label: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
  },
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  labeltxt: {
    color: '#000000',
    // marginLeft: 10,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
