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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {paraGray} from '../../../theme/styles/Base';
import Search from '../../../Components/Search';

const MyClassRoomAtten = props => {
  const [searchData, setSearchData] = useState([]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Search
        KEYS_TO_FILTERS={null}
        getdata={[1, 2, 3]}
        filter={setSearchData}
      />
      <View style={{alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

            alignSelf: 'flex-start',

            //              marginBottom: 60,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              height: 32,
              borderColor: COLORS.primary,
              alignSelf: 'center',
              borderWidth: 1.2,
              marginTop: 15,
              borderRadius: 45,
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 12,
                fontFamily: 'Montserrat-Medium',
              }}>
              Test Exam
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              height: 32,
              borderColor: COLORS.primary,
              alignSelf: 'center',
              borderWidth: 1.2,
              marginTop: 15,
              borderRadius: 45,
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 12,
                fontFamily: 'Montserrat-Medium',
              }}>
              Unit Test Exam
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              height: 32,
              borderColor: COLORS.primary,
              alignSelf: 'center',
              borderWidth: 1.2,
              marginTop: 15,
              borderRadius: 45,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 12,
                fontFamily: 'Montserrat-Medium',
              }}>
              Semester Exam
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/* <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ClassSubject', {
              classname: '1st Unit Test',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>1st Unit Test</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ClassSubject', {
              classname: '1st Semester Exam',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>1st Semester Exam</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ClassSubject', {
              classname: '2nd Unit Test',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>2nd Unit Test</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ClassSubject', {
              classname: '2nd Semester Exam',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>2nd Semester Exam</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ClassSubject', {
              classname: '1st Prelims',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>1st Prelims</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ClassSubject', {
              classname: '2nd Prelims',
            });
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>2nd Prelims</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} /> */}
        <View style={{width: '90%', alignSelf: 'center', marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              // alert("Feature Coming Soon")
              props.navigation.navigate('ClassSubject', {
                classname: '1st Unit Test',
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
                props.navigation.navigate('ClassSubject', {
                  classname: '1st Unit Test',
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
                  1st Unit Test
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassSubject', {
                classname: '1st Semester Exam',
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
                props.navigation.navigate('ClassSubject', {
                  classname: '1st Semester Exam',
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
                  1st Semester Exam
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassSubject', {
                classname: '2st Unit Test',
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
                props.navigation.navigate('ClassSubject', {
                  classname: '2st Unit Test',
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
                  2st Unit Test
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassSubject', {
                classname: '2nd Semester Exam',
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
                props.navigation.navigate('ClassSubject', {
                  classname: '2nd Semester Exam',
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
                  2nd Semester Exam
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassSubject', {
                classname: '3st Unit Test',
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
                props.navigation.navigate('ClassSubject', {
                  classname: '3st Unit Test',
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
                  3st Unit Test
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassSubject', {
                classname: '3st Semester Exam',
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
                props.navigation.navigate('ClassSubject', {
                  classname: '3st Semester Exam',
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
                  3st Semester Exam
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

export default MyClassRoomAtten;
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
