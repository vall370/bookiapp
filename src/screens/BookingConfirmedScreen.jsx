import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Paragraph, Button, ActivityIndicator} from 'react-native-paper';
import {CompanyImage} from '../components/CompanyImage';
import AsyncStorage from '@react-native-community/async-storage';
import {getColors} from '../core/theme';

export default function BookingConfirmedScreen({route, navigation}) {
  const {booking} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState('');
  const [colors, setColors] = useState([]);

  const getColors1 = async () => {
    const colors1 = await getColors();
    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);
  const Company = async () => {
    try {
      let user = await AsyncStorage.getItem('company');
      setCompany(user);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    Company();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);
  if (isLoading === true)
    return (
      <View style={{flex: 1, alignContent: 'center'}}>
        <ActivityIndicator animating={true} />
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.background,
      }}>
      <View style={{marginTop: '5%'}}>
        <CompanyImage value={company} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="ios-checkbox" size={200} color="#ffffff" />
        <Paragraph style={{fontSize: 28, color: colors.text, padding: 15}}>
          Bokning bekräftad!
        </Paragraph>
        <Paragraph style={{fontSize: 28, color: colors.text, padding: 15}}>
          Din bokningstid är mellan
        </Paragraph>
        <Paragraph style={{fontSize: 28, color: colors.text, padding: 15}}>
          {booking[0].slot}
        </Paragraph>
      </View>
      <Button
        mode="contained"
        color={colors.button}
        theme
        onPress={() => navigation.navigate('Bokningar')}
        labelStyle={{color: colors.text}}
        style={{marginBottom: '5%'}}>
        Tillbaka
      </Button>
    </View>
  );
}
