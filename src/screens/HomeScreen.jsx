import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../components/context';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import Axios from 'axios';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-community/async-storage';
import {CompanyImage} from '../components/CompanyImage';
import {getColors} from '../core/theme';
import {FlatList} from 'react-native';
import RoomList from '../components/RoomList';
import {RefreshControl} from 'react-native';
import {normalize} from '../core/size';

const HomeScreen = () => {
  const watchId = null;
  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const [currentCompany, setCurrentCompany] = useState('');
  const [currentApartment, setCurrentApartment] = useState('');
  const [currentBuilding, setCurrentBuilding] = useState('');
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roomData, setRoomData] = useState([]);
  const getColors1 = async () => {
    const colors1 = await getColors();
    setColors(colors1);
  };
  const room = 1;
  const fetchRoomData = async () => {
    let result;

    try {
      result = await Axios.get(
        `http://192.168.0.49:8081/api/bookings/bookingavailable1?room=${5}&company=${currentCompany}&date=${dayjs().format(
          'YYYY-MM-DD',
        )}`,
      );
      setRoomData(result.data);
      // for (let i = 0; i < data.length + 1; i++){

      //   // if (data[i]['id'] == result.data.id){
      //   //   data[i]['checked'] == true;
      //   //   // let i2 = JSON.parse(data[i])
      //   //   // i2.push(result.data.empty_booking)
      //   // }
      // }
    } catch (error) {
      setRoomData([]);
    }
  };

  const fetchData = async () => {
    const building = await AsyncStorage.getItem('building');
    const company = await AsyncStorage.getItem('company');

    let result = await Axios.get(
      `http://192.168.0.49:8081/api/bookings/allowed_rooms?building=${building}`,
    );
    let data = result.data
    let data2 = []
    for (let i = 0; i < data.length; i++){
      console.log(data[i].id,currentCompany,dayjs().format('YYYY-MM-DD'))
      let result1 = await Axios.get(
        `http://192.168.0.49:8081/api/bookings/bookingavailable1?room=${data[i].id}&company=${company}&date=${dayjs().format(
          'YYYY-MM-DD',
        )}`,
      );
      data2.push(result1.data)
    }
    console.log(data2)
    // let data1 = result1.data
    let test = []
    for (let i = 0; i < data.length; i++){
      if (data[i].id == data2[i].id){
        data[i]['empty_booking'] = data2[i].empty_booking
      }
      test.push(data[i])
    }
    setData(test)
    // setData(result.data);
    // await AsyncStorage.setItem('rooms', JSON.stringify(result.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   sometihng();
  // }, []);
  const sometihng = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      let result;
      try {
        result = await Axios.get(
          `http://192.168.0.49:8081/api/bookings/bookingavailable1?room=${5}&company=${currentCompany}&date=${dayjs().format(
            'YYYY-MM-DD',
          )}`,
        );
        let date = data;
        for (let i = 0; i < data.length; i++) {
          date[i]['asdasd'] = 'asd';
          if (date[i]['id'] == result.data.id) {
            setData(date[i]['checked'] == 'asd');
          }
          console.log(date[i]);
        }
      } catch (error) {}
    }, 5000);
    setIsLoading(false);
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      fetchData();
      setRefreshing(false);
    } catch (error) {}

    setRefreshing(false);
  }, [refreshing]);
  useEffect(() => {
    // setIsLoading(true);
    getColors1();
    const getCurrentApartmentBuilding = async () => {
      AsyncStorage.getItem('company').then((token) => {
        setCurrentCompany(token), setIsLoading(false);
      });
      const apartment = await AsyncStorage.getItem('apartment');
      const building = await AsyncStorage.getItem('building');
      setCurrentApartment(apartment);
      setCurrentBuilding(building);
    };

    getCurrentApartmentBuilding();
    // setIsLoading(false);
  }, []);
  const {signOut} = React.useContext(AuthContext);

  const time = dayjs().format('dddd D MMMM, YYYY');

  useEffect(() => {
    const test = async () => {
      const rooms = await AsyncStorage.getItem('rooms');
    };
    test();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  if (isLoading) return <ActivityIndicator animating={true} />;
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={{marginTop: '5%'}}>
        <CompanyImage value={currentCompany} />
      </View>
      <Card
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: '5%',
          backgroundColor: colors.list,
        }}>
        <Title style={{marginLeft: 32, color: colors.primary}}>
          Idag, {time}
        </Title>
        <View style={{height: 5, backgroundColor: colors.primary}} />
      </Card>
      <FlatList
        contentContainerStyle={{justifyContent: 'center'}}
        style={{flex: 1, marginTop: normalize(10)}}
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(data) => data.id.toString()}
        renderItem={({item}) => <RoomList {...item} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24,
  },

  leftButonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255, 0.4)',
  },
  card: {
    height: 400,
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 44,
    width: 200,
  },
  button2: {
    width: 150,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    height: 44,
    marginTop: 300,
  },
  overlay: {
    flex: 1,

    opacity: 0.5,
    backgroundColor: 'black',
  },
  splitScreen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  splitScreen1: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  leftPane: {
    height: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPane: {
    height: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTextStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  textStyle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  tinyLogo: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    alignContent: 'flex-start',
  },
});
