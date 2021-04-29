import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Dios from '../../assets/dios_logo_svart.png';
import { Card, withTheme, Appbar, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { getColors } from '../core/theme';
import { CompanyImage } from '../components/CompanyImage'
import DiosCircle from '../core/DiosCircle';
import DiosRectangle1 from '../core/DiosRectangle1';
import DiosCircle1 from '../core/DiosCircle1';
import DiosCircle2 from '../core/DiosCirle2';
import DiosCircle3 from '../core/DiosCircle3';
import DiosRectangle from '../core/DiosRectangle';
import { BlurView } from '@react-native-community/blur';
import DiosImage from '../../assets/logo-dios-960.png'
import { normalize } from '../core/size';
import BookiLogo from '../core/BookiLogo';
import BookioLogo from '../../assets/Group95.png'
function ChoosenCompany({ navigation }) {
  // const company = route.params;
  // const { image } = route.params;
  const [data, setData] = useState({});
  const [currentCompany, setCurrentCompany] = useState('');
  const { colors1 } = useTheme();
  const [colors, setColors] = useState([])
  const dimensions = Dimensions.get('window');
  const imageHeight = dimensions.height;
  const imageWidth = dimensions.width;
  const getCurrentApartment = async () => {
    const getCompany = await AsyncStorage.getItem('company');
    setCurrentCompany(getCompany);
  };
  const getColors1 = async () => {
    const colors = await getColors();
    setColors(colors)
  };
  useEffect(() => {
    getColors1()
    getCurrentApartment();
    /*     const fetchProduct = async () => {
          const response = await axios.get('http://192.168.0.49:8081/api/foretag');
          setData(response.data);
        };
        fetchProduct(); */
  }, []);
  //console.log(imageHeight, imageWidth)

  //console.log(currentCompany)
  /*   const SetUserInterfaceFromChooseCompany = props => {
      switch (props.value) {
        case 'Lulebo':
          return (
            <Image
              style={{ height: 100, width: '100%', resizeMode: 'contain' }}
              source={{
                uri: 'http://192.168.0.49:8081/uploads/foretag/lulebo.png',
              }}
            />
          );
        case 'Diös Fastigheter':
          return (
            <Image
              style={{ height: 100, width: '100%', resizeMode: 'contain' }}
              source={Dios}
            />
          );
        case 'Heimstaden':
          return <Text>You are a Manager.</Text>;
        case 'Demo Fastigheter':
          return (
            <Image
              style={{ height: 100, width: '100%', resizeMode: 'contain' }}
              source={{
                uri: 'http://192.168.0.49:8081/uploads/foretag/cebola.png',
              }}
            />
          );
        default:
          return <Text>You are a User.</Text>;
      }
    }; */
  const CompanyLayout = props => {
    switch (props.value) {
      case 'Lindbäcks Fastigheter':
        return (
          <View>
            <ImageBackground source={require('../../assets/bakgrund22.png')}
              style={{ height: imageHeight, width: imageWidth }} resizeMode="cover">

              <BackButton goBack={() => navigation.goBack()} iconColor={'#1482FA'} />
              <ImageBackground source={require('../../assets/art.png')}
                style={{ height: imageHeight, width: imageWidth }} resizeMode="cover">
                <View elevation={25}>
                  <Image
                    style={{ height: '40%', width: '100%', resizeMode: 'contain', marginTop: '20%' }}

                    source={{
                      uri: 'http://192.168.0.49:8081/uploads/foretag/lindb%C3%A4cks_logo.png',
                    }}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', bottom: '-25%' }}>
                  <Button mode="contained" labelStyle={{ color: colors.text }} compact style={{ width: '40%', backgroundColor: colors.button, color: colors.text }} onPress={() => {
                    navigation.navigate('SignInScreen');
                  }}>Logga In</Button>
                  <Button mode="contained" compact labelStyle={{ color: colors.text }} style={{ width: '40%', marginTop: '3%', backgroundColor: colors.button, color: colors.text }}>BankID</Button>
                </View>
              </ImageBackground>

            </ImageBackground>
          </View>

        );
      case 'Diös Fastigheter':
        return (
          <View style={{width: '100%', height: '100%'}}>
            <View style={{width: '100%', height: '100%',backgroundColor: '#05526D'}}/>
            <View style={{position: 'absolute', top: normalize(286), left: normalize(75), elevation: 200}}>
            <Image

                    source={DiosImage}
                  />
                  </View>
            <View style={{elevation: 100, position: 'absolute', left:  normalize(-64), top:  normalize(-74)}}>
              <DiosCircle />
            </View>
            <View style={{elevation: 100, position: 'absolute', top:  normalize(89), left:  normalize(67)}}>
            <DiosCircle2/>
            </View>
            <View style={{elevation: 25, position: 'absolute', top:  normalize(177), left:  normalize(0)}}>
              <DiosCircle3 />
            </View>
            <View style={{elevation: 100, top:  normalize(51), left:  normalize(-108.84), position: 'absolute'}}>
            <DiosRectangle1 />

            </View>
            <View style={{elevation: 100, top:  normalize(108.03), left:  normalize(-58.18), position: 'absolute'}}>
            <DiosRectangle1 />
            </View>
            <View style={{elevation: 100, top:  normalize(180.07), left:  normalize(-8.18),position: 'absolute'}}>
              <DiosRectangle1 />
            </View>
            <View style={{elevation: 50,top:  normalize(197), left:  normalize(35), position: 'absolute'}}>
              <DiosCircle1 />
            </View>
            <View style={{elevation: 200, top:  normalize(550),position: 'absolute', flex:1, flexDirection: 'row', alignSelf: 'center',}}>
              <Button style={{marginRight: '5%', width:  normalize(150), }} color="#05526D" mode="contained" onPress={() => {
                    navigation.navigate('SignInScreen');}}>Logga in</Button>
              <Button style={{ width:  normalize(150)}} color="#05526D" mode="contained">Bankid</Button>

            </View>
            <View style={{elevation: 200,position: 'absolute', top: normalize(600), left: normalize(140)}}>
            <Image source={BookioLogo} />
            </View>
          </View>

        );
      case 'Heimstaden':
        return <Text>You are a Manager.</Text>;
      case 'Demo Fastigheter':
        return (
          <Image
            style={{ height: 100, width: '100%', resizeMode: 'contain' }}
            source={{
              uri: 'http://192.168.0.49:8081/uploads/foretag/cebola.png',
            }}
          />
        );
      default:
        return (
          <Image
            style={{ height: 100, width: '100%', resizeMode: 'contain' }}
            source={{
              uri: 'http://192.168.0.49:8081/uploads/foretag/cebola.png',
            }}
          />
        );
    }
  }
  return (
    <CompanyLayout value={currentCompany} />
  );
}
export default withTheme(ChoosenCompany);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  SubmitButtonStyle: {
    width: 200,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#E40138',
  },

  // TextStyle: {
  //     color: '#fff',
  //     textAlign: 'center',
  // },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    alignContent: 'center',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
    left: '25%',
  },
});
