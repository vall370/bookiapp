import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {getColors} from '../core/theme';

export default function ChangePassword({navigation}) {
  const [text, setText] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState('');
  const [error, setError] = useState([]);
  const [colors, setColors] = useState([]);

  const getColors1 = async () => {
    const colors1 = await getColors();
    setColors(colors1);
  };
  useEffect(() => {
    getColors1();
  }, []);
  const updatePassword = async () => {
    const company = await AsyncStorage.getItem('company');
    const apartment = await AsyncStorage.getItem('apartment');
    const building = await AsyncStorage.getItem('building');
    if (newPassword != confirmPassword) {
      setWrongPassword('Pin-kod matchar inte!');
    }
    try {
      const resp = await Axios.post(
        'http://192.168.0.49:8081/api/adminfeatures/apartmentChangedPassword',
        {
          apartment: apartment,
          building: building,
          company: company,
          password: oldPassword,
          newPassword: newPassword,
        },
      );
      console.log(resp.data);
    } catch (err) {
      // Handle Error Here
      setError(err.response.data.message);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <View style={{marginTop: '5%'}}>
        <TextInput
          label="Nuvarande Pin-kod"
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          theme={{
            colors: {
              placeholder: 'white',
              text: colors.text,
              primary: 'white',
              underlineColor: 'transparent',
              background: colors.list,
            },
          }}
        />
        <TextInput
          label="Ny Pin-kod"
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          style={{marginTop: 5}}
          theme={{
            colors: {
              placeholder: 'white',
              text: colors.text,
              primary: 'white',
              underlineColor: 'transparent',
              background: colors.list,
            },
          }}
        />
        <TextInput
          label="Konfimera ny Pin-kod"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={{marginTop: 5}}
          theme={{
            colors: {
              placeholder: 'white',
              text: colors.text,
              primary: 'white',
              underlineColor: 'transparent',
              background: '#1F1B24',
            },
          }}
        />
        {error.length != 0 ? (
          <HelperText type="error" visible={true}>
            {error}
          </HelperText>
        ) : null}
      </View>
      <Button
        onPress={() => {
          updatePassword();
        }}>
        Byt Pin-kod
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={{borderColor: '#ffffff', width: 300, alignSelf: 'center'}}>
        Gå bakåt
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
