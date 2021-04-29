import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Input, ListItem} from 'react-native-elements';
import {AuthContext} from '../components/context';
import BackButton from '../components/BackButton';
import Dios from '../../assets/dios_logo_svart.png';
import {useTheme} from '@react-navigation/native';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  Menu,
  Divider,
  Provider,
  TextInput,
  Paragraph,
} from 'react-native-paper';
import axios from 'axios';
import {CompanyImage} from '../components/CompanyImage';
import Toast from 'react-native-toast-message';
import {getColors} from '../core/theme';
import {TouchableHighlight} from 'react-native-gesture-handler';
import DiosRectangle from '../core/DiosRectangle';
import DiosImage from '../../assets/logo2.png';
import {normalize} from '../core/size';
import {Platform} from 'react-native';
import {StatusBar} from 'react-native';
import {FlatList} from 'react-native';
import DiosSignInLogo from '../core/DiosSignInLogo';
const {width, height} = Dimensions.get('window');
// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const teams_data = ['Nygatan 18', 'Storgatan 27'];
export default function SignInScreen({route, navigation}) {
  const dimensions = Dimensions.get('window');
  const imageHeight = dimensions.height;
  const imageWidth = dimensions.width;
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');
  const [password, setPassword] = useState('');
  /*   const [isLoading, setIsLoading] = useState(false);
  const [isBuildingValid, setIsBuildingValid] = useState(false);
  const [isApartmentValid, setIsApartmentValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [check_textInputChange, setCheck_textInputChange] = useState(false);
  const [isValidUser, setIsValidUser] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true); */
  const [currentCompany, setCurrentCompany] = useState('');
  const [foundUser, setFoundUser] = useState([]);
  const [colors, setColors] = useState([]);
  const {signIn} = React.useContext(AuthContext);
  const [enableShift, setEnableShift] = useState(false);
  // const company = route.params;
  const [teams, setTeams] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [search1, setSearch1] = React.useState('');

  const [filtered, setFiltered] = useState(building1);
  const [searching, setSearching] = useState(false);
  const [searching1, setSearching1] = useState(false);

  const [building1, setBuilding1] = useState([]);
  const [teams1, setTeams1] = useState([]);

  const [company, setCompany] = useState();
  const [buildingText, setBuildingText] = useState('');
  const [apartmentText, setApartmentText] = useState('');
  const [apartments, setApartments] = useState([]);
  const [apartments1, setApartments1] = useState([]);
  const getColors1 = async () => {
    const colors = await getColors();
    setColors(colors);
  };
  useEffect(() => {
    getColors1();

    const getCurrentCompany = async () => {
      const company = await AsyncStorage.getItem('company');
      setCompany(company);
      // //console.log(company);
      let results;
      try {
        results = await axios.get(
          `http://192.168.0.49:8081/api/bookings/getBuilding?company=${company}`,
        );
      } catch (error) {
        console.error(error);
      }
      let data2 = [];
      let data1 = results.data;
      data1.map((x) => {
        data2.push(x.building);
      });
      setTeams1(data1);
    };
    getCurrentCompany();
  }, []);

  const getApartmentes = async () => {
    let results;
    try {
      results = await axios.get(
        `http://192.168.0.49:8081/api/bookings/getApartment?building=${buildingText}&company=${company}`,
      );
    } catch (error) {
      console.error(error);
    }
    let data2 = [];
    let data1 = results.data;

    for (let i = 0; i < data1.length; i++) {
      data2.push({apartment: data1[i].apartment, id: i});
      // //console.log({apartment: data1[i].apartment, id: i});
    }
    // //console.log(data2);
    setApartments(data2);
  };
  const onSearch = (text) => {
    setBuildingText(text);

    if (text) {
      setSearching(true);
      // //console.log(teams1);
      const test = teams1.filter((team1) => {
        return team1.building.toLowerCase().includes(text.toLowerCase());
      });

      // uncomment line below and teams is logged as I want
      setTeams(test);
      setSearch(text);
    } else {
      setSearching(false);
      setSearch(building1);
    }
  };
  const onSearch1 = (text) => {
    getApartmentes();
    // //console.log(apartments);
    setApartmentText(text);

    if (text) {
      setSearching1(true);
      const test = apartments.filter((team) => {
        return team.apartment.toLowerCase().includes(text.toLowerCase());
      });
      // //console.log('test: ', test);

      // uncomment line below and teams is logged as I want
      setApartments1(test);
      setSearch1(text);
    } else {
      setSearching1(false);
      setSearch1(building1);
    }
  };
  const loginHandle = async () => {
    // //console.log(apartmentText, buildingText, password, company);
    Toast.show({
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
    Axios.post('http://192.168.0.49:8081/api/users/userlogin', {
      apartment: apartmentText,
      building: buildingText,
      password: password,
      company: company,
    })

      .then((response) => {
        // //console.log(response.status);
        if (response.status != 200) {
          // //console.log('Något Fel');
        }
        if (response.status === 200) {
          setFoundUser(response.data);

          AsyncStorage.setItem('building', buildingText);
          AsyncStorage.setItem('apartment', apartmentText);
          signIn(foundUser);
        }
      })
      // If we catch any errors connecting, let's update accordingly
      .catch();
  };
  const renderItem = ({item}) => (
    <>
      <TouchableHighlight
        key={item.building}
        onPress={() => {
          setBuildingText(item.building), setSearching(false);
        }}>
        <Menu.Item style={{backgroundColor: 'white'}} title={item.building} />
      </TouchableHighlight>
      <Divider />
    </>
  );
  const renderItem1 = ({item}) => (
    <>
      <TouchableHighlight
        key={item.apartment}
        onPress={() => {
          setApartmentText(item.apartment), setSearching1(false);
        }}>
        <Menu.Item style={{backgroundColor: 'white'}} title={item.apartment} />
      </TouchableHighlight>
      <Divider />
    </>
  );
  function SearchDropDownBuilding() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={teams}
        renderItem={renderItem}
      />
    );
  }
  function SearchDropDownApartment() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          marginLeft: '5%',
          marginRight: '5%',
        }}>
        {apartments1.length ? (
          apartments1.map((item) => {
            return (
              <>
                <TouchableHighlight
                  key={item.apartment}
                  onPress={() => {
                    setApartmentText(item.apartment), setSearching1(false);
                  }}>
                  <Menu.Item
                    style={{backgroundColor: 'white'}}
                    title={item.apartment}
                  />
                </TouchableHighlight>
                <Divider />
              </>
            );
          })
        ) : (
          <View style={styles.noResultView}>
            <Text style={styles.noResultText}>No search items matched</Text>
          </View>
        )}
      </View>
    );
  }

  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
  const inputEl3 = useRef(null);
  switch (company) {
    case 'Diös Fastigheter':
      return (
        <KeyboardAvoidingView
          style={styles.container}
          // On Android the keyboard behavior is handled
          // by Android itself, so we should disable it
          // by passing `undefined`.
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Image
            style={styles.logo}
            source={require('../../assets/dios24.png')}
          />
          {/* <Image source={Dios} style={styles.logo} /> */}
          {/* <View
              style={{
                backgroundColor: 'white',
                elevetation: 10,
                position: 'absolute',
                height: normalize(111),
                width: normalize(266),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            />
            <View
              style={{
                backgroundColor: 'white',
                elevetation: 5,
                position: 'absolute',
                height: normalize(60),
                width: normalize(241),

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            />
            <View
              style={{
                backgroundColor: 'white',
                elevetation: 5,
                position: 'absolute',
                height: normalize(60),
                width: normalize(241),

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            /> */}
          <View style={styles.form}>
            <TextInput
              style={{marginLeft: '5%', marginRight: '5%'}}
              theme={{colors: {primary: '#05526D'}}}

              underlineColor="#f5f5f5"
              underlineColorAndroid="#f5f5f5"
              mode="outlined"
              label="Building"
              placeholder="Building"
              right={
                buildingText.length > 0 ? (
                  <TextInput.Icon
                    name={() => (
                      <Icon
                        name={'close-circle-outline'}
                        size={20}
                        onPress={() => {
                          setBuildingText('');
                        }}
                      />
                    )}
                  />
                ) : null
              }
              value={buildingText}
              onChangeText={(text) => onSearch(text)}
              returnKeyType="done"
              keyboardType="ascii-capable"
            />

            {searching && (
              <FlatList
                style={{paddingBottom: 100, height: 200, elevation: 200}}
                keyExtractor={(item, index) => index.toString()}
                data={teams}
                renderItem={renderItem}
              />
            )}
            <TextInput
              style={{marginLeft: '5%', marginRight: '5%'}}
              theme={{colors: {primary: '#05526D'}}}

              underlineColor="#f5f5f5"
              underlineColorAndroid="#f5f5f5"
              mode="outlined"
              label="Apartment"
              placeholder="Apartment"
              right={
                apartmentText.length > 0 ? (
                  <TextInput.Icon
                    name={() => (
                      <Icon
                        name={'close-circle-outline'}
                        size={20}
                        onPress={() => {
                          setApartmentText('');
                        }}
                      />
                    )}
                  />
                ) : null
              }
              value={apartmentText}
              onChangeText={(text) => onSearch1(text)}
              returnKeyType="done"
              keyboardType="ascii-capable"
            />
            {searching1 && (
              <FlatList
                style={{paddingBottom: 100, height: 200, elevation: 200}}
                keyExtractor={(item, index) => index.toString()}
                data={apartments1}
                renderItem={renderItem1}
              />
            )}
            <TextInput
              style={{marginLeft: '5%', marginRight: '5%', paddingTop: '5%'}}
              theme={{colors: {primary: '#05526D'}}}

              mode="outlined"
              label="Password"
              right={
                password.length > 0 ? (
                  <TextInput.Icon
                    name={() => (
                      <Icon
                        name={'close-circle-outline'}
                        size={20}
                        onPress={() => {
                          setPassword('');
                        }}
                      />
                    )}
                  />
                ) : null
              }
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              keyboardType="number-pad"
              returnKeyType="done"
            />
                      <View style={{flexDirection: 'row'}}>
                  <Button
                    mode="text"
                    style={styles.button}
                    labelStyle={{color: '#F16771'}}
                    onPress={() => {
                      //console.log('');
                    }}>
                    Glömt lösenordet?
                  </Button>
                  <Button
                    mode="contained"
                    style={{color: '#F16771'}}
                    labelStyle={{color: '#F16771'}}
                    color="#FFFFFF"
                    onPress={() => {
                      loginHandle(apartment, building, password);
                    }}>
                    Logga in
                  </Button>
                </View>
          </View>

        </KeyboardAvoidingView>
      );
      break;
    case 'Lindbäcks Fastigheter':
      return (
        <View>
          <ImageBackground
            source={require('../../assets/bakgrund222.png')}
            style={{height: imageHeight, width: imageWidth}}
            resizeMode="cover">
            <BackButton
              goBack={() => navigation.goBack()}
              iconColor={'#1482FA'}
            />

            <Image
              style={{height: '20%', width: '100%', resizeMode: 'contain'}}
              source={{
                uri:
                  'http://192.168.0.49:8081/uploads/foretag/lindb%C3%A4cks_logo.png',
              }}
            />
            <ScrollView style={styles.formContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={30}>
                <TextInput
                  style={{marginLeft: '5%', marginRight: '5%'}}
                  theme={{
                    colors: {
                      text: '#1482FA',
                      accent: '#1482FA',
                      primary: '#1482FA',
                      placeholder: '#1482FA',
                      background: '#ffffff',
                    },
                  }}
                  underlineColor="#f5f5f5"
                  underlineColorAndroid="#f5f5f5"
                  mode="outlined"
                  label="Building"
                  placeholder="Building"
                  right={
                    buildingText.length > 0 ? (
                      <TextInput.Icon
                        name={() => (
                          <Icon
                            name={'close-circle-outline'}
                            size={20}
                            onPress={() => {
                              setBuildingText('');
                            }}
                          />
                        )}
                      />
                    ) : null
                  }
                  value={buildingText}
                  onChangeText={(text) => onSearch(text)}
                  returnKeyType="done"
                  keyboardType="ascii-capable"
                />

                {searching && (
                  <SearchDropDownBuilding
                    dataSource={teams}
                  />
                )}
                <TextInput
                  style={{marginLeft: '5%', marginRight: '5%'}}
                  theme={{
                    colors: {
                      text: '#1482FA',
                      accent: '#1482FA',
                      primary: '#1482FA',
                      placeholder: '#1482FA',
                      background: '#ffffff',
                    },
                  }}
                  underlineColor="#f5f5f5"
                  underlineColorAndroid="#f5f5f5"
                  mode="outlined"
                  label="Apartment"
                  placeholder="Apartment"
                  right={
                    apartmentText.length > 0 ? (
                      <TextInput.Icon
                        name={() => (
                          <Icon
                            name={'close-circle-outline'}
                            size={20}
                            onPress={() => {
                              setApartmentText('');
                            }}
                          />
                        )}
                      />
                    ) : null
                  }
                  value={apartmentText}
                  onChangeText={(text) => onSearch1(text)}
                  returnKeyType="done"
                  keyboardType="ascii-capable"
                />
                {searching1 && (
                  <SearchDropDownApartment
                    dataSource={apartments}
                  />
                )}
                <TextInput
                  style={{marginLeft: '5%', marginRight: '5%'}}
                  theme={{
                    colors: {
                      text: '#1482FA',
                      accent: '#1482FA',
                      primary: '#1482FA',
                      placeholder: '#1482FA',
                      background: '#ffffff',
                    },
                  }}
                  underlineColor="#f5f5f5"
                  underlineColorAndroid="#f5f5f5"
                  mode="outlined"
                  label="Password"
                  right={
                    password.length > 0 ? (
                      <TextInput.Icon
                        name={() => (
                          <Icon
                            name={'close-circle-outline'}
                            size={20}
                            onPress={() => {
                              setPassword('');
                            }}
                          />
                        )}
                      />
                    ) : null
                  }
                  placeholder="Password"
                  onChangeText={(password) => setPassword(password)}
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
                {/*             <Input
              label="Building"
              style={{
                backgroundColor: colors.text, padding: 8,
              }}
              placeholder="Building"
              placeholderTextColor='white'
              value={buildingText}
              onChangeText={text => onSearch(text)}
              rightIcon={buildingText.length > 0 ? <Icon
                name='close-circle-outline'
                size={24}
                color='white'
                onPress={() => { setBuildingText('') }}
              /> : null}

              returnKeyType="done"
            />
            <Input
              label="Apartment"
              style={{ backgroundColor: colors.text }}
              placeholder="Apartment"
              placeholderTextColor='white'
              value={apartmentText}
              onChangeText={text => onSearch1(text)}
              rightIcon={apartmentText.length > 0 ? <Icon
                name='close-circle-outline'
                size={24}
                color='white'
                onPress={() => { setApartmentText('') }}
              /> : null}

              returnKeyType="done"
            />
            <Input
              onFocus={() => setEnableShift(true)}
              autoFocus={false}
              style={{ backgroundColor: colors.text, color: 'white' }}

              label="Password"
              ref={inputEl3}
              value={password}
              keyboardAppearance="light"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType={'done'}
              blurOnSubmit={true}
              containerStyle={{
                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
              }}
              placeholder={'Password'}
              onChangeText={password => setPassword(password)}
            /> */}

                <View>
                  <Button
                    mode="text"
                    style={styles.button}
                    labelStyle={{color: '#F16771'}}
                    onPress={() => {
                      //console.log('');
                    }}>
                    Glömt lösenordet?
                  </Button>
                  <Button
                    mode="contained"
                    style={{color: '#F16771'}}
                    labelStyle={{color: '#F16771'}}
                    color="#FFFFFF"
                    onPress={() => {
                      loginHandle(apartment, building, password);
                    }}>
                    Logga in
                  </Button>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    default:
      break;
  }
  return <View></View>;
}

/*     login() {
        const { building, apartment} = this.state;
        this.setState({ isLoading: true });
        // Simulate an API call
        setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
            this.setState({
        isLoading: false,
                isBuildingValid: building.length >= 1 || this.buildingInput.shake(),
                isApartmentValid: apartment.length >= 1 || this.apartmentInput.shake(),
                // isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            });
        }, 1500);
        const username = 'user1'
        const password = 'password'
        const foundUser = Users.filter(item => {
            return username == item.username && password == item.password;
        });
 
        if (foundUser.length == 0) {
        //console.log('Invalid User!', 'username or password is incorrect.');
            return;
        }
        signIn(foundUser);
    } */

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    top: 25,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    /*     color: colors.button,
     */ fontWeight: 'bold',
    fontSize: 30,
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: undefined,
    height: 40,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textStyle: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#05526D',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    padding: 70,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    // height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    height: '100%',
    top: 50,
    borderRadius: 10,
    // paddingTop: 32,
    paddingBottom: 32,
    // alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
