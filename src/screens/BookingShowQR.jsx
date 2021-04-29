import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Paragraph, Button, Title} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {CompanyImage} from '../components/CompanyImage';
import { getColors } from '../core/theme';

export default function BookingShowQR({route}) {
  const navigation = useNavigation();

  const {value} = route.params;

  console.log(route.params);
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState('')
  const [colors, setColors] = useState([])


  const getColors1 = async () => {
    const colors1 = await getColors();
    setColors(colors1)
  };
  useEffect(() => {
    getColors1()
  }, [])
  useEffect(() => {
    setIsLoading(true)

    AsyncStorage.getItem('company').then((token) => {
      setCompany(token), setIsLoading(false)
    })
  }, [])  
  useEffect(() => {
    setIsLoading(true)

    AsyncStorage.getItem('company').then((token) => {
      setCompany(token), setIsLoading(false)
    })
  }, [])
  return (
    <View style={{backgroundColor: colors.background,flex: 1,
}}>
  <View style={{marginTop: '20%'}}>
      <CompanyImage value={company} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10%',
        }}>
        <QRCode value={value.QR_Code} size={300} />

      </View>
      <Button
          mode="contained"
          color={colors.button}
          labelStyle={{ color: colors.text }}

          onPress={() => console.log('Sending QR')}
          style={{marginBottom: 25}}>
          Skicka QR till en vän
        </Button>
      <Button
          mode="contained"
          color={colors.button}
          labelStyle={{ color: colors.text }}

          onPress={() => navigation.goBack()}
          style={{marginBottom: 25}}>
          Tillbaka
        </Button>
  </View>
  );
}
